import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ScrollView, View } from "react-native";

import { Product, PRODUCT_TYPE } from "@/@types";
import { Input, Text } from "@/components";
import EditProductModal from "@/components/(tabs)/products/EditProductModal";
import { NAVIGATION_VIEWS, useNavigationContext } from "@/contexts/NavigationContext";
import { useProducts } from "@/contexts/ProductsContext";
import { useTheme } from "@/contexts/ThemeContext";

const BrowseProducts = () => {
    const { currentNavigationView, setCurrentNavigationView } = useNavigationContext();
    const { prints, stickers, setPrints, setStickers } = useProducts();
    const { COLORS } = useTheme();

    const [selectedCategory, setSelectedCategory] = useState<'stickers' | 'prints' | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Product[]>([]);

    const mergedProducts = useMemo(() => [...stickers, ...prints], [stickers, prints]);

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
    }

    const handleEditProduct = (product: Product) => {
        setSelectedProduct(product);
        setCurrentNavigationView(NAVIGATION_VIEWS.EDIT_PRODUCT);
    }

    const handleSearch = (query: string) => {
        query = query.toLowerCase();
        setSearchQuery(query);
        setSelectedCategory(null);

        if (query.trim() === '') {
            setSearchResults([]);
            return;
        }

        const filteredResults = mergedProducts.filter(product =>
            product.name.toLowerCase().includes(query) ||
            product.keywords.some(keyword => keyword.toLowerCase().includes(query))
        );
        setSearchResults(filteredResults);
    }

    useEffect(() => {
        if (searchQuery.trim() !== '') {
            handleSearch(searchQuery);
        }
    }, [mergedProducts]);

    return (
        <View style={{ padding: 10 }}>
            {(currentNavigationView === NAVIGATION_VIEWS.PRODUCTS_LIST || currentNavigationView === NAVIGATION_VIEWS.EDIT_PRODUCT) && (
                <View>
                    <Input
                        placeholder="Search products"
                        placeholderTextColor="gray"
                        onChangeText={text => handleSearch(text)}
                        value={searchQuery}
                        autoFocus
                        includeClearButton={true}
                    />

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
            )}

            {currentNavigationView === NAVIGATION_VIEWS.EDIT_PRODUCT && selectedProduct && (
                <EditProductModal product={selectedProduct} onClose={handleModalOnClose} />
            )}
        </View>
    )
}

export default BrowseProducts;