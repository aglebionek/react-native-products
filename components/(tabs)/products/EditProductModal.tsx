import { LinearGradient } from "expo-linear-gradient";
import { Modal, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Product, PRODUCT_TYPE } from "@/@types";
import { Checkbox, Input, Text } from "@/components";
import { useProducts } from "@/contexts/ProductsContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/common/Button";
import { useState } from "react";

interface EditProductProps {
    product: Product,
    onClose: () => void
}

const EditProduct = ({ product, onClose }: EditProductProps) => {
    const { COLORS } = useTheme();
    const [productClone, setProductClone] = useState<Product>(product);
    // const productClone = { ...product } as Product;

    const { prints, stickers, setPrints, setStickers } = useProducts();

    const handleEditProductName = (name: string) => {
        setProductClone(prev => ({ ...prev, name }));
    }

    const handleEditProductKeywords = (keywords: string) => {
        keywords = keywords.toLowerCase();
        const keywordsArray = keywords.split(',').map(keyword => keyword.trim())
        setProductClone(prev => ({ ...prev, keywords: keywordsArray }));
    }

    const handleEditProductStock = (stock: string) => {
        const stockNumber = parseInt(stock);
        if (isNaN(stockNumber)) {
            setProductClone(prev => ({ ...prev, stock: 0 }));
            // TODO select all text in input
            return;
        }
        setProductClone(prev => ({ ...prev, stock: stockNumber }));
    }

    const handleEditPrintFormat = (format: 'A4' | 'A5' | 'A6') => {
        if (productClone.type !== PRODUCT_TYPE.PRINT) return;

        if (productClone.formats.includes(format)) {
            productClone.formats = productClone.formats.filter(f => f !== format);
        } else {
            productClone.formats.push(format);
        }
        setProductClone({ ...productClone });
    }

    const handleEditStickerHolo = () => {
        if (productClone.type !== PRODUCT_TYPE.NAKLEJKA) return;

        productClone.holo = !productClone.holo;
        setProductClone({ ...productClone });
    }

    const handleSaveProduct = async () => {
        if (productClone.type === PRODUCT_TYPE.PRINT) {
            const filteredPrints = prints.filter(p => p.name !== product.name);
            filteredPrints.push(productClone);
            await setPrints(filteredPrints);
        } else if (product.type === PRODUCT_TYPE.NAKLEJKA) {
            const updatedStickers = stickers.filter(p => p.name !== product.name);
            updatedStickers.push(productClone);
            await setStickers(updatedStickers);
        }
        onClose();
    }


    return (
        <Modal animationType="slide" transparent={false} visible={true} >
            <LinearGradient colors={[COLORS.backgroundStart, COLORS.backgroundMiddle, COLORS.backgroundEnd]} style={{ flex: 1 }}>
                <View style={{
                    justifyContent: 'center', alignItems: 'flex-end', display: 'flex', flexDirection: 'row',
                    borderBottomColor: COLORS.borderColor, borderBottomWidth: 1,
                    width: '100%',
                    marginBottom: 20,
                }}>
                    <View style={{ width: '85%', display: 'flex', justifyContent: 'center', alignItems: 'center', paddingLeft: '15%' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', marginBottom: 10 }}>
                            EDIT {PRODUCT_TYPE[product.type]}
                        </Text>
                    </View>
                    <View style={{ width: '15%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Ionicons
                            name="close"
                            size={35}
                            color={COLORS.tabIconSelected}
                            style={{ marginBottom: 10 }}
                            onPress={onClose}
                        />
                    </View>
                </View >

                <View style={{ padding: 20 }}>
                    <Text>Name</Text>
                    <Input
                        value={productClone.name}
                        onChangeText={handleEditProductName}
                    />

                    {productClone.keywords && (
                        <>
                            <Text>Search keywords (comma separated)</Text>
                            <Input
                                value={productClone.keywords.join(', ')}
                                onChangeText={handleEditProductKeywords}
                            />
                        </>
                    )}

                    <Text>Stock</Text>
                    <Input
                        value={String(productClone.stock)}
                        keyboardType="number-pad"
                        onChangeText={handleEditProductStock}
                    />

                    {productClone.type === PRODUCT_TYPE.PRINT && (
                        <>
                            <Text>Formats</Text>
                            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                                {['A4', 'A5', 'A6'].map((format) => (
                                    <View key={format} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
                                        <Checkbox
                                            checked={productClone.formats.includes(format as 'A4' | 'A5' | 'A6')}
                                            onPress={() => handleEditPrintFormat(format as 'A4' | 'A5' | 'A6')}
                                        />
                                        <Text style={{ color: 'white', marginLeft: 5 }}>{format}</Text>
                                    </View>
                                ))}
                            </View>
                        </>
                    )}

                    {productClone.type === PRODUCT_TYPE.NAKLEJKA && (
                        <>
                            <Text>Holographic</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                                <Checkbox
                                    checked={productClone.holo === true}
                                    onPress={handleEditStickerHolo}
                                />
                            </View>
                        </>
                    )}

                    <Button onPress={async () => await handleSaveProduct()} title="Save" />
                </View>
            </LinearGradient>
        </Modal>
    )
}

export default EditProduct;