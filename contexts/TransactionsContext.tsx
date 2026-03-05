import { createContext, useContext, useEffect, useState } from "react";

import { Transaction } from "@/@types";
import useTransactionFile from "@/hooks/useTransactionFile";
import { getCurrentDateInYYYY_MM_DD } from "@/utils/common";

type DateRange = {
    start: Date | null;
    end: Date | null;
};

type TransactionsContextType = {
    transactions: Transaction[];
    dateRange: DateRange;
    handleAddTransaction: (transaction: Transaction) => void;
    handleDeleteTransaction: (transaction: Transaction) => Promise<void>;
    handleEditTransaction: (newTransaction: Transaction) => Promise<void>;
    hasMoreTransactions: boolean;
    isLoadingMoreTransactions: boolean;
    showLoadingMoreIndicator: boolean;
    loadAnotherTransactionsBatch: (lastTransactionTimestamp: Date) => Promise<void>;
    unloadOlderTransactions: () => void;
    readAllTransactionsFiles: () => string[];
    readTransactionsByFilename: (filename: string) => Promise<string | null>;
    setDateRange: React.Dispatch<React.SetStateAction<DateRange>>;
    transactionsLoaded: boolean;
    _setYYYY_MM_DD: React.Dispatch<React.SetStateAction<string>>;
    _YYYY_MM_DD: string;
};

const TransactionsContext = createContext<TransactionsContextType>({
    transactions: [],
    dateRange: { start: null, end: null },
    handleAddTransaction: () => { },
    handleDeleteTransaction: () => Promise.resolve(),
    handleEditTransaction: () => Promise.resolve(),
    hasMoreTransactions: true,
    isLoadingMoreTransactions: false,
    showLoadingMoreIndicator: false,
    loadAnotherTransactionsBatch: () => Promise.resolve(),
    unloadOlderTransactions: () => { },
    readAllTransactionsFiles: () => [],
    readTransactionsByFilename: () => Promise.resolve(null),
    setDateRange: () => { },
    transactionsLoaded: false,
    _setYYYY_MM_DD: () => { },
    _YYYY_MM_DD: ""
});

export const TransactionsProvider = ({ children }: { children: React.ReactNode }) => {
    const [_YYYY_MM_DD, _setYYYY_MM_DD] = useState(getCurrentDateInYYYY_MM_DD());
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [dateRange, setDateRange] = useState<DateRange>({ start: null, end: null });
    const [isLoadingMoreTransactions, setIsLoadingMoreTransactions] = useState(false);
    const [showLoadingMoreIndicator, setShowLoadingMoreIndicator] = useState(false);
    const [hasMoreTransactions, setHasMoreTransactions] = useState(true);
    const [transactionsLoaded, setTransactionsLoaded] = useState(false);

    const {
        appendTransaction,
        deleteTransaction,
        editTransaction,
        readLastNTransactions,
        readTransactionsBefore,
        readRawFileByName,
        readAllTransactionsFiles,
        // .csv?
    } = useTransactionFile(`chat_history_${_YYYY_MM_DD}.json`, 'chat_history');

    useEffect(() => {
        const load = async () => {
            setHasMoreTransactions(true);
            try {
                const { transactions: last20, count } = await readLastNTransactions(20);
                setTransactions(last20);
                setHasMoreTransactions(count > 20);
            } catch (error) {
                console.error(`[ERROR] TransactionsProvider.load \n ${error}`);
            } finally {
                setTransactionsLoaded(true);
            }
        };
        load();
    }, [_YYYY_MM_DD]);

    const loadAnotherTransactionsBatch = async (lastTransactionTimestamp: Date) => {
        setIsLoadingMoreTransactions(true);

        try {
            if (!hasMoreTransactions) return;
            let prev20: Transaction[] | null;

            setShowLoadingMoreIndicator(true);
            const { transactions, count } = await readTransactionsBefore(lastTransactionTimestamp, 20);
            prev20 = transactions;
            if (prev20.length === 0) return setHasMoreTransactions(false);
            if (count <= 0) return setHasMoreTransactions(false);

            setTransactions(prev => {
                setShowLoadingMoreIndicator(false);
                return [...prev20!, ...prev];
            });
        } catch (error) {
            console.error(`[ERROR] TransactionsProvider.loadAnotherTransactionsBatch \n ${error}`);
        } finally {
            setIsLoadingMoreTransactions(false);
            setTimeout(() => setShowLoadingMoreIndicator(false), 500);
        }
    };

    const unloadOlderTransactions = () => {
        setTransactions(prev => prev.slice(-20));
        setHasMoreTransactions(true);
    };

    const handleAddTransaction = (transaction: Transaction) => {
        //     // TODO this doesn't work
        // set message.timestamp to tomorrow's date for testing
        // message.timestamp = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
        // const currentYYYY_MM_DD = date2YYYY_MM_DD(message.timestamp);
        // const selectedDateYYYY_MM_DD = _YYYY_MM_DD;
        // console.log({ selectedDateYYYY_MM_DD, currentYYYY_MM_DD });
        // if (selectedDateYYYY_MM_DD !== currentYYYY_MM_DD) {
        //     _setYYYY_MM_DD(currentYYYY_MM_DD);
        //     _setStoredMessages([message]);
        //     return [];
        // }
        appendTransaction(transaction);
        setTransactions(prev => {
            const updated = [...prev, transaction];
            if (updated.length > 20) {
                setHasMoreTransactions(true);
                return updated.slice(-20);
            }
            return updated;
        });
    };

    const handleDeleteTransaction = async (transaction: Transaction) => {
        await deleteTransaction(transaction.timestamp);
        setTransactions(prev => prev.filter(t => t.timestamp.getTime() !== transaction.timestamp.getTime()));
    };

    const handleEditTransaction = async (newTransaction: Transaction) => {
        await editTransaction(newTransaction.timestamp, newTransaction);
        setTransactions(prev => prev.map(t =>
            t.timestamp.getTime() === newTransaction.timestamp.getTime() ? newTransaction : t
        ));
    };

    const readTransactionsByFilename = (filename: string) => readRawFileByName(filename);

    return (
        <TransactionsContext.Provider value={{
            transactions,
            dateRange,
            handleAddTransaction,
            handleDeleteTransaction,
            handleEditTransaction,
            hasMoreTransactions,
            isLoadingMoreTransactions,
            showLoadingMoreIndicator,
            loadAnotherTransactionsBatch,
            unloadOlderTransactions,
            readAllTransactionsFiles,
            readTransactionsByFilename,
            setDateRange,
            transactionsLoaded,
            _setYYYY_MM_DD,
            _YYYY_MM_DD
        }}>
            {children}
        </TransactionsContext.Provider>
    );
};

export const useTransactions = () => useContext(TransactionsContext);