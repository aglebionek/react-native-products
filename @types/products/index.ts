enum PRODUCT_TYPE {
    PRINT = 0,
    NAKLEJKA = 1,
}

type PrintFormat = 'A4' | 'A5' | 'A6';

type ProductCategory = 'N' | PrintFormat;

type BaseProduct = {
    name: string;
    keywords: string[];
    stock: number;
}

type Print = BaseProduct & {
    type: PRODUCT_TYPE.PRINT;
    formats: string[];
}

type Sticker = BaseProduct & {
    type: PRODUCT_TYPE.NAKLEJKA;
    holo: boolean;
}

type Product = Print | Sticker;

export { ProductCategory, PRODUCT_TYPE, Product, Sticker, Print, BaseProduct, PrintFormat };
