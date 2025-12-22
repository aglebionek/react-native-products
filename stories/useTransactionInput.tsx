import { ChatMessage, Product, PRODUCT_TYPE, ProductCategory } from "@/@types";
import { useTransactions } from "@/contexts/TransactionsContext";
import { useProducts } from "@/contexts/ProductsContext";
import { getCurrentDateInPolishTimezone } from "@/utils/common";
import { useFocusEffect } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { ToastAndroid } from "react-native";

interface useTransactionInput {
    initialTransaction: ChatMessage | null;
}

export enum InputStates {
    SELECTING_CATEGORY = 1,
    SELECTING_PRODUCT = 2,
    SELECTING_QUANTITY = 3,
}

export const useTransactionInput = (initialTransaction: ChatMessage | null = null) => {
    const initialCategory = initialTransaction ? initialTransaction.productCategory : null;
    const initialQuantity = initialTransaction ? initialTransaction.productQuantity : 1;

    const { handleAddChatMessage, handleEditChatMessage } = useTransactions();

    const { keychains, stickers, prints, setKeychains, setStickers, setPrints } = useProducts();
    const [inputState, setInputState] = useState(InputStates.SELECTING_CATEGORY);

    const [category, setCategory] = useState<ProductCategory | null>(initialCategory);
    const [inputValue, setInputValue] = useState('');
    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState(initialQuantity);
    const [categorySuggestions, setCategorySuggestions] = useState<ProductCategory[]>([]);
    const [productSuggestions, setProductSuggestions] = useState<Product[]>([]);

    const productsCategories: Record<ProductCategory, Product[]> = useMemo(() => ({
        "A4": prints.filter(print => print.formats.includes('A4')),
        "A5": prints.filter(print => print.formats.includes('A5')),
        "A6": prints.filter(print => print.formats.includes('A6')),
        "B": keychains,
        "N": stickers,
    }), [keychains, stickers, prints]);

    useFocusEffect(
        useCallback(() => {
            if (initialTransaction) {
                const product = productsCategories[initialTransaction.productCategory].find(p => p.name === initialTransaction.productName) || null;
                if (!product) return;
                setProduct(product);
                setInputState(InputStates.SELECTING_QUANTITY);
                setInputValue(`${initialTransaction.productCategory} ${product.name} ${initialTransaction.productQuantity}`);
            }
        }, [])
    );

    const handleSetDefaultStates = () => {
        setInputValue('');
        setCategory(null);
        setCategorySuggestions([]);
        setProduct(null);
        setProductSuggestions([]);
        setInputState(InputStates.SELECTING_CATEGORY);
        setQuantity(1);
    }

    const handleSetCategory = (text: ProductCategory) => {
        setCategory(text);
        setInputValue(`${text} `);
        setProductSuggestions([]);
        setInputState(InputStates.SELECTING_PRODUCT);
    }

    const handleSetProduct = (product: Product) => {
        setProduct(product);
        setInputValue(`${category} ${product.name} ${quantity}`);
        setInputState(InputStates.SELECTING_QUANTITY);
    }

    const handleUnsetSelectingQuantity = () => {
        setInputState(InputStates.SELECTING_PRODUCT);
        setQuantity(1);
        setInputValue(inputValue.replace(/\s\d+$/, ''));
    }

    const onChangeInputText = (inputText: string) => {
        const isBackspace = inputText.length < inputValue.length;
        inputText = inputText.trimStart();
        inputText = inputText.replace(/\s+/g, ' ');
        inputText = inputText.replace(/[^a-zA-Z0-9 ]/g, '')
        const parts = inputText.split(' ').filter(part => part.length > 0);
        setInputValue(inputText);
        if (inputText.length === 0) return handleSetDefaultStates();

        switch (inputState) {
            case InputStates.SELECTING_CATEGORY: {
                inputText = inputText.toUpperCase();

                if (inputText in productsCategories) return handleSetCategory(inputText as ProductCategory);

                const filteredCategories = Object.keys(productsCategories).filter(cat => cat.startsWith(inputText));
                setCategorySuggestions(filteredCategories as ProductCategory[]);

                if (inputText.endsWith(' ')) {
                    const cat = parts[0].toUpperCase() as ProductCategory;
                    if (productsCategories[cat]) {
                        setCategory(cat);
                        setInputState(InputStates.SELECTING_PRODUCT);
                    } else {
                        ToastAndroid.show(`No category found for "${cat}"`, ToastAndroid.SHORT);
                    }
                }
                break;
            }
            case InputStates.SELECTING_PRODUCT: {
                const keywords = parts.slice(1, parts.length);
                if (keywords.length === 0 && isBackspace && inputText[inputText.length - 1] !== ' ') {
                    setCategory(parts[0].toUpperCase() as ProductCategory);
                    setProductSuggestions([]);
                    setInputState(InputStates.SELECTING_CATEGORY);
                    return;
                }

                if (keywords.length === 0) return;
                let filteredProducts = [];
                let valuesToFilter = productSuggestions;
                const lastKeyword = keywords[keywords.length - 1]?.toLowerCase() || '';
                if (lastKeyword.length <= 1 || isBackspace) {
                    valuesToFilter = productsCategories[category as ProductCategory];
                }

                filteredProducts = valuesToFilter.filter(product => product.stock > 0).filter(product => {
                    return keywords.every((kw) => product.keywords.some((productKw) => productKw.toLowerCase().startsWith(kw.toLowerCase())));
                });
                filteredProducts.sort((a, b) => {
                    const aStartsWith = a.name.toLowerCase().startsWith(lastKeyword);
                    const bStartsWith = b.name.toLowerCase().startsWith(lastKeyword);
                    if (aStartsWith && !bStartsWith) return -1;
                    if (!aStartsWith && bStartsWith) return 1;
                    return a.name.localeCompare(b.name);
                });

                setProductSuggestions(filteredProducts);
                break;
            }
            case InputStates.SELECTING_QUANTITY: {
                const i = parts.length - 1;
                if (i === 1 && isBackspace) return handleUnsetSelectingQuantity();
                const lastPart = parts[i].trim();
                if (lastPart.length === 0) setQuantity(1);
                if (!isNaN(Number(lastPart))) {
                    const newQuantity = Number(lastPart);
                    setQuantity(newQuantity);
                }
                break;
            }
        }
    }

    const onSubmitEditing = () => {
        if (inputState !== InputStates.SELECTING_QUANTITY) return;
        if (!product) {
            ToastAndroid.show('No product selected', ToastAndroid.SHORT);
            return;
        }
        if (!category) {
            ToastAndroid.show('No category selected', ToastAndroid.SHORT);
            return;
        }

        const timestamp = initialTransaction ? initialTransaction.timestamp : getCurrentDateInPolishTimezone();

        const newChatHistory: ChatMessage = {
            productName: product.name,
            productQuantity: quantity,
            productCategory: category,
            timestamp
        };

        let updateFunction = null;
        if (product.type === PRODUCT_TYPE.PRINT) {
            const filteredPrints = prints.filter(p => p.name !== product.name);
            product.stock -= quantity;
            filteredPrints.push(product);
            updateFunction = () => setPrints(filteredPrints);
        } else if (product.type === PRODUCT_TYPE.NAKLEJKA) {
            const updatedStickers = stickers.filter(p => p.name !== product.name);
            product.stock -= quantity;
            updatedStickers.push(product);
            updateFunction = () => setStickers(updatedStickers);
        } else if (product.type === PRODUCT_TYPE.BRELOCZEK) {
            const updatedKeychains = keychains.filter(p => p.name !== product.name);
            product.stock -= quantity;
            updatedKeychains.push(product);
            updateFunction = () => setKeychains(updatedKeychains);
        }

        if (updateFunction) {
            updateFunction().then(() => {
                if (initialTransaction) {
                    handleEditChatMessage(newChatHistory);
                } else {
                    handleAddChatMessage(newChatHistory);
                }
                handleSetDefaultStates();
            });
        }
    }

    return { handleSetCategory, handleSetProduct, inputValue, inputState, onChangeInputText, onSubmitEditing, categorySuggestions, productSuggestions }
}