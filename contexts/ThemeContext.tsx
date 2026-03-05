import { DefaultTheme, ThemeProvider as NativeThemeProvider } from '@react-navigation/native';
import { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";

import { Colors, MainThemeColorsDark } from '@/constants/Colors';
import useCache from "@/hooks/useCache";

export type THEME = 'light' | 'dark';

type ThemeContextType = {
    COLORS: typeof Colors.light | typeof Colors.dark;
    handleChangeTheme: () => void;
    theme: THEME;
    themeLoaded: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
    COLORS: Colors.dark,
    handleChangeTheme: () => { },
    theme: 'dark',
    themeLoaded: false,
})

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const { readFileFromCache, saveDataToCache } = useCache('colormode.txt');

    const defaultTheme = useColorScheme() ?? 'dark';
    const [theme, setTheme] = useState<THEME>('dark');
    const [themeLoaded, setThemeLoaded] = useState(false);

    const COLORS = Colors[theme];
    MainThemeColorsDark.fonts = DefaultTheme.fonts;

    useEffect(() => {
        const readThemeDataFromCache = async () => {
            try {
                const cachedTheme = await readFileFromCache() as THEME | null;
                if (cachedTheme) return setTheme(cachedTheme);
                saveDataToCache(defaultTheme);
            } catch (error) {
                console.error(`[ERROR] ThemeContextProvider.readThemeDataFromCache \n ${error}`)
            } finally {
                setThemeLoaded(true);
            }
        }
        readThemeDataFromCache()
    }, []);

    const handleChangeTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        saveDataToCache(newTheme);
    }

    return (
        <ThemeContext.Provider value={{ COLORS, handleChangeTheme, theme, themeLoaded }}>
            <NativeThemeProvider value={MainThemeColorsDark} >
                {children}
            </NativeThemeProvider>
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext);