import { Href } from "expo-router";
import { createContext, useContext, useState } from "react";

export enum NAVIGATION_VIEWS {
    CURRENT_CHAT = 0,
    OLD_CHATS_LIST = 1,
    OLD_CHAT = 2,
    PRODUCTS_LIST = 3,
    EDIT_PRODUCT = 4,
    ADD_PRODUCT = 5,
}

export const NAVIGATION_VIEW_PATHNAMES: Record<string, Href> = {
    CURRENT_CHAT: '/',
    OLD_CHATS_LIST: '/(tabs)/files',
    OLD_CHAT: '/(tabs)/old_chat',
    PRODUCTS_LIST: '/(tabs)/products',
};

type NavigationContextType = {
    currentNavigationView: NAVIGATION_VIEWS;
    setCurrentNavigationView: React.Dispatch<React.SetStateAction<NAVIGATION_VIEWS>>;
}

const NavigationContext = createContext<NavigationContextType>({
    currentNavigationView: NAVIGATION_VIEWS.CURRENT_CHAT,
    setCurrentNavigationView: () => { }
})

export const NavigationProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentNavigationView, setCurrentNavigationView] = useState<NAVIGATION_VIEWS>(NAVIGATION_VIEWS.CURRENT_CHAT);

    return (
        <NavigationContext.Provider value={{ currentNavigationView, setCurrentNavigationView }}>
            {children}
        </NavigationContext.Provider>
    )
}

export const useNavigationContext = () => useContext(NavigationContext);