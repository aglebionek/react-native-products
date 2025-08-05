import { cacheDirectory, getInfoAsync, readAsStringAsync, writeAsStringAsync } from "expo-file-system";
import { useCallback } from "react";

const useCache = (cachedFileName: string) => {
    const cachedFilePath = `${cacheDirectory}${cachedFileName}`;

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

    return { checkIfFileExistsInCache, readFileFromCache, saveDataToCache };
}

export default useCache;