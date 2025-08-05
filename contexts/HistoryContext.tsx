import { createContext, useContext, useEffect, useState } from "react";

import { ChatMessage } from "@/@types";
import useCache from "@/hooks/useCache";

type DateRange = {
    start: Date | null;
    end: Date | null;
};

type HistoryContextType = {
    chatHistory: ChatMessage[];
    setChatHistory: (chatHistory: ChatMessage[]) => void;
    handleAddChatMessage: (message: ChatMessage) => void;
    dateRange: DateRange;
    setDateRange: (range: DateRange) => void;
};

const HistoryContext = createContext<HistoryContextType>({
    chatHistory: [],
    setChatHistory: () => { },
    handleAddChatMessage: (message: ChatMessage) => { },
    dateRange: { start: null, end: null },
    setDateRange: () => { },
});

export const HistoryProvider = ({ children }: { children: React.ReactNode }) => {
    const [_YYYY_MM_DD, _setYYYY_MM_DD] = useState(new Date().toISOString().split('T')[0].replace(/-/g, '_'));
    const [_datesList, _setDatesList] = useState<Date[]>([]);
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [dateRange, setDateRange] = useState<DateRange>({ start: null, end: null });
    const { saveDataToCache: saveChatHistoryToCache, readFileFromCache: readChatHistoryFromCache } = useCache(`chat_history_${_YYYY_MM_DD}.json`);

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

        readChatHistory();
    }, [_YYYY_MM_DD]);

    // useEffect(() => {
    //     if (dateRange.start && dateRange.end) {
    //         const start = new Date(dateRange.start);
    //         const end = new Date(dateRange.end);
    //         const dates: Date[] = [];
    //         for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
    //             const YYYY_MM_DD = d.toISOString().split('T')[0].replace(/-/g, '_');
    //             dates.push(new Date(YYYY_MM_DD));
    //         }
    //         _setDatesList(dates);
    //     } else {
    //         _setDatesList([]);
    //     }
    // }, [dateRange.start, dateRange.end]);

    const handleAddChatMessage = (message: ChatMessage) => {
        const YYYY_MM_DD = message.timestamp.toISOString().split('T')[0].replace(/-/g, '_');
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
            setChatHistory,
            handleAddChatMessage,
            dateRange,
            setDateRange
        }}>
            {children}
        </HistoryContext.Provider>
    )
}

export const useHistory = () => useContext(HistoryContext);