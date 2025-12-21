import { Print, Product, PRODUCT_TYPE } from "@/@types";
import { PrintFormat } from "@/@types/products";
import { useProducts } from "@/contexts/ProductsContext";

const useManageProducts = () => {
    const { prints, stickers, setPrints, setStickers } = useProducts();

    const handleAddNewProduct = async (product: Product) => {
        if (product.type === PRODUCT_TYPE.PRINT) {
            const updatedPrints = [...prints, product];
            await setPrints(updatedPrints);
        } else if (product.type === PRODUCT_TYPE.NAKLEJKA) {
            const updatedStickers = [...stickers, product];
            await setStickers(updatedStickers);
        }
    };

    const handleDeleteProduct = async (product: Product) => {
        if (product.type === PRODUCT_TYPE.PRINT) {
            const updatedPrints = prints.filter(p => p.name !== product.name);
            await setPrints(updatedPrints);
        } else if (product.type === PRODUCT_TYPE.NAKLEJKA) {
            const updatedStickers = stickers.filter(p => p.name !== product.name);
            await setStickers(updatedStickers);
        }
    };

    const handleUpdateExistingProduct = async (product: Product) => {
        if (product.type === PRODUCT_TYPE.PRINT) {
            const filteredPrints = prints.filter(p => p.name !== product.name);
            filteredPrints.push(product);
            await setPrints(filteredPrints);
        } else if (product.type === PRODUCT_TYPE.NAKLEJKA) {
            const updatedStickers = stickers.filter(p => p.name !== product.name);
            updatedStickers.push(product);
            await setStickers(updatedStickers);
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