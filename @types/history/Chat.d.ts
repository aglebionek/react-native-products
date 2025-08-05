import Product from "../products/Product";
import ProductCategory from "../products/ProductCategory";

type ChatMessage = {
    productName: Product['name'];
    productQuantity: Product['quantity'];
    productCategory: ProductCategory
    timestamp: Date;
}

export default ChatMessage;