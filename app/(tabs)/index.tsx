import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { Keyboard, TextInput, View } from "react-native";

import { ChatMessage } from '@/@types';
import { ConfirmModal, Input, SuggestionButton, Text } from '@/components';
import { useHistory } from '@/contexts/HistoryContext';
import { useTheme } from '@/contexts/ThemeContext';
import { formatChatMessage } from '@/utils/common';
import { InputStates, useTransactionInput } from '@/stories/useTransactionInput';
import { EditTransactionModal } from '@/components/(tabs)/index/EditTransactionModal';

const Chat = () => {
  const { chatHistory, handleDeleteChatMessage } = useHistory();
  const { COLORS } = useTheme();

  const { handleSetCategory, handleSetProduct, inputValue, inputState, onChangeInputText, onSubmitEditing, productSuggestions, categorySuggestions } = useTransactionInput();

  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
  const [isEditingTransaction, setIsEditingTransaction] = useState(false);
  const [transactionSelectedForEditOrRemoval, setTransactionSelectedForEditOrRemoval] = useState<ChatMessage | null>(null);
  const scrollRef = useRef<ScrollView>(null);
  const inputRef = useRef<TextInput>(null);

  useFocusEffect(
    useCallback(() => {
      inputRef.current?.focus();

      return () => {
        setTransactionSelectedForEditOrRemoval(null);
        setIsConfirmDeleteModalOpen(false);
        setIsEditingTransaction(false);
      };
    }, [])
  );

  Keyboard.addListener('keyboardDidShow', () => {
    scrollRef.current?.scrollToEnd({ animated: true });
  });

  const handleSubmitEditing = () => {
    onSubmitEditing();
    scrollRef.current?.scrollToEnd({ animated: true });
  }

  return (
    <GestureHandlerRootView>

      <View style={{ height: '100%', flexDirection: 'column', justifyContent: 'flex-end', padding: 10 }}>

        <Input
          placeholder="New transaction"
          selection={inputState === InputStates.SELECTING_QUANTITY ? { start: inputValue.length - 1, end: inputValue.length } : undefined}
          value={inputValue}
          onChangeText={onChangeInputText}
          keyboardType={inputState === InputStates.SELECTING_QUANTITY ? 'number-pad' : 'default'}
          blurOnSubmit={false}
          onSubmitEditing={handleSubmitEditing}
          id='transaction-input'
          includeClearButton={true}
          innerRef={inputRef}
        />

        <View style={{ borderTopWidth: 1, borderColor: COLORS.borderColor, height: 0 }} />

        <ScrollView keyboardShouldPersistTaps="always" contentContainerStyle={{ flexGrow: 1 }} persistentScrollbar={true} ref={scrollRef}
          indicatorStyle='white'
        >
          {chatHistory.map((chatHistoryElement, index) => (
            <View key={index} style={{ marginVertical: 2, flexDirection: 'row', borderBottomColor: index === chatHistory.length - 1 ? COLORS.borderColor : '#454545', borderBottomWidth: 1, }}>
              <Text style={{ color: 'white', padding: 2, width: '80%' }}>
                {formatChatMessage(chatHistoryElement)}
              </Text>
              <Ionicons
                name='pencil'
                size={20}
                color={COLORS.tabIconSelected}
                style={{ marginLeft: 5, alignSelf: 'center' }}
                onPress={() => {
                  setIsEditingTransaction(true);
                  setTransactionSelectedForEditOrRemoval(chatHistoryElement);
                }}
              />
              <Ionicons
                name='trash'
                size={20}
                color={COLORS.tabIconSelected}
                style={{ marginLeft: 20, alignSelf: 'center' }}
                onPress={() => {
                  setIsConfirmDeleteModalOpen(true);
                  setTransactionSelectedForEditOrRemoval(chatHistoryElement);
                }}
              />
            </View>
          ))}
        </ScrollView>


        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 20, height: 40, marginBottom: 10 }}>
          {inputState === InputStates.SELECTING_CATEGORY && categorySuggestions.slice(0, 3).map((suggestion, index) => (
            <SuggestionButton key={`cat-sug-${index}`} onPress={() => handleSetCategory(suggestion)} text={suggestion} />
          ))}
          {inputState === InputStates.SELECTING_PRODUCT && productSuggestions.slice(0, 3).map((suggestion, index) => (
            <SuggestionButton key={`prod-sug-${index}`} onPress={() => handleSetProduct(suggestion)} text={suggestion.name} />
          ))}
          {isConfirmDeleteModalOpen && transactionSelectedForEditOrRemoval && (
            <ConfirmModal
              title='Confirm transaction deletion'
              text={`Are you sure you want to delete the transaction: "${formatChatMessage(transactionSelectedForEditOrRemoval)}"?`}
              onConfirm={() => {
                handleDeleteChatMessage(transactionSelectedForEditOrRemoval);
                setIsConfirmDeleteModalOpen(false);
                setTransactionSelectedForEditOrRemoval(null);
              }}
              onCancel={() => {
                setIsConfirmDeleteModalOpen(false);
                setTransactionSelectedForEditOrRemoval(null);
              }}
            />
          )}
          {isEditingTransaction && transactionSelectedForEditOrRemoval && (
            <EditTransactionModal
              title="Edit transaction"
              text={`Edit the transaction: "${formatChatMessage(transactionSelectedForEditOrRemoval)}"`}
              transaction={transactionSelectedForEditOrRemoval}
              onConfirm={() => {
                setIsEditingTransaction(false);
                setTransactionSelectedForEditOrRemoval(null);
              }}
              onCancel={() => {
                setIsEditingTransaction(false);
                setTransactionSelectedForEditOrRemoval(null);
              }}
            />
          )}
        </View>
      </View>
    </GestureHandlerRootView>
  )
}

export default Chat;