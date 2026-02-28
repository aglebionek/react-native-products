import { createContext, useContext, useEffect, useState } from "react";

import { Transaction } from "@/@types";
import useCache from "@/hooks/useCache";
import { getCurrentDateInYYYY_MM_DD } from "@/utils/common";

type DateRange = {
    start: Date | null;
    end: Date | null;
};

type TransactionsContextType = {
    transactions: Transaction[];
    dateRange: DateRange;
    handleAddTransaction: (transaction: Transaction) => void;
    handleDeleteTransaction: (transaction: Transaction) => void;
    handleEditTransaction: (newTransaction: Transaction) => void;
    readAllTransactionsFiles: () => Promise<string[]>;
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
    handleDeleteTransaction: () => { },
    handleEditTransaction: () => { },
    readAllTransactionsFiles: () => Promise.resolve([]),
    readTransactionsByFilename: () => Promise.resolve(null),
    setDateRange: () => { },
    transactionsLoaded: false,
    _setYYYY_MM_DD: () => { },
    _YYYY_MM_DD: ""
});

export const TransactionsProvider = ({ children }: { children: React.ReactNode }) => {
    const [_YYYY_MM_DD, _setYYYY_MM_DD] = useState(getCurrentDateInYYYY_MM_DD());
    const [_storedMessages, _setStoredMessages] = useState<Transaction[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [dateRange, setDateRange] = useState<DateRange>({ start: null, end: null });
    const { saveDataToCache: saveTransactionsToCache, readFileFromCache: readTransactionsFromCache, readAllFilesFromDirectory: readAllTransactionsFiles, readFileFromCacheByName: readTransactionsByFilename } = useCache(`chat_history_${_YYYY_MM_DD}.json`, 'chat_history');
    const [transactionsLoaded, setTransactionsLoaded] = useState(false);

    useEffect(() => {
        const readTransactions = async () => {
            try {
                const cachedTransactions = await readTransactionsFromCache();
                if (!cachedTransactions) return setTransactions(_storedMessages);

                setTransactions(JSON.parse(cachedTransactions, (_, value) => {
                    value.timestamp = new Date(value.timestamp);
                    return value;
                }));

                _setStoredMessages([]);
            } catch (error) {
                console.error(`[ERROR] TransactionsProvider.readTransactions \n ${error}`);
            } finally {
                setTransactionsLoaded(true);
            }
        };

        readTransactions();
    }, [_YYYY_MM_DD]);

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
        setTransactions(prev => {
            const newTransactions = [...prev, transaction];
            saveTransactionsToCache(JSON.stringify(newTransactions));
            return newTransactions;
        });
    }

    const handleDeleteTransaction = (transaction: Transaction) => {
        const newTransactions = transactions.filter(t => t.timestamp !== transaction.timestamp);
        setTransactions(newTransactions);
        saveTransactionsToCache(JSON.stringify(newTransactions));
    }

    const handleEditTransaction = (newTransaction: Transaction) => {
        const newTransactions = transactions.map(t => t.timestamp === newTransaction.timestamp ? newTransaction : t);
        setTransactions(newTransactions);
        saveTransactionsToCache(JSON.stringify(newTransactions));
    }

    return (
        <TransactionsContext.Provider value={{
            transactions,
            dateRange,
            handleAddTransaction,
            handleDeleteTransaction,
            handleEditTransaction,
            readAllTransactionsFiles,
            readTransactionsByFilename,
            setDateRange,
            transactionsLoaded,
            _setYYYY_MM_DD,
            _YYYY_MM_DD
        }}>
            {children}
        </TransactionsContext.Provider>
    )
}

export const useTransactions = () => useContext(TransactionsContext);