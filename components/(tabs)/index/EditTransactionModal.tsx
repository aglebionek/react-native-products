import { Modal, View } from "react-native"
import { GestureHandlerRootView, TextInput } from "react-native-gesture-handler";

import { useTheme } from "@/contexts/ThemeContext";
import { Button, Input, Text } from "@/components/common";
import { Transaction } from "@/@types";
import { useCallback, useRef, useState } from "react";
import { InputStates, useTransactionInput } from "@/stories/useTransactionInput";
import { SuggestionButton } from "./SuggestionButton";
import { useFocusEffect } from "expo-router";

interface ConfirmModalProps {
    title: string;
    text: string;
    transaction: Transaction;
    onConfirm: () => void;
    onCancel: () => void;
}

export const EditTransactionModal = ({ title, text, transaction, onConfirm, onCancel }: ConfirmModalProps) => {
    const { COLORS } = useTheme();
    const { handleSetCategory, handleSetProduct, inputValue, inputState, onChangeInputText, onSubmitEditing, productSuggestions, categorySuggestions } = useTransactionInput(transaction);

    const [select, setSelect] = useState(true);
    const inputRef = useRef<TextInput>(null);

    useFocusEffect(
        useCallback(() => {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }, [])
    );

    const handleConfirm = () => {
        onSubmitEditing();
        setSelect(true);
        onConfirm();
    }

    return <Modal transparent={true} >
        <GestureHandlerRootView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }} onTouchEnd={onCancel}>
            <View style={{ height: 300, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.backgroundMiddle, padding: 20 }} onTouchEnd={e => e.stopPropagation()}>
                <Text style={{ color: COLORS.text, fontWeight: 'bold', textAlign: 'center' }}>{title}</Text>

                <Text style={{ color: COLORS.text }}>{text}</Text>

                <Input
                    placeholder="New transaction"
                    selection={(inputState === InputStates.SELECTING_QUANTITY && select) ? { start: inputValue.length - 1, end: inputValue.length } : undefined}
                    value={inputValue}
                    onChangeText={onChangeInputText}
                    keyboardType={inputState === InputStates.SELECTING_QUANTITY ? 'number-pad' : 'default'}
                    submitBehavior="submit"
                    onSubmitEditing={handleConfirm}
                    id='transaction-input'
                    includeClearButton={true}
                    innerRef={inputRef}
                    onKeyPress={() => {
                        if (inputState === InputStates.SELECTING_QUANTITY) setSelect(false);
                    }}
                />

                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 20, height: 40, marginBottom: 10 }}>
                    {inputState === InputStates.SELECTING_CATEGORY && categorySuggestions.slice(0, 3).map((suggestion, index) => (
                        <SuggestionButton key={`cat-sug-edit-${index}`} onPress={() => handleSetCategory(suggestion)} text={suggestion} />
                    ))}
                    {inputState === InputStates.SELECTING_PRODUCT && productSuggestions.slice(0, 3).map((suggestion, index) => (
                        <SuggestionButton key={`prod-sug-edit-${index}`} onPress={() => handleSetProduct(suggestion)} text={suggestion.name} />
                    ))}
                </View>

                <View style={{ flexDirection: 'row', marginTop: 20, width: '100%', gap: 10 }}>
                    <Button onPress={onCancel} title="Cancel" />
                    <Button onPress={handleConfirm} title="Confirm" />
                </View>
            </View>
        </GestureHandlerRootView>
    </Modal>
}