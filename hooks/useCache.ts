import { cacheDirectory, getInfoAsync, readAsStringAsync, writeAsStringAsync, readDirectoryAsync, makeDirectoryAsync } from "expo-file-system";
import { useCallback, useEffect } from "react";

const useCache = (cachedFileName: string, cachedFileDirectory: string = "") => {
    if (cachedFileDirectory && !cachedFileDirectory.endsWith('/')) cachedFileDirectory += '/';
    const cachedFilePath = `${cacheDirectory}${cachedFileDirectory}${cachedFileName}`;

    useEffect(() => {
        if (cachedFileDirectory === "") return;
        const createDirectory = async () => {
            try {
                const directory = `${cacheDirectory}${cachedFileDirectory}`;
                await makeDirectoryAsync(directory, { intermediates: true });
            } catch (error) {
                console.error(error);
                console.error("Failed to create cache directory");
            }
        };
        createDirectory();
    }, []);

    const checkIfFileExistsInCache = useCallback(async () => {
        try {
            const { exists, isDirectory } = await getInfoAsync(cachedFilePath);
            return exists && !isDirectory;
        } catch (error) {
            console.error(error);
            console.error("Failed to check if file exists in cache");
            return false;
        }
    }, [cachedFilePath]);

    const readFileFromCache = useCallback(async () => {
        try {
            if (await checkIfFileExistsInCache()) {
                return await readAsStringAsync(cachedFilePath);
            }
            return null;
        } catch (error) {
            console.error(error);
            console.error("Failed to read file from cache");
            return null;
        }
    }, [cachedFilePath]);

    const saveDataToCache = useCallback(async (data: string) => {
        try {
            await writeAsStringAsync(cachedFilePath, data);
            return true;
        } catch (error) {
            console.error(error);
            console.error("Failed to save data to cache");
            return false;
        }
    }, [cachedFilePath]);

    const readAllFilesFromDirectory = useCallback(async () => {
        try {
            if (cachedFileDirectory === "") return [];
            const directory = `${cacheDirectory}${cachedFileDirectory}`;
            const { exists, isDirectory } = await getInfoAsync(directory);
            if (exists && isDirectory) {
                const files = await readDirectoryAsync(directory);
                return files.filter(file => file.startsWith('chat_history_') && file.endsWith('.json')).sort();
            }
            return [];
        } catch (error) {
            console.error(error);
            console.error("Failed to read all files from cache");
            return [];
        }
    }, []);

    return { checkIfFileExistsInCache, readFileFromCache, saveDataToCache, readAllFilesFromDirectory };
}

export default useCache;