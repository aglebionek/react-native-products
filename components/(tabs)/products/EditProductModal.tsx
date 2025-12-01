import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Keyboard, Modal, View } from "react-native";
import { GestureHandlerRootView, TouchableOpacity } from "react-native-gesture-handler";

import { Product, PRODUCT_TYPE } from "@/@types";
import { Checkbox, Input, Text } from "@/components";
import { useProducts } from "@/contexts/ProductsContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/common/Button";
import { useEffect, useState } from "react";

interface EditProductProps {
    handleCloneProduct: () => void,
    product: Product,
    onClose: () => void
}

const EditProduct = ({ handleCloneProduct, product, onClose }: EditProductProps) => {
    const { COLORS } = useTheme();
    const { prints, stickers, setPrints, setStickers } = useProducts();

    const [isAddingKeyword, setIsAddingKeyword] = useState(false);
    const [newKeyword, setNewKeyword] = useState('');
    const [productClone, setProductClone] = useState<Product>(product);

    const handleEditProductName = (name: string) => {
        setProductClone(prev => ({ ...prev, name }));
    }

    const handleEditProductStock = (stock: string) => {
        const stockNumber = parseInt(stock);
        if (isNaN(stockNumber)) {
            setProductClone(prev => ({ ...prev, stock: 0 }));
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
        if (isAddingKeyword) return handleSaveNewKeyword();

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

    const handleDeleteProduct = () => {
        // TODO add a confirmation modal
        if (product.type === PRODUCT_TYPE.NAKLEJKA) {
            const updatedStickers = stickers.filter(p => p.name !== product.name);
            setStickers(updatedStickers);
        } else if (product.type === PRODUCT_TYPE.PRINT) {
            const updatedPrints = prints.filter(p => p.name !== product.name);
            setPrints(updatedPrints);
        }
        onClose();
    }

    const handleSaveNewKeyword = () => {
        if (newKeyword.trim() === '') return setIsAddingKeyword(false);
        if (productClone.keywords.includes(newKeyword.trim())) {
            setNewKeyword('');
            setIsAddingKeyword(false);
            return;
        }
        const updatedKeywords = [...productClone.keywords, newKeyword.trim()];
        setProductClone(prev => ({ ...prev, keywords: updatedKeywords }));
        setNewKeyword('');
        setIsAddingKeyword(false);
    }

    return (
        <Modal animationType="slide" transparent={false} visible={true} >
            <LinearGradient colors={[COLORS.backgroundStart, COLORS.backgroundMiddle, COLORS.backgroundEnd]} style={{ flex: 1 }}>
                <GestureHandlerRootView>

                    <View style={{
                        justifyContent: 'center', alignItems: 'flex-end', display: 'flex', flexDirection: 'row',
                        borderBottomColor: COLORS.borderColor, borderBottomWidth: 1,
                        width: '100%',
                        marginBottom: 20,
                        paddingBottom: 10,
                    }}>
                        <View style={{ width: '25%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 10 }}>
                            <Ionicons
                                name="trash"
                                size={30}
                                color={COLORS.tabIconSelected}
                                onPress={handleDeleteProduct}
                            />
                            <Ionicons
                                name="copy"
                                size={30}
                                color={COLORS.tabIconSelected}
                                onPress={handleCloneProduct}
                            />
                        </View>
                        <View style={{ width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
                                EDIT {PRODUCT_TYPE[product.type]}
                            </Text>
                        </View>
                        <View style={{ width: '25%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Ionicons
                                name="close"
                                size={35}
                                color={COLORS.tabIconSelected}
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
                                <Text>Search keywords</Text>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', display: 'flex', alignItems: 'center', marginVertical: 10, gap: 5 }}>
                                    {productClone.keywords.map((keyword, index) => (
                                        <KeywordTag
                                            key={`keyword-tag-${index}`}
                                            keyword={keyword}
                                            onChangeKeyword={(newKw) => {
                                                const newKeywords = productClone.keywords.map(kw => kw === keyword ? newKw.toLowerCase().trim() : kw);
                                                setProductClone(prev => ({ ...prev, keywords: newKeywords }));
                                            }}
                                            removeKeyword={() => {
                                                const newKeywords = productClone.keywords.filter(kw => kw !== keyword);
                                                setProductClone(prev => ({ ...prev, keywords: newKeywords }));
                                            }}
                                        />
                                    ))}
                                    {isAddingKeyword ? (
                                        <EditableKeywordTag
                                            keyword={newKeyword}
                                            onChangeKeyword={(newKw) => setNewKeyword(newKw.toLowerCase().trim())}
                                            onSubmitEditing={handleSaveNewKeyword}
                                        />
                                    ) : (
                                        <Ionicons
                                            name="add-circle"
                                            size={30}
                                            color={COLORS.tabIconSelected}
                                            onPress={() => {
                                                setIsAddingKeyword(true);
                                            }}
                                        />
                                    )}
                                </View>
                            </>
                        )}

                        <Text>Stock</Text>
                        <Input
                            value={productClone.stock === 0 ? '' : String(productClone.stock)}
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
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 20 }}>
                                <Text>Holographic</Text>
                                <Checkbox
                                    checked={productClone.holo === true}
                                    onPress={handleEditStickerHolo}
                                />
                            </View>
                        )}

                        <Button onPress={async () => await handleSaveProduct()} title="Save" disabled={isAddingKeyword} />
                    </View>
                </GestureHandlerRootView>
            </LinearGradient>
        </Modal>
    )
}

const KeywordTag = ({ keyword, onChangeKeyword, removeKeyword }: { keyword: string, onChangeKeyword: (newKeyword: string) => void, removeKeyword: () => void }) => {
    const { COLORS } = useTheme();

    const [isLongPressed, setIsLongPressed] = useState(false);

    useEffect(() => {
        Keyboard.addListener('keyboardDidHide', () => {
            setIsLongPressed(false);
        });
    }, []);

    return (
        <TouchableOpacity
            onLongPress={() => setIsLongPressed(true)}
        >
            <View style={{
                backgroundColor: COLORS.tabIconDefault,
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 15,
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 5,
                marginBottom: 5,
            }}
            >
                {isLongPressed ? (
                    <>
                        <Input
                            value={keyword}
                            onChangeText={onChangeKeyword}
                            style={{ color: 'white', marginRight: 5, minWidth: 50, height: 20, padding: 0 }}
                            autoFocus
                            onSubmitEditing={() => {
                                setIsLongPressed(false);
                            }}
                        />
                        <Ionicons
                            name="close-circle"
                            size={24}
                            color={COLORS.text}
                            onPress={() => {
                                setIsLongPressed(false);
                            }}
                        /></>
                ) : (
                    <>
                        <Text style={{ color: 'white', marginRight: 5 }}>{keyword}</Text>
                        <Ionicons
                            name="close-circle"
                            size={24}
                            color={COLORS.text}
                            onPress={isLongPressed ? undefined : removeKeyword}
                        />
                    </>
                )}
            </View>
        </TouchableOpacity>
    )
}

const EditableKeywordTag = ({ keyword, onChangeKeyword, onSubmitEditing }: { keyword: string, onChangeKeyword: (newKeyword: string) => void, onSubmitEditing: () => void }) => {
    const { COLORS } = useTheme();
    return (
        <View style={{
            backgroundColor: COLORS.tabIconDefault,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 15,
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: 5,
            marginBottom: 5,
        }}>
            <Input
                value={keyword}
                onChangeText={onChangeKeyword}
                style={{ color: 'white', marginRight: 5, minWidth: 50, height: 20, padding: 0 }}
                autoFocus
                onSubmitEditing={onSubmitEditing}
            />
            <Ionicons
                name="close-circle"
                size={24}
                color={COLORS.text}
                onPress={onSubmitEditing}
            />
        </View>
    )
}

export default EditProduct;