import { createContext, useContext, useEffect, useState } from "react";

import { ChatMessage } from "@/@types";
import useCache from "@/hooks/useCache";
import { date2YYYY_MM_DD } from "@/utils/common";

type DateRange = {
    start: Date | null;
    end: Date | null;
};

type TransactionsContextType = {
    chatHistory: ChatMessage[];
    dateRange: DateRange;
    handleAddChatMessage: (message: ChatMessage) => void;
    handleDeleteChatMessage: (message: ChatMessage) => void;
    handleEditChatMessage: (newMessage: ChatMessage) => void;
    readAllTransactionsFiles: () => Promise<string[]>;
    setChatHistory: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
    setDateRange: React.Dispatch<React.SetStateAction<DateRange>>;
    _setYYYY_MM_DD: React.Dispatch<React.SetStateAction<string>>;
    _YYYY_MM_DD: string;
};

const TransactionsContext = createContext<TransactionsContextType>({
    chatHistory: [],
    dateRange: { start: null, end: null },
    handleAddChatMessage: () => { },
    handleDeleteChatMessage: () => { },
    handleEditChatMessage: () => { },
    readAllTransactionsFiles: () => Promise.resolve([]),
    setChatHistory: () => { },
    setDateRange: () => { },
    _setYYYY_MM_DD: () => { },
    _YYYY_MM_DD: ""
});

export const TransactionsProvider = ({ children }: { children: React.ReactNode }) => {
    const [_YYYY_MM_DD, _setYYYY_MM_DD] = useState(date2YYYY_MM_DD(new Date()));
    const [_storedMessages, _setStoredMessages] = useState<ChatMessage[]>([]);
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [dateRange, setDateRange] = useState<DateRange>({ start: null, end: null });
    const { saveDataToCache: saveTransactionsToCache, readFileFromCache: readTransactionsFromCache, readAllFilesFromDirectory: readAllTransactionsFiles } = useCache(`chat_history_${_YYYY_MM_DD}.json`, 'chat_history');

    useEffect(() => {
        const readTransactions = async () => {
            try {
                const cachedChatHistory = await readTransactionsFromCache();
                if (!cachedChatHistory) return setChatHistory(_storedMessages);

                setChatHistory(JSON.parse(cachedChatHistory, (_, value) => {
                    value.timestamp = new Date(value.timestamp);
                    return value;
                }));

                _setStoredMessages([]);
            } catch (error) {
                console.error(`[ERROR] HistoryProvider.readChatHistoryFromCache \n ${error}`);
            }
        };

        readTransactions();
    }, [_YYYY_MM_DD]);

    const handleAddChatMessage = (message: ChatMessage) => {
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
        setChatHistory(prev => {
            const newChatHistory = [...prev, message];
            saveTransactionsToCache(JSON.stringify(newChatHistory));
            return newChatHistory;
        });
    }

    const handleDeleteChatMessage = (message: ChatMessage) => {
        const newChatHistory = chatHistory.filter(m => m.timestamp !== message.timestamp);
        setChatHistory(newChatHistory);
        saveTransactionsToCache(JSON.stringify(newChatHistory));
    }

    const handleEditChatMessage = (newMessage: ChatMessage) => {
        const newChatHistory = chatHistory.map(m => m.timestamp === newMessage.timestamp ? newMessage : m);
        setChatHistory(newChatHistory);
        saveTransactionsToCache(JSON.stringify(newChatHistory));
    }

    return (
        <TransactionsContext.Provider value={{
            chatHistory,
            dateRange,
            handleAddChatMessage,
            handleDeleteChatMessage,
            handleEditChatMessage,
            readAllTransactionsFiles,
            setChatHistory,
            setDateRange,
            _setYYYY_MM_DD,
            _YYYY_MM_DD
        }}>
            {children}
        </TransactionsContext.Provider>
    )
}

export const useTransactions = () => useContext(TransactionsContext);