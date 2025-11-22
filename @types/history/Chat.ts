import { ProductCategory, Product } from '../products';

type ChatMessage = {
    productName: Product['name'];
    productQuantity: Product['stock'];
    productCategory: ProductCategory
    timestamp: Date;
}

export default ChatMessage;