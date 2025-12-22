import { createContext, useContext, useEffect, useState } from "react";

import { Keychain, Print, Sticker } from '@/@types';
import defaultPrints from '@/constants/products/prints.default';
import defaultStickers from '@/constants/products/stickers.default';
import useCache from "@/hooks/useCache";
import defaultKeychains from "@/constants/products/keychains.default";

type ProductsContextProvider = {
    keychains: Keychain[];
    setKeychains: (keychains: Keychain[]) => Promise<void>;
    prints: Print[];
    setPrints: (prints: Print[]) => Promise<void>;
    stickers: Sticker[];
    setStickers: (stickers: Sticker[]) => Promise<void>;
    productsLoaded: boolean;
    productsLoadingError: string | null;
}

const ProductsContext = createContext<ProductsContextProvider>({
    keychains: [],
    setKeychains: async () => {},
    prints: [],
    setPrints: async () => {},
    stickers: [],
    setStickers: async () => {},
    productsLoaded: false,
    productsLoadingError: null,
})

export const ProductsProvider = ({ children }: { children: React.ReactNode }) => {
    const { readFileFromCache: readKeychainsFromCache, saveDataToCache: saveKeychainsToCache } = useCache('keychains.json');
    const { readFileFromCache: readPrintsFromCache, saveDataToCache: savePrintsToCache } = useCache('prints.json');
    const { readFileFromCache: readStickersFromCache, saveDataToCache: saveStickersToCache } = useCache('stickers.json');

    const [keychains, _setKeychains] = useState<Keychain[]>([]);
    const [prints, _setPrints] = useState<Print[]>([]);
    const [stickers, _setStickers] = useState<Sticker[]>([]);

    const [productsLoadingError, setProductsLoadingError] = useState<string | null>(null);
    const [productsLoaded, setProductsLoaded] = useState(false);

    useEffect(() => {
        const readProductsDataFromCache = async () => {
            try {
                const cachedStickers = await readStickersFromCache();
                if (cachedStickers) _setStickers(JSON.parse(cachedStickers));
                // TODO: rewrite this to use a copy of the prints.json
                else _setStickers(defaultStickers);
            } catch (error) {
                console.error(`[ERROR] ProductsContextProvider.readProductsDataFromCache.readStickers \n ${error}`);
                setProductsLoadingError('Failed to load stickers from cache.');
                return;
            }

            try {
                const cachedPrints = await readPrintsFromCache();
                if (cachedPrints) _setPrints(JSON.parse(cachedPrints));
                // TODO: rewrite this to use a copy of the prints.json
                else _setPrints(defaultPrints);
            } catch (error) {
                console.error(`[ERROR] ProductsContextProvider.readProductsDataFromCache.readPrints \n ${error}`);
                setProductsLoadingError('Failed to load prints from cache.');
                return;
            }

            try {
                const cachedKeychains = await readKeychainsFromCache();
                if (cachedKeychains) _setKeychains(JSON.parse(cachedKeychains));
                // TODO: rewrite this to use a copy of the keychains.json
                else _setKeychains(defaultKeychains);
            } catch (error) {
                console.error(`[ERROR] ProductsContextProvider.readProductsDataFromCache.readKeychains \n ${error}`);
                setProductsLoadingError('Failed to load keychains from cache.');
                return;
            }

            setProductsLoaded(true);
        }

        readProductsDataFromCache();
    }, []);

    const setKeychains = async (keychains: Keychain[]) => {
        _setKeychains(keychains);
        await saveKeychainsToCache(JSON.stringify(keychains));
    }

    const setPrints = async (prints: Print[]) => {
        _setPrints(prints);
        await savePrintsToCache(JSON.stringify(prints));
    }

    const setStickers = async (stickers: Sticker[]) => {
        _setStickers(stickers);
        await saveStickersToCache(JSON.stringify(stickers));
    }

    return (
        <ProductsContext.Provider value={{ keychains, setKeychains, prints, setPrints, stickers, setStickers, productsLoaded, productsLoadingError }}>
            {children}
        </ProductsContext.Provider>
    )
}

export const useProducts = () => useContext(ProductsContext);