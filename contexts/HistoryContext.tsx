import { createContext, useContext, useEffect, useState } from "react";

import { ChatMessage } from "@/@types";
import useCache from "@/hooks/useCache";
import { formatDateToYYYY_MM_DD } from "@/utils/common";

type DateRange = {
    start: Date | null;
    end: Date | null;
};

type HistoryContextType = {
    chatHistory: ChatMessage[];
    dateRange: DateRange;
    handleAddChatMessage: (message: ChatMessage) => void;
    readAllChatHistoryFiles: () => Promise<string[]>;
    setChatHistory: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
    setDateRange: React.Dispatch<React.SetStateAction<DateRange>>;
};

const HistoryContext = createContext<HistoryContextType>({
    chatHistory: [],
    dateRange: { start: null, end: null },
    handleAddChatMessage: () => { },
    readAllChatHistoryFiles: () => Promise.resolve([]),
    setChatHistory: () => { },
    setDateRange: () => { },
});

export const HistoryProvider = ({ children }: { children: React.ReactNode }) => {
    const [_YYYY_MM_DD, _setYYYY_MM_DD] = useState(formatDateToYYYY_MM_DD(new Date()));
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [dateRange, setDateRange] = useState<DateRange>({ start: null, end: null });
    const { saveDataToCache: saveChatHistoryToCache, readFileFromCache: readChatHistoryFromCache, readAllFilesFromDirectory: readAllChatHistoryFiles } = useCache(`chat_history_${_YYYY_MM_DD}.json`, 'chat_history');

    useEffect(() => {
        const readChatHistory = async () => {
            try {
                const cachedChatHistory = await readChatHistoryFromCache();
                if (cachedChatHistory) {
                    setChatHistory(JSON.parse(cachedChatHistory, (_, value) => {
                        value.timestamp = new Date(value.timestamp);
                        return value;
                    }));
                }
            } catch (error) {
                console.error(`[ERROR] HistoryProvider.readChatHistoryFromCache \n ${error}`);
            }
        };

        readChatHistory();
    }, [_YYYY_MM_DD]);

    const handleAddChatMessage = (message: ChatMessage) => {
        const YYYY_MM_DD = formatDateToYYYY_MM_DD(message.timestamp);
        if (YYYY_MM_DD !== _YYYY_MM_DD) _setYYYY_MM_DD(YYYY_MM_DD);
        setChatHistory(prev => {
            const newChatHistory = [...prev, message];
            saveChatHistoryToCache(JSON.stringify(newChatHistory));
            return newChatHistory;
        });
    }
    
    return (
        <HistoryContext.Provider value={{
            chatHistory,
            dateRange,
            handleAddChatMessage,
            readAllChatHistoryFiles,
            setChatHistory,
            setDateRange
        }}>
            {children}
        </HistoryContext.Provider>
    )
}

export const useHistory = () => useContext(HistoryContext);