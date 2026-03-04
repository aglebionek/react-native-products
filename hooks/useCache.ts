import { File, Directory, Paths } from "expo-file-system";
import { useCallback, useMemo } from "react";

const useCache = (cachedFileName: string, cachedFileDirectory: string = "") => {
    const dir = useMemo(() => {
        if (!cachedFileDirectory) return null;
        const d = new Directory(Paths.cache, cachedFileDirectory);
        if (!d.exists) d.create({ intermediates: true, idempotent: true });
        return d;
    }, [cachedFileDirectory]);

    const file = useMemo(
        () => dir
            ? new File(dir, cachedFileName)
            : new File(Paths.cache, cachedFileName),
        [dir, cachedFileName],
    );

    const checkIfFileExistsInCache = useCallback(() => {
        try {
            return file.exists;
        } catch (error) {
            console.error(error);
            console.error("Failed to check if file exists in cache");
            return false;
        }
    }, [file]);

    const readFileFromCache = useCallback(async () => {
        try {
            if (!file.exists) return null;
            return await file.text();
        } catch (error) {
            console.error(error);
            console.error("Failed to read file from cache");
            return null;
        }
    }, [file]);

    const saveDataToCache = useCallback((data: string) => {
        try {
            file.write(data);
            return true;
        } catch (error) {
            console.error(error);
            console.error("Failed to save data to cache");
            return false;
        }
    }, [file]);

    const appendLineToFile = useCallback((line: string) => {
        try {
            const content = file.exists ? `\n${line}` : line;
            file.write(content, { append: true });
            return true;
        } catch (error) {
            console.error(error);
            console.error("Failed to append line to cache file");
            return false;
        }
    }, [file]);

    const readAllFilesFromDirectory = useCallback(() => {
        try {
            if (!dir || !dir.exists) return [];
            return dir.list().map(entry => entry.name);
        } catch (error) {
            console.error(error);
            console.error("Failed to read all files from cache");
            return [];
        }
    }, [dir]);

    const readFileFromCacheByName = useCallback(async (fileName: string) => {
        try {
            const target = dir
                ? new File(dir, fileName)
                : new File(Paths.cache, fileName);
            if (!target.exists) return null;
            return await target.text();
        } catch (error) {
            console.error(error);
            console.error("Failed to read file from cache by name");
            return null;
        }
    }, [dir]);

    return { checkIfFileExistsInCache, readFileFromCache, saveDataToCache, appendLineToFile, readAllFilesFromDirectory, readFileFromCacheByName };
}

export default useCache;
