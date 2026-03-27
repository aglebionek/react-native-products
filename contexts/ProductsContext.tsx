import { createContext, useContext, useEffect, useState } from "react";

import { Bookmark, Keychain, Pin, Print, Sticker } from '@/@types';
import defaultBookmarks from "@/constants/products/bookmarks.default";
import defaultKeychains from "@/constants/products/keychains.default";
import defaultPins from "@/constants/products/pins.default";
import defaultPrints from '@/constants/products/prints.default';
import defaultStickers from '@/constants/products/stickers.default';
import useCache from "@/hooks/useCache";

type ProductsContextProvider = {
    keychains: Keychain[];
    setKeychains: (keychains: Keychain[]) => void;
    prints: Print[];
    setPrints: (prints: Print[]) => void;
    stickers: Sticker[];
    setStickers: (stickers: Sticker[]) => void;
    pins: Pin[];
    setPins: (pins: Pin[]) => void;
    bookmarks: Bookmark[];
    setBookmarks: (bookmarks: Bookmark[]) => void;
    productsLoaded: boolean;
    productsLoadingError: string | null;
}

const ProductsContext = createContext<ProductsContextProvider>({
    keychains: [],
    setKeychains: () => { },
    prints: [],
    setPrints: () => { },
    stickers: [],
    setStickers: () => { },
    pins: [],
    setPins: () => { },
    bookmarks: [],
    setBookmarks: () => { },
    productsLoaded: false,
    productsLoadingError: null,
})

export const ProductsProvider = ({ children }: { children: React.ReactNode }) => {
    const { readFileFromCache: readKeychainsFromCache, saveDataToCache: saveKeychainsToCache } = useCache('keychains.json');
    const { readFileFromCache: readPrintsFromCache, saveDataToCache: savePrintsToCache } = useCache('prints.json');
    const { readFileFromCache: readStickersFromCache, saveDataToCache: saveStickersToCache } = useCache('stickers.json');
    const { readFileFromCache: readPinsFromCache, saveDataToCache: savePinsToCache } = useCache('pins.json');
    const { readFileFromCache: readBookmarksFromCache, saveDataToCache: saveBookmarksToCache } = useCache('bookmarks.json');

    const [keychains, _setKeychains] = useState<Keychain[]>([]);
    const [prints, _setPrints] = useState<Print[]>([]);
    const [stickers, _setStickers] = useState<Sticker[]>([]);
    const [pins, _setPins] = useState<Pin[]>([]);
    const [bookmarks, _setBookmarks] = useState<Bookmark[]>([]);

    const [productsLoadingError, setProductsLoadingError] = useState<string | null>(null);
    const [productsLoaded, setProductsLoaded] = useState(false);

    useEffect(() => {
        try {
            const cachedStickers = readStickersFromCache();
            if (cachedStickers) _setStickers(JSON.parse(cachedStickers));
            // TODO: rewrite this to use a copy of the prints.json
            else _setStickers(defaultStickers);
        } catch (error) {
            console.error(`[ERROR] ProductsContextProvider.readProductsDataFromCache.readStickers \n ${error}`);
            setProductsLoadingError('Failed to load stickers from cache.');
            return;
        }

        try {
            const cachedPrints = readPrintsFromCache();
            if (cachedPrints) _setPrints(JSON.parse(cachedPrints));
            // TODO: rewrite this to use a copy of the prints.json
            else _setPrints(defaultPrints);
        } catch (error) {
            console.error(`[ERROR] ProductsContextProvider.readProductsDataFromCache.readPrints \n ${error}`);
            setProductsLoadingError('Failed to load prints from cache.');
            return;
        }

        try {
            const cachedKeychains = readKeychainsFromCache();
            if (cachedKeychains) _setKeychains(JSON.parse(cachedKeychains));
            // TODO: rewrite this to use a copy of the keychains.json
            else _setKeychains(defaultKeychains);
        } catch (error) {
            console.error(`[ERROR] ProductsContextProvider.readProductsDataFromCache.readKeychains \n ${error}`);
            setProductsLoadingError('Failed to load keychains from cache.');
            return;
        }

        try {
            const cachedPins = readPinsFromCache();
            if (cachedPins) _setPins(JSON.parse(cachedPins));
            // TODO: rewrite this to use a copy of the pins.json
            else _setPins(defaultPins);
        } catch (error) {
            console.error(`[ERROR] ProductsContextProvider.readProductsDataFromCache.readPins \n ${error}`);
            setProductsLoadingError('Failed to load pins from cache.');
            return;
        }

        try {
            const cachedBookmarks = readBookmarksFromCache();
            if (cachedBookmarks) _setBookmarks(JSON.parse(cachedBookmarks));
            // TODO: rewrite this to use a copy of the bookmarks.json
            else _setBookmarks(defaultBookmarks);
        } catch (error) {
            console.error(`[ERROR] ProductsContextProvider.readProductsDataFromCache.readBookmarks \n ${error}`);
            setProductsLoadingError('Failed to load bookmarks from cache.');
            return;
        }

        setProductsLoaded(true);
    }, []);

    const setKeychains = (keychains: Keychain[]) => {
        _setKeychains(keychains);
        saveKeychainsToCache(JSON.stringify(keychains));
    }

    const setPrints = (prints: Print[]) => {
        _setPrints(prints);
        savePrintsToCache(JSON.stringify(prints));
    }

    const setStickers = (stickers: Sticker[]) => {
        _setStickers(stickers);
        saveStickersToCache(JSON.stringify(stickers));
    }

    const setPins = (pins: Pin[]) => {
        _setPins(pins);
        savePinsToCache(JSON.stringify(pins));
    }

    const setBookmarks = (bookmarks: Bookmark[]) => {
        _setBookmarks(bookmarks);
        saveBookmarksToCache(JSON.stringify(bookmarks));
    }

    return (
        <ProductsContext.Provider value={{ keychains, setKeychains, prints, setPrints, stickers, setStickers, pins, setPins, bookmarks, setBookmarks, productsLoaded, productsLoadingError }}>
            {children}
        </ProductsContext.Provider>
    )
}

export const useProducts = () => useContext(ProductsContext);