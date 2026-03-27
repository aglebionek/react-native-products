import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ScrollView, TextInput, ToastAndroid, View } from "react-native";

import { Product, PRODUCT_TYPE } from "@/@types";
import { Input, Text } from "@/components";
import AddProduct from "@/components/(tabs)/products/AddProductModal";
import EditProductModal from "@/components/(tabs)/products/EditProductModal";
import { NAVIGATION_VIEWS, useNavigationContext } from "@/contexts/NavigationContext";
import { useProducts } from "@/contexts/ProductsContext";
import { useTheme } from "@/contexts/ThemeContext";
import useManageProducts from "@/stories/useManageProducts";

const BrowseProducts = () => {
    const { currentNavigationView, setCurrentNavigationView } = useNavigationContext();
    const productManager = useManageProducts();
    const { bookmarks, keychains, pins, prints, stickers } = useProducts();
    const { COLORS } = useTheme();

    const [selectedCategory, setSelectedCategory] = useState<'keychains' |'stickers' | 'prints' | 'pins' | 'bookmarks' | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Product[]>([]);

    const mergedProducts = useMemo(() => [...keychains, ...stickers, ...prints, ...pins, ...bookmarks], [keychains, stickers, prints, pins, bookmarks]);

    const inputRef = useRef<TextInput>(null);

    useFocusEffect(
        useCallback(() => {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }, [])
    );

    useFocusEffect(
        useCallback(() => {
            return () => {
                setSearchResults([]);
                setSearchQuery('');
                setSelectedCategory(null);
                setSelectedProduct(null);
            };
        }, [])
    );

    const handleModalOnClose = () => {
        setCurrentNavigationView(NAVIGATION_VIEWS.PRODUCTS_LIST);
        setSelectedProduct(null);
        setTimeout(() => {
            inputRef.current?.focus();
        }, 100);
    }

    const handleEditProduct = (product: Product) => {
        setSelectedProduct(product);
        setCurrentNavigationView(NAVIGATION_VIEWS.EDIT_PRODUCT);
    }

    const handleAddProduct = () => {
        setSelectedProduct(null);
        setCurrentNavigationView(NAVIGATION_VIEWS.ADD_PRODUCT);
    }

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setSelectedCategory(null);
        if (query.trim() === '') {
            setSearchResults([]);
            return;
        }
        const lowerCaseQuery = query.toLowerCase();
        const filteredResults = mergedProducts.filter(product =>
            product.name.toLowerCase().split(' ').includes(lowerCaseQuery) ||
            product.keywords.some(keyword => keyword.toLowerCase().startsWith(lowerCaseQuery))
        );
        setSearchResults(filteredResults);
    }

    const handleCloneProduct = () => {
        const productToClone = { ...selectedProduct } as Product | null;
        if (!productToClone) return;

        productToClone.name = `${productToClone.name} - COPY`;

        const productAdded = productManager.handleAddNewProduct(productToClone);
        if (!productAdded) return ToastAndroid.show(`Product with this name already exists: ${productToClone.name}`, ToastAndroid.SHORT);

        handleModalOnClose();

        ToastAndroid.show(`Created ${productToClone.name}`, ToastAndroid.SHORT);
    }

    useEffect(() => {
        if (searchQuery.trim() !== '') {
            handleSearch(searchQuery);
        }
    }, [mergedProducts]);

    return (
        <View style={{ padding: 10, paddingBottom: 100, flex: 1 }}>
            {(currentNavigationView === NAVIGATION_VIEWS.PRODUCTS_LIST || currentNavigationView === NAVIGATION_VIEWS.EDIT_PRODUCT) && (
                <View>
                    <View style={{ flexDirection: 'row', height: 40, gap: 5, marginBottom: 10 }}>
                        <View style={{ width: '90%' }}>
                            <Input
                                placeholder="Search products"
                                placeholderTextColor="gray"
                                onChangeText={text => handleSearch(text)}
                                value={searchQuery}
                                includeClearButton={true}
                                style={{ color: 'white' }}
                                innerRef={inputRef}
                            />
                        </View>
                        <View style={{ width: '10%', justifyContent: 'center', alignItems: 'center' }}>
                            <Ionicons
                                name="add-circle"
                                size={35}
                                color={COLORS.tabIconSelected}
                                onPress={handleAddProduct}
                            />
                        </View>
                    </View>

                    <ScrollView keyboardShouldPersistTaps="always" contentContainerStyle={{ paddingHorizontal: 10, flexGrow: 1 }}>
                        {selectedCategory === 'stickers' && (
                            <>
                                {stickers.map((sticker, index) => (
                                    <View key={`sticker-${index}`} style={{ marginBottom: 10, display: 'flex', flexDirection: 'row', backgroundColor: COLORS.tabIconDefault, padding: 10 }} onTouchEnd={() => handleEditProduct(sticker)}>
                                        <Text>{sticker.name} - {PRODUCT_TYPE[sticker.type]}</Text>
                                    </View>))}
                            </>
                        )}

                        {selectedCategory === 'prints' && (
                            <>
                                {prints.map((print, index) => (
                                    <View key={`print-${index}`} style={{ marginBottom: 10, display: 'flex', flexDirection: 'row', backgroundColor: COLORS.tabIconDefault, padding: 10 }} onTouchEnd={() => handleEditProduct(print)}>
                                        <Text>{print.name} - {PRODUCT_TYPE[print.type]}</Text>
                                    </View>))}
                            </>
                        )}

                        {selectedCategory === 'keychains' && (
                            <>
                                {keychains.map((keychain, index) => (
                                    <View key={`keychain-${index}`} style={{ marginBottom: 10, display: 'flex', flexDirection: 'row', backgroundColor: COLORS.tabIconDefault, padding: 10 }} onTouchEnd={() => handleEditProduct(keychain)}>
                                        <Text>{keychain.name} - {PRODUCT_TYPE[keychain.type]}</Text>
                                    </View>))}
                            </>
                        )}

                        {searchResults.length > 0 && (
                            <>
                                {searchResults.map((product, index) => (
                                    <View key={`product-${index}`} style={{ marginBottom: 10, display: 'flex', flexDirection: 'row', backgroundColor: COLORS.tabIconDefault, padding: 10 }} onTouchEnd={() => handleEditProduct(product)}>
                                        <Text>{product.name} - {PRODUCT_TYPE[product.type]}</Text>
                                    </View>
                                ))}
                            </>
                        )}
                    </ScrollView>
                </View>
            )
            }

            {
                currentNavigationView === NAVIGATION_VIEWS.EDIT_PRODUCT && selectedProduct && (
                    <EditProductModal product={selectedProduct} onClose={handleModalOnClose} handleCloneProduct={handleCloneProduct} />
                )
            }

            {
                currentNavigationView === NAVIGATION_VIEWS.ADD_PRODUCT && (
                    <AddProduct onClose={handleModalOnClose} />
                )
            }
        </View >
    )
}

export default BrowseProducts;