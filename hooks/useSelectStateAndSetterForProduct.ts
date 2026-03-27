import { Product, PRODUCT_TYPE } from "@/@types";
import { useProducts } from "@/contexts/ProductsContext";

const useSelectStateAndSetterForProduct = () => {
    const productsContext = useProducts();

    const selectStateAndSetterForProduct = (type: PRODUCT_TYPE) => {
        let state, setState;

        switch (type) {
            case PRODUCT_TYPE.PRINT:
                state = productsContext.prints;
                setState = productsContext.setPrints;
                break;
            case PRODUCT_TYPE.STICKER:
                state = productsContext.stickers;
                setState = productsContext.setStickers;
                break;
            case PRODUCT_TYPE.KEYCHAIN:
                state = productsContext.keychains;
                setState = productsContext.setKeychains;
                break;
            case PRODUCT_TYPE.PIN:
                state = productsContext.pins;
                setState = productsContext.setPins;
                break;
            case PRODUCT_TYPE.BOOKMARK:
                state = productsContext.bookmarks;
                setState = productsContext.setBookmarks;
                break;
        }

        setState = setState as (products: Product[], type: PRODUCT_TYPE) => void;

        return { state, setState };
    };

    return selectStateAndSetterForProduct;
}

export default useSelectStateAndSetterForProduct;