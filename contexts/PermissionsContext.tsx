import * as FileSystem from 'expo-file-system';
import { createContext, useContext, useEffect, useState } from "react";

import useCache from "@/hooks/useCache";

type ThemeContextType = {
    permissionsLoaded: boolean;
    handleDownloadFile: (fileName: string, content: string, mimeType: string) => Promise<string | null>;
}

const ThemeContext = createContext<ThemeContextType>({
    permissionsLoaded: false,
    handleDownloadFile: async () => null
})

export const PermissionsProvider = ({ children }: { children: React.ReactNode }) => {
    const { readFileFromCache, saveDataToCache } = useCache('download_directory.txt');

    const [_downloadDirectory, _setDownloadDirectory] = useState<string | null>(null);
    const [permissionsLoaded, setPermissionsLoaded] = useState(false);

    useEffect(() => {
        const readPermissionsDataFromCache = async () => {
            try {
                const cachedDownloadDir = await readFileFromCache() as string | null;
                if (cachedDownloadDir) return _setDownloadDirectory(cachedDownloadDir);
            } catch (error) {
                console.error(`[ERROR] PermissionsContextProvider.readPermissionsDataFromCache \n ${error}`)
            } finally {
                setPermissionsLoaded(true);
            }
        }
        readPermissionsDataFromCache()
    }, []);

    const _handleRequestDownloadDirectoryPermission = async () => {
        const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
        if (!permissions.granted) return null;
        await saveDataToCache(permissions.directoryUri);
        _setDownloadDirectory(permissions.directoryUri);
        return permissions.directoryUri;
    }

    const handleDownloadFile = async (fileName: string, content: string, mimeType: string) => {
        try {
            let targetDirectory = _downloadDirectory;
            
            if (!targetDirectory) {
                targetDirectory = await _handleRequestDownloadDirectoryPermission();
                if (!targetDirectory) return null;
            }
            
            const fileUri = await FileSystem.StorageAccessFramework.createFileAsync(targetDirectory, fileName, mimeType)
            await FileSystem.writeAsStringAsync(fileUri, content, { encoding: FileSystem.EncodingType.UTF8 });
            return fileUri;
        } catch (error) {
            console.error(`[ERROR] PermissionsContextProvider.handleDownloadFile \n ${error}`);
            return null;
        } 
    }

    return (
        <ThemeContext.Provider value={{ handleDownloadFile, permissionsLoaded }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const usePermissions = () => useContext(ThemeContext);