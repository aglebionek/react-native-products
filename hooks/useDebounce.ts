import { useEffect, useRef, useCallback } from "react";

export const useDebounce = (func: (...args: any[]) => any, delay: number, dependencies: any[] = []) => {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const debouncedFunction = useCallback((...args: any[]) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            func(...args);
        }, delay);
    }, [func, delay, ...dependencies]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return debouncedFunction;
}