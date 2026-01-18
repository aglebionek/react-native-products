enum PRODUCT_TYPE {
    PRINT = 0,
    NAKLEJKA = 1,
    BRELOCZEK = 2,
    PIN = 3,
    BOOKMARK = 4
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
    formats: PrintFormat[];
}

type Sticker = BaseProduct & {
    type: PRODUCT_TYPE.NAKLEJKA;
    holo: boolean;
}

type Keychain = BaseProduct & {
    type: PRODUCT_TYPE.BRELOCZEK;
}

type Pin = BaseProduct & {
    type: PRODUCT_TYPE.PIN;
}

type Bookmark = BaseProduct & {
    type: PRODUCT_TYPE.BOOKMARK;
}

type Product = Print | Sticker | Keychain | Pin | Bookmark;

export { ProductCategory, PRODUCT_TYPE, Product, Sticker, Print, BaseProduct, PrintFormat, Keychain, Pin, Bookmark };
