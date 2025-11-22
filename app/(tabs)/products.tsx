import { Product, PRODUCT_TYPE } from "@/@types";
import { Button, Input, Text } from "@/components";
import EditProductModal from "@/components/(tabs)/products/EditProductModal";
import { NAVIGATION_VIEWS, useNavigationContext } from "@/contexts/NavigationContext";
import { useProducts } from "@/contexts/ProductsContext";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ScrollView, View } from "react-native";

const BrowseProducts = () => {
    const { prints, stickers, setPrints, setStickers } = useProducts();
    const { currentNavigationView, setCurrentNavigationView } = useNavigationContext();

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
        setSearchQuery(query);
        setSelectedCategory(null);
        if (query.trim() === '') {
            setSearchResults([]);
            return;
        }
        const lowerCaseQuery = query.toLowerCase();
        const filteredResults = mergedProducts.filter(product =>
            product.name.toLowerCase().includes(lowerCaseQuery) ||
            product.keywords.some(keyword => keyword.toLowerCase().includes(lowerCaseQuery))
        );
        setSearchResults(filteredResults);
    }

    const handleDeleteProduct = (product: Product) => {
        // TODO add a confirmation modal
        if (product.type === PRODUCT_TYPE.NAKLEJKA) {
            const updatedStickers = stickers.filter(p => p.name !== product.name);
            setStickers(updatedStickers);
        } else if (product.type === PRODUCT_TYPE.PRINT) {
            const updatedPrints = prints.filter(p => p.name !== product.name);
            setPrints(updatedPrints);
        }
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
                    />

                    <Button title="Stickers" onPress={() => setSelectedCategory('stickers')} />
                    <Button title="Prints" onPress={() => setSelectedCategory('prints')} />

                    <ScrollView keyboardShouldPersistTaps="always">
                        {selectedCategory === 'stickers' && (
                            <>
                                {stickers.map((sticker, index) => (
                                    <ProductRow key={index} product={sticker} handleEditProduct={handleEditProduct} handleDeleteProduct={handleDeleteProduct} />
                                ))}
                            </>
                        )}

                        {selectedCategory === 'prints' && (
                            <>
                                {prints.map((print, index) => (
                                    <ProductRow key={index} product={print} handleEditProduct={handleEditProduct} handleDeleteProduct={handleDeleteProduct} />
                                ))}
                            </>
                        )}

                        {searchResults.length > 0 && (
                            <>
                                {searchResults.map((product, index) => (
                                    <ProductRow key={index} product={product} handleEditProduct={handleEditProduct} handleDeleteProduct={handleDeleteProduct} />
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

const ProductRow = ({ product, handleEditProduct, handleDeleteProduct }: { product: Product, handleEditProduct: (product: Product) => void, handleDeleteProduct: (product: Product) => void }) => {
    return (
        <View style={{ marginBottom: 10, display: 'flex', flexDirection: 'row' }}>
            <Text style={{ color: 'white', width: '80%' }}>{product.name} - {PRODUCT_TYPE[product.type]}</Text>
            <Ionicons
                name="pencil"
                size={20}
                color="white"
                style={{ width: '10%' }}
                onPress={() => handleEditProduct(product)}
            />
            <Ionicons
                name="trash"
                size={20}
                color="white"
                style={{ width: '10%' }}
                onPress={() => handleDeleteProduct(product)}
            />
        </View>
    )
}

export default BrowseProducts;