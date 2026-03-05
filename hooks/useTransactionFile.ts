import { Transaction } from "@/@types";
import { date2String } from "@/utils/common";
import useCache from "./useCache";

// ---------------------------------------------------------------------------
// Line format: "DD.MM.YYYY, HH:MM:SS, CATEGORY, product name, quantity"
// This is identical to the CSV export format so the daily cache file IS the CSV.
// ---------------------------------------------------------------------------

const transactionToLine = (t: Transaction): string => {
    const { date, time } = date2String(t.timestamp);
    return `${date}, ${time}, ${t.productCategory}, ${t.productName}, ${t.productQuantity}`;
};

const lineToTransaction = (line: string): Transaction | null => {
    const parts = line.split(", ");
    if (parts.length < 5) return null;

    const [datePart, timePart, category, ...nameParts] = parts;
    const quantity = parseInt(nameParts.pop()!, 10);
    const name = nameParts.join(", ");

    // datePart: DD.MM.YYYY, timePart: HH:MM:SS
    const [day, month, year] = datePart.split(".").map(Number);
    const [hours, minutes, seconds] = timePart.split(":").map(Number);
    const timestamp = new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds));

    if (isNaN(timestamp.getTime()) || isNaN(quantity)) return null;

    return {
        productName: name,
        productCategory: category as Transaction["productCategory"],
        productQuantity: quantity,
        timestamp,
    };
};

const splitLines = (raw: string): string[] =>
    raw.split("\n").filter(line => line.trim() !== "");

// ---------------------------------------------------------------------------

const useTransactionFile = (filename: string, directory: string) => {
    const { appendLineToFile, readFileFromCache, saveDataToCache, readAllFilesFromDirectory, readFileFromCacheByName } =
        useCache(filename, directory);

    /** Append a single transaction line — no read required. */
    const appendTransaction = (t: Transaction): void => {
        appendLineToFile(transactionToLine(t));
    };

    /** Remove the line whose timestamp matches exactly. */
    const deleteTransaction = async (timestamp: Date): Promise<void> => {
        const raw = await readFileFromCache();
        if (!raw) return;
        const lines = splitLines(raw);
        const filtered = lines.filter(line => {
            const t = lineToTransaction(line);
            return t ? t.timestamp.getTime() !== timestamp.getTime() : true;
        });
        saveDataToCache(filtered.join("\n"));
    };

    /** Replace the line whose timestamp matches with the updated transaction. */
    const editTransaction = async (timestamp: Date, updated: Transaction): Promise<void> => {
        const raw = await readFileFromCache();
        if (!raw) return;
        const lines = splitLines(raw);
        const replaced = lines.map(line => {
            const t = lineToTransaction(line);
            return t && t.timestamp.getTime() === timestamp.getTime()
                ? transactionToLine(updated)
                : line;
        });
        saveDataToCache(replaced.join("\n"));
    };

    /** Read the last N transactions from the file (most-recent N, in chronological order). */
    const readLastNTransactions = async (n: number): Promise<{ transactions: Transaction[], count: number }> => {
        const raw = await readFileFromCache();
        if (!raw) return { transactions: [], count: 0 };
        const lines = splitLines(raw);
        const transactions = lines
            .slice(-n)
            .map(lineToTransaction)
            .filter((t): t is Transaction => t !== null);
        return { transactions, count: lines.length };
    };

    /**
     * Read up to N transactions that appear before `timestamp` in the file.
     * Returns them in chronological order (oldest first).
     * Returns null if `timestamp` is not found in the file.
     */
    const readTransactionsBefore = async (timestamp: Date, n: number): Promise<{ transactions: Transaction[], count: number }> => {
        const raw = await readFileFromCache();
        if (!raw) return { transactions: [], count: 0 };
        const lines = splitLines(raw);
        const idx = lines.findIndex(line => {
            const t = lineToTransaction(line);
            return t ? t.timestamp.getTime() === timestamp.getTime() : false;
        });
        if (idx === -1) return { transactions: [], count: 0 };
        if (idx === 0) return { transactions: [], count: lines.length };
        const transactions = lines
            .slice(Math.max(0, idx - n), idx)
            .map(lineToTransaction)
            .filter((t): t is Transaction => t !== null);
        const remainigCount = idx; // how many transactions are before the returned batch (including the batch itself)
        return { transactions, count: remainigCount };
    };

    /** Return the raw file contents (the file itself is valid CSV). */
    const readRawFile = async (): Promise<string | null> => readFileFromCache();

    /** Return the raw contents of any file in the same directory by filename. */
    const readRawFileByName = async (name: string): Promise<string | null> =>
        readFileFromCacheByName(name);

    return {
        appendTransaction,
        deleteTransaction,
        editTransaction,
        readLastNTransactions,
        readTransactionsBefore,
        readRawFile,
        readRawFileByName,
        readAllTransactionsFiles: readAllFilesFromDirectory,
    };
};

export default useTransactionFile;
