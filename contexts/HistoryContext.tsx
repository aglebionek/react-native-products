import { createContext, useContext, useEffect, useState } from "react";

import { ChatMessage, Transaction } from "@/@types";
import useCache from "@/hooks/useCache";

type DateRange = {
    start: Date | null;
    end: Date | null;
};

type HistoryContextType = {
    chatHistory: ChatMessage[];
    setChatHistory: (chatHistory: ChatMessage[]) => void;
    transactionHistory: Transaction[];
    setTransactionHistory: (transactionHistory: Transaction[]) => void;
    handleAddChatMessage: (message: ChatMessage) => void;
    handleAddTransaction: (transaction: Transaction) => void;
    dateRange: DateRange;
    setDateRange: (range: DateRange) => void;
};

const HistoryContext = createContext<HistoryContextType>({
    chatHistory: [],
    setChatHistory: () => { },
    transactionHistory: [],
    setTransactionHistory: () => { },
    handleAddChatMessage: (message: ChatMessage) => { },
    handleAddTransaction: (transaction: Transaction) => { },
    dateRange: { start: null, end: null },
    setDateRange: () => { },
});

// IMPLEMENT: CHAT HISTORY, TRANSACTION HISTORY (separate transaction history per current day, load it only on request)

export const HistoryProvider = ({ children }: { children: React.ReactNode }) => {
    const [_YYYY_MM_DD, _setYYYY_MM_DD] = useState(new Date().toISOString().split('T')[0].replace(/-/g, '_'));
    const [_datesList, _setDatesList] = useState<Date[]>([]);
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [dateRange, setDateRange] = useState<DateRange>({ start: null, end: null });
    const [transactionHistory, setTransactionHistory] = useState<Transaction[]>([]);
    const { saveDataToCache: saveChatHistoryToCache, readFileFromCache: readChatHistoryFromCache } = useCache(`chat_history_${_YYYY_MM_DD}.json`);
    const { saveDataToCache: saveTransactionsToCache, readFileFromCache: readTransactionsFromCache } = useCache(`transactions_${_YYYY_MM_DD}.json`);
// https://stackoverflow.com/questions/71101413/expo-react-native-saving-pdf-files-to-downloads-folder
    useEffect(() => {
        const readChatHistory = async () => {
            try {
                const cachedChatHistory = await readChatHistoryFromCache();
                if (cachedChatHistory) {
                    setChatHistory(JSON.parse(cachedChatHistory));
                }
            } catch (error) {
                console.error(`[ERROR] HistoryProvider.readChatHistoryFromCache \n ${error}`);
            }
        };

        const readTransactions = async () => {
            try {
                const cachedTransactions = await readTransactionsFromCache();
                if (cachedTransactions) {
                    setTransactionHistory(JSON.parse(cachedTransactions));
                }
            } catch (error) {
                console.error(`[ERROR] HistoryProvider.readTransactionsFromCache \n ${error}`);
            }
        };

        readChatHistory();
        readTransactions();
    }, [_YYYY_MM_DD]);

    useEffect(() => {
        if (dateRange.start && dateRange.end) {
            const start = new Date(dateRange.start);
            const end = new Date(dateRange.end);
            const dates: Date[] = [];
            for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
                const YYYY_MM_DD = d.toISOString().split('T')[0].replace(/-/g, '_');
                dates.push(new Date(YYYY_MM_DD));
            }
            _setDatesList(dates);
        } else {
            _setDatesList([]);
        }
    }, [dateRange.start, dateRange.end]);

    useEffect(() => {
        if (!_datesList) return setTransactionHistory([]);

        _datesList.forEach(async (date) => {
            const YYYY_MM_DD = date.toISOString().split('T')[0].replace(/-/g, '_');
            const { readFileFromCache: readTransactionsFromCache } = useCache(`transactions_${YYYY_MM_DD}.json`);
            
            const transactionsFromCache = await readTransactionsFromCache();
            if (!transactionsFromCache) return setTransactionHistory([]);
            
            const transactions = JSON.parse(transactionsFromCache);
            setTransactionHistory(prev => {
                if (!prev) return transactions;
                return [...prev, ...transactions];
            });
        });
    }, [_datesList]);

    const handleAddChatMessage = (message: ChatMessage) => {
        const YYYY_MM_DD = message.timestamp.toISOString().split('T')[0].replace(/-/g, '_');
        if (YYYY_MM_DD !== _YYYY_MM_DD) _setYYYY_MM_DD(YYYY_MM_DD);
        setChatHistory(prev => {
            const newChatHistory = [...prev, message];
            saveChatHistoryToCache(JSON.stringify(newChatHistory));
            return newChatHistory;
        });
    }
    
    const handleAddTransaction = (transaction: Transaction) => {
        const YYYY_MM_DD = transaction.date.toISOString().split('T')[0].replace(/-/g, '_');
        if (YYYY_MM_DD !== _YYYY_MM_DD) _setYYYY_MM_DD(YYYY_MM_DD);
        setTransactionHistory(prev => {
            const newTransactionHistory = [...prev, transaction];
            saveTransactionsToCache(JSON.stringify(newTransactionHistory));
            return newTransactionHistory;
        });
    }

    return (
        <HistoryContext.Provider value={{
            chatHistory,
            setChatHistory,
            transactionHistory,
            setTransactionHistory,
            handleAddChatMessage,
            handleAddTransaction,
            dateRange,
            setDateRange
        }}>
            {children}
        </HistoryContext.Provider>
    )
}

export const useHistory = () => useContext(HistoryContext);