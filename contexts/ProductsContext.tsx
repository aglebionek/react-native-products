import { createContext, useContext, useEffect, useState } from "react";

import { Print, Sticker } from '@/@types';
import defaultPrints from '@/constants/products/prints.default';
import defaultStickers from '@/constants/products/stickers.default';
import useCache from "@/hooks/useCache";

type ProductsContextProvider = {
    prints: Print[];
    setPrints: (prints: Print[]) => Promise<void>;
    stickers: Sticker[];
    setStickers: (stickers: Sticker[]) => Promise<void>;
    productsLoaded: boolean;
    productsLoadingError: string | null;
}

const ProductsContext = createContext<ProductsContextProvider>({
    prints: [],
    setPrints: async () => {},
    stickers: [],
    setStickers: async () => {},
    productsLoaded: false,
    productsLoadingError: null,
})

export const ProductsProvider = ({ children }: { children: React.ReactNode }) => {
    const { readFileFromCache: readPrintsFromCache, saveDataToCache: savePrintsToCache } = useCache('prints.json');
    const { readFileFromCache: readStickersFromCache, saveDataToCache: saveStickersToCache } = useCache('stickers.json');

    const [prints, _setPrints] = useState<Print[]>([]);
    const [stickers, _setStickers] = useState<Sticker[]>([]);

    const [productsLoadingError, setProductsLoadingError] = useState<string | null>(null);
    const [productsLoaded, setProductsLoaded] = useState(false);

    useEffect(() => {
        const readProductsDataFromCache = async () => {
            try {
                const cachedStickers = await readStickersFromCache();
                if (cachedStickers) return _setStickers(JSON.parse(cachedStickers));
                // TODO: rewrite this to use a copy of the prints.json
                _setStickers(defaultStickers);
            } catch (error) {
                console.error(`[ERROR] ProductsContextProvider.readProductsDataFromCache.readStickers \n ${error}`);
                setProductsLoadingError('Failed to load stickers from cache.');
                return;
            }

            try {
                const cachedPrints = await readPrintsFromCache();
                if (cachedPrints) return _setPrints(JSON.parse(cachedPrints));
                _setPrints(defaultPrints);
            } catch (error) {
                console.error(`[ERROR] ProductsContextProvider.readProductsDataFromCache.readPrints \n ${error}`);
                setProductsLoadingError('Failed to load prints from cache.');
                return;
            }

            setProductsLoaded(true);
        }

        readProductsDataFromCache();
    }, []);

    const setPrints = async (prints: Print[]) => {
        _setPrints(prints);
        await savePrintsToCache(JSON.stringify(prints));
    }

    const setStickers = async (stickers: Sticker[]) => {
        _setStickers(stickers);
        await saveStickersToCache(JSON.stringify(stickers));
    }

    return (
        <ProductsContext.Provider value={{ prints, setPrints, stickers, setStickers, productsLoaded, productsLoadingError }}>
            {children}
        </ProductsContext.Provider>
    )
}

export const useProducts = () => useContext(ProductsContext);