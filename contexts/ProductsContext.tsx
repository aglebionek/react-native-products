import { createContext, useContext, useEffect, useState } from "react";

import { Print, Sticker } from '@/@types';
import defaultPrints from '@/constants/products/prints.default';
import defaultStickers from '@/constants/products/stickers.default';
import useCache from "@/hooks/useCache";

type ProductsContextProvider = {
    prints: Print[];
    setPrints: React.Dispatch<React.SetStateAction<Print[]>>;
    stickers: Sticker[];
    setStickers: React.Dispatch<React.SetStateAction<Sticker[]>>;
    productsLoaded: boolean;
    productsLoadingError: string | null;
}

const ProductsContext = createContext<ProductsContextProvider>({
    prints: [],
    setPrints: () => { },
    stickers: [],
    setStickers: () => { },
    productsLoaded: false,
    productsLoadingError: null,
})

export const ProductsProvider = ({ children }: { children: React.ReactNode }) => {
    const { readFileFromCache: readPrintsFromCache, saveDataToCache: savePrintsToCache } = useCache('prints.json');
    const { readFileFromCache: readStickersFromCache, saveDataToCache: saveStickersToCache } = useCache('stickers.json');

    const [prints, setPrints] = useState<Print[]>([]);
    const [stickers, setStickers] = useState<Sticker[]>([]);

    const [productsLoadingError, setProductsLoadingError] = useState<string | null>(null);
    const [productsLoaded, setProductsLoaded] = useState(false);

    useEffect(() => {
        const readProductsDataFromCache = async () => {
            try {
                const cachedStickers = await readStickersFromCache();
                if (cachedStickers) return setStickers(JSON.parse(cachedStickers));
                setStickers(defaultStickers);
            } catch (error) {
                console.error(`[ERROR] ProductsContextProvider.readProductsDataFromCache.readStickers \n ${error}`);
                setProductsLoadingError('Failed to load stickers from cache.');
                return;
            }

            try {
                const cachedPrints = await readPrintsFromCache();
                if (cachedPrints) return setPrints(JSON.parse(cachedPrints));
                setPrints(defaultPrints);
            } catch (error) {
                console.error(`[ERROR] ProductsContextProvider.readProductsDataFromCache.readPrints \n ${error}`);
                setProductsLoadingError('Failed to load prints from cache.');
                return;
            }

            setProductsLoaded(true);
        }

        readProductsDataFromCache();
    }, []);

    return (
        <ProductsContext.Provider value={{ prints, setPrints, stickers, setStickers, productsLoaded, productsLoadingError }}>
            {children}
        </ProductsContext.Provider>
    )
}

export const useProducts = () => useContext(ProductsContext);