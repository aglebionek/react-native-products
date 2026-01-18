import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Keyboard, Modal, TextInput, ToastAndroid, View } from "react-native";
import { GestureHandlerRootView, TouchableOpacity } from "react-native-gesture-handler";

import { BaseProduct, Print, PrintFormat, Product, PRODUCT_TYPE, Sticker } from "@/@types";
import { Button, Checkbox, Input, Text } from "@/components";
import { useTheme } from "@/contexts/ThemeContext";
import useManageProducts from "@/stories/useManageProducts";

interface AddProductProps {
    onClose: () => void
}

const AddProduct = ({ onClose }: AddProductProps) => {
    const { COLORS } = useTheme();
    const productManager = useManageProducts();

    const [isAddingKeyword, setIsAddingKeyword] = useState(false);
    const [newKeyword, setNewKeyword] = useState('');
    const [newProduct, setNewProduct] = useState<BaseProduct | Product>({
        name: '',
        keywords: [],
        stock: 0,
    });
    const [selectedType, setSelectedType] = useState<PRODUCT_TYPE | null>(null);

    const inputRef = useRef<TextInput>(null);

    useFocusEffect(
        useCallback(() => {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }, [])
    );

    const handleEditProductName = (name: string) => {
        setNewProduct(prev => ({ ...prev, name }));
    }

    const handleEditProductStock = (stock: string) => {
        const stockNumber = parseInt(stock);
        if (isNaN(stockNumber)) {
            setNewProduct(prev => ({ ...prev, stock: 0 }));
            return;
        }
        setNewProduct(prev => ({ ...prev, stock: stockNumber }));
    }

    const handleEditPrintFormat = (format: PrintFormat) => {
        const product = productManager.mutations.handleChangePrintFormat(newProduct as Product, format);
        setNewProduct({ ...product });
    }

    const handleEditStickerHolo = () => {
        const product = newProduct as Product;
        if (product.type !== PRODUCT_TYPE.STICKER) return;
        product.holo = !product.holo;
        setNewProduct({ ...product });
    }

    const handleSelectProductType = (type: PRODUCT_TYPE) => {
        setSelectedType(type);
        if (type === PRODUCT_TYPE.PRINT) {
            setNewProduct((prev) => ({
                ...prev,
                type: PRODUCT_TYPE.PRINT,
                formats: [],
            }));
            return;
        }

        if (type === PRODUCT_TYPE.STICKER) {
            setNewProduct((prev) => ({
                ...prev,
                type: PRODUCT_TYPE.STICKER,
                holo: false,
            }));
            return;
        }

        if (type === PRODUCT_TYPE.KEYCHAIN) {
            setNewProduct((prev) => ({
                ...prev,
                type: PRODUCT_TYPE.KEYCHAIN,
            }));
            return;
        }

        if (type === PRODUCT_TYPE.PIN) {
            setNewProduct((prev) => ({
                ...prev,
                type: PRODUCT_TYPE.PIN,
            }));
            return;
        }

        if (type === PRODUCT_TYPE.BOOKMARK) {
            setNewProduct((prev) => ({
                ...prev,
                type: PRODUCT_TYPE.BOOKMARK,
            }));
            return;
        }
    }

    const handleSaveProduct = async () => {
        if (isAddingKeyword) return handleSaveNewKeyword();
        const productAdded = await productManager.handleAddNewProduct(newProduct as Product);
        if (!productAdded) return ToastAndroid.show('Product with this name already exists', ToastAndroid.SHORT);
        ToastAndroid.show(`Added ${newProduct.name}`, ToastAndroid.SHORT);
        onClose();
    }

    const handleSaveNewKeyword = () => {
        if (newKeyword.trim() === '') return setIsAddingKeyword(false);
        if (newProduct.keywords.includes(newKeyword.trim())) {
            setNewKeyword('');
            setIsAddingKeyword(false);
            return;
        }
        const updatedKeywords = [...newProduct.keywords, newKeyword.trim()];
        setNewProduct(prev => ({ ...prev, keywords: updatedKeywords }));
        setNewKeyword('');
        setIsAddingKeyword(false);
    }

    const isButtonDisabled = isAddingKeyword || newProduct.name.trim() === '' || selectedType === null || newProduct.keywords.length === 0;

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
                        <View style={{ width: '75%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
                                ADDING NEW PRODUCT
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
                            value={newProduct.name}
                            onChangeText={handleEditProductName}
                            innerRef={inputRef}
                        />

                        {newProduct.keywords && (
                            <>
                                <Text>Search keywords</Text>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', display: 'flex', alignItems: 'center', marginVertical: 10, gap: 5 }}>
                                    {newProduct.keywords.map((keyword, index) => (
                                        <KeywordTag
                                            key={`keyword-tag-${index}`}
                                            keyword={keyword}
                                            onChangeKeyword={(newKw) => {
                                                const newKeywords = newProduct.keywords.map(kw => kw === keyword ? newKw.toLowerCase().trim() : kw);
                                                setNewProduct(prev => ({ ...prev, keywords: newKeywords }));
                                            }}
                                            removeKeyword={() => {
                                                const newKeywords = newProduct.keywords.filter(kw => kw !== keyword);
                                                setNewProduct(prev => ({ ...prev, keywords: newKeywords }));
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
                            value={newProduct.stock === 0 ? '' : String(newProduct.stock)}
                            keyboardType="number-pad"
                            onChangeText={handleEditProductStock}
                        />

                        <Text>Product Type</Text>
                        <View style={{ flexDirection: 'row', marginBottom: 20, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                            <Button
                                title="Keychain"
                                onPress={() => handleSelectProductType(PRODUCT_TYPE.KEYCHAIN)}
                            />
                            <Button
                                title="Print"
                                onPress={() => handleSelectProductType(PRODUCT_TYPE.PRINT)}
                            />
                            <Button
                                title="Sticker"
                                onPress={() => handleSelectProductType(PRODUCT_TYPE.STICKER)}
                            />
                            <Button
                                title="Pin"
                                onPress={() => handleSelectProductType(PRODUCT_TYPE.PIN)}
                            />
                            <Button
                                title="Bookmark"
                                onPress={() => handleSelectProductType(PRODUCT_TYPE.BOOKMARK)}
                            />
                        </View>

                        {selectedType === PRODUCT_TYPE.PRINT && (
                            <>
                                <Text>Formats</Text>
                                <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                                    {['A4', 'A5', 'A6'].map((format) => (
                                        <View key={format} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
                                            <Checkbox
                                                checked={(newProduct as Print).formats.includes(format as 'A4' | 'A5' | 'A6')}
                                                onPress={() => handleEditPrintFormat(format as 'A4' | 'A5' | 'A6')}
                                            />
                                            <Text style={{ color: 'white', marginLeft: 5 }}>{format}</Text>
                                        </View>
                                    ))}
                                </View>
                            </>
                        )}

                        {selectedType === PRODUCT_TYPE.STICKER && (
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 20 }}>
                                <Text>Holographic</Text>
                                <Checkbox
                                    checked={(newProduct as Sticker).holo === true}
                                    onPress={handleEditStickerHolo}
                                />
                            </View>
                        )}

                        <Button onPress={async () => await handleSaveProduct()} title="Save" disabled={isButtonDisabled} />
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

export default AddProduct;