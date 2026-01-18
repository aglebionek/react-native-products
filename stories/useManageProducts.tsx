import { Product, PRODUCT_TYPE } from "@/@types";
import { PrintFormat } from "@/@types/products";
import { useProducts } from "@/contexts/ProductsContext";

const checkIfNameExists = (name: string, products: Product[]) => {
    return products.some(product => product.name.toLowerCase() === name.toLowerCase());
}

const useManageProducts = () => {
    const { bookmarks, keychains, pins, prints, stickers, setBookmarks, setKeychains, setPins, setPrints, setStickers } = useProducts();

    const handleAddNewProduct = async (product: Product) => {
        let productAdded = false;

        switch (product.type) {
            case PRODUCT_TYPE.PRINT: {
                if (checkIfNameExists(product.name, prints)) break;
                const updatedPrints = [...prints, product];
                await setPrints(updatedPrints);
                productAdded = true;
                break;
            }
            case PRODUCT_TYPE.NAKLEJKA: {
                if (checkIfNameExists(product.name, stickers)) break;
                const updatedStickers = [...stickers, product];
                await setStickers(updatedStickers);
                productAdded = true;
                break;
            }
            case PRODUCT_TYPE.BRELOCZEK: {
                if (checkIfNameExists(product.name, keychains)) break;
                const updatedKeychains = [...keychains, product];
                await setKeychains(updatedKeychains);
                productAdded = true;
                break;
            }
            case PRODUCT_TYPE.PIN: {
                if (checkIfNameExists(product.name, pins)) break;
                const updatedPins = [...pins, product];
                await setPins(updatedPins);
                productAdded = true;
                break;
            }
            case PRODUCT_TYPE.BOOKMARK: {
                if (checkIfNameExists(product.name, bookmarks)) break;
                const updatedBookmarks = [...bookmarks, product];
                await setBookmarks(updatedBookmarks);
                break;
            }
        }

        return productAdded;
    };

    const handleDeleteProduct = async (product: Product) => {
        switch (product.type) {
            case PRODUCT_TYPE.PRINT: {
                const updatedPrints = prints.filter(p => p.name !== product.name);
                await setPrints(updatedPrints);
                break;
            }
            case PRODUCT_TYPE.NAKLEJKA: {
                const updatedStickers = stickers.filter(p => p.name !== product.name);
                await setStickers(updatedStickers);
                break;
            }
            case PRODUCT_TYPE.BRELOCZEK: {
                const updatedKeychains = keychains.filter(p => p.name !== product.name);
                await setKeychains(updatedKeychains);
                break;
            }
            case PRODUCT_TYPE.PIN: {
                const updatedPins = pins.filter(p => p.name !== product.name);
                await setPins(updatedPins);
                break;
            }
            case PRODUCT_TYPE.BOOKMARK: {
                const updatedBookmarks = bookmarks.filter(p => p.name !== product.name);
                await setBookmarks(updatedBookmarks);
                break;
            }
        }
    };

    const handleUpdateExistingProduct = async (oldProduct: Product, newProduct: Product) => {
        const didNameChange = oldProduct.name !== newProduct.name;
        
        if (oldProduct.type === PRODUCT_TYPE.PRINT && newProduct.type === PRODUCT_TYPE.PRINT) {
            if (didNameChange && checkIfNameExists(newProduct.name, prints)) return false;
            const updatedPrints = prints.map(p => p.name === oldProduct.name ? newProduct : p);
            await setPrints(updatedPrints);
        } else if (oldProduct.type === PRODUCT_TYPE.NAKLEJKA && newProduct.type === PRODUCT_TYPE.NAKLEJKA) {
            if (didNameChange && checkIfNameExists(newProduct.name, stickers)) return false;
            const updatedStickers = stickers.map(p => p.name === oldProduct.name ? newProduct : p);
            await setStickers(updatedStickers);
        } else if (oldProduct.type === PRODUCT_TYPE.BRELOCZEK && newProduct.type === PRODUCT_TYPE.BRELOCZEK) {
            if (didNameChange && checkIfNameExists(newProduct.name, keychains)) return false;
            const updatedKeychains = keychains.map(p => p.name === oldProduct.name ? newProduct : p);
            await setKeychains(updatedKeychains);
        } else if (oldProduct.type === PRODUCT_TYPE.PIN && newProduct.type === PRODUCT_TYPE.PIN) {
            if (didNameChange && checkIfNameExists(newProduct.name, pins)) return false;
            const updatedPins = pins.map(p => p.name === oldProduct.name ? newProduct : p);
            await setPins(updatedPins);
        } else if (oldProduct.type === PRODUCT_TYPE.BOOKMARK && newProduct.type === PRODUCT_TYPE.BOOKMARK) {
            if (didNameChange && checkIfNameExists(newProduct.name, bookmarks)) return false;
            const updatedBookmarks = bookmarks.map(p => p.name === oldProduct.name ? newProduct : p);
            await setBookmarks(updatedBookmarks);
        }

        return true;
    }

    const handleChangePrintFormat = (product: Product, format: PrintFormat) => {
        if (product.type !== PRODUCT_TYPE.PRINT) return product;
        if (product.formats.includes(format)) {
            product.formats = product.formats.filter(f => f !== format);
        } else {
            product.formats.push(format);
        }
        return product;
    }

    return { handleAddNewProduct, handleDeleteProduct, handleUpdateExistingProduct, mutations: { handleChangePrintFormat } };
};

export default useManageProducts;