import { ProductCategory, Product } from '../products';

type Transaction = {
    productName: Product['name'];
    productQuantity: Product['stock'];
    productCategory: ProductCategory
    timestamp: Date;
}

export default Transaction;