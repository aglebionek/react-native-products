import { Product, PRODUCT_TYPE } from "@/@types";
import { PrintFormat } from "@/@types/products";
import useSelectStateAndSetterForProduct from "@/hooks/useSelectStateAndSetterForProduct";

const checkIfNameExists = (name: string, products: Product[]) => {
    return products.some(product => product.name.toLowerCase() === name.toLowerCase());
}

const useManageProducts = () => {
    const selectStateAndSetterForProduct = useSelectStateAndSetterForProduct();

    const getProductByName = (name: string, type: PRODUCT_TYPE): Product | null => {
        const { state } = selectStateAndSetterForProduct(type);
        if (!state) return null;

        const product = state.find(p => p.name.toLowerCase() === name.toLowerCase());
        return product || null;
    }

    const handleAddNewProduct = async (product: Product) => {
        const { state, setState } = selectStateAndSetterForProduct(product.type);
        if (!state || !setState) return false;

        if (checkIfNameExists(product.name, state)) return false;

        const updatedProducts = [...state, product];
        await setState(updatedProducts, product.type);

        return true;
    }

    const handleDeleteProduct = async (product: Product) => {
        const { state, setState } = selectStateAndSetterForProduct(product.type);
        if (!state || !setState) return;

        const updatedProducts = state.filter(p => p.name !== product.name);
        await setState(updatedProducts, product.type);
    }

    const handleUpdateExistingProduct = async (oldProduct: Product, newProduct: Product) => {
        const { state: currentProducts, setState } = selectStateAndSetterForProduct(oldProduct.type);
        if (!currentProducts || !setState) return false;

        const didNameChange = oldProduct.name !== newProduct.name;

        if (didNameChange && checkIfNameExists(newProduct.name, currentProducts)) return false;

        const updatedProducts = currentProducts.map(p => p.name === oldProduct.name ? newProduct : p);
        await setState(updatedProducts, oldProduct.type);

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

    const handleUpdateStockForProduct = async (product: Product, newStock: number) => {
        const { state, setState } = selectStateAndSetterForProduct(product.type);
        if (!state || !setState) return;

        product.stock = newStock;
        const updatedProducts = state.map(p => p.name === product.name ? product : p);
        await setState(updatedProducts, product.type);
    }

    return { getProductByName, handleAddNewProduct, handleDeleteProduct, handleUpdateExistingProduct, mutations: { handleChangePrintFormat, handleUpdateStockForProduct } };
};

export default useManageProducts;