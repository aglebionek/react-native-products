import { Product, PRODUCT_TYPE } from "@/@types";
import { PrintFormat } from "@/@types/products";
import { useProducts } from "@/contexts/ProductsContext";

const useManageProducts = () => {
    const { keychains, prints, stickers, setKeychains, setPrints, setStickers } = useProducts();

    const handleAddNewProduct = async (product: Product) => {
        if (product.type === PRODUCT_TYPE.PRINT) {
            const updatedPrints = [...prints, product];
            await setPrints(updatedPrints);
        } else if (product.type === PRODUCT_TYPE.NAKLEJKA) {
            const updatedStickers = [...stickers, product];
            await setStickers(updatedStickers);
        } else if (product.type === PRODUCT_TYPE.BRELOCZEK) {
            const updatedKeychains = [...keychains, product];
            await setKeychains(updatedKeychains);
        }
    };

    const handleDeleteProduct = async (product: Product) => {
        if (product.type === PRODUCT_TYPE.PRINT) {
            const updatedPrints = prints.filter(p => p.name !== product.name);
            await setPrints(updatedPrints);
        } else if (product.type === PRODUCT_TYPE.NAKLEJKA) {
            const updatedStickers = stickers.filter(p => p.name !== product.name);
            await setStickers(updatedStickers);
        } else if (product.type === PRODUCT_TYPE.BRELOCZEK) {
            const updatedKeychains = keychains.filter(p => p.name !== product.name);
            await setKeychains(updatedKeychains);
        }
    };

    const handleUpdateExistingProduct = async (oldProduct: Product, newProduct: Product) => {
        if (oldProduct.type === PRODUCT_TYPE.PRINT && newProduct.type === PRODUCT_TYPE.PRINT) {
            const updatedPrints = prints.map(p => p.name === oldProduct.name ? newProduct : p);
            await setPrints(updatedPrints);
        } else if (oldProduct.type === PRODUCT_TYPE.NAKLEJKA && newProduct.type === PRODUCT_TYPE.NAKLEJKA) {
            const updatedStickers = stickers.map(p => p.name === oldProduct.name ? newProduct : p);
            await setStickers(updatedStickers);
        } else if (oldProduct.type === PRODUCT_TYPE.BRELOCZEK && newProduct.type === PRODUCT_TYPE.BRELOCZEK) {
            const updatedKeychains = keychains.map(p => p.name === oldProduct.name ? newProduct : p);
            await setKeychains(updatedKeychains);
        }
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