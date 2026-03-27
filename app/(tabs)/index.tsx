import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { FlatList, Keyboard, KeyboardAvoidingView, TextInput, View } from "react-native";

import { Transaction } from '@/@types';
import { ConfirmModal, Input, SuggestionButton, Text } from '@/components';
import { useTransactions } from '@/contexts/TransactionsContext';
import { useTheme } from '@/contexts/ThemeContext';
import { formatTransaction } from '@/utils/common';
import { InputStates, useTransactionInput } from '@/stories/useTransactionInput';
import { EditTransactionModal } from '@/components/(tabs)/index/EditTransactionModal';

const Transactions = () => {
  const { handleDeleteTransaction, hasMoreTransactions, isLoadingMoreTransactions, showLoadingMoreIndicator, loadAnotherTransactionsBatch, transactions, unloadOlderTransactions } = useTransactions();
  const { COLORS } = useTheme();

  const { handleSetCategory, handleSetProduct, inputValue, inputState, onChangeInputText, onSubmitEditing, productSuggestions, categorySuggestions } = useTransactionInput();

  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
  const [isEditingTransaction, setIsEditingTransaction] = useState(false);
  const [transactionSelectedForEditOrRemoval, setTransactionSelectedForEditOrRemoval] = useState<Transaction | null>(null);
  const isLoadingMore = useRef(false);
  const [select, setSelect] = useState(true);
  const scrollRef = useRef<FlatList>(null);
  const inputRef = useRef<TextInput>(null);

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => inputRef.current?.focus(), 100);

      return () => {
        setTransactionSelectedForEditOrRemoval(null);
        setIsConfirmDeleteModalOpen(false);
        setIsEditingTransaction(false);
      };
    }, [])
  );

  useEffect(() => {
    if (inputState !== InputStates.SELECTING_QUANTITY) {
      setSelect(true);
    }
  }, [inputState]);

  Keyboard.addListener('keyboardDidShow', () => {
    scrollRef.current?.scrollToEnd({ animated: true });
  });

  const handleSubmitEditing = () => {
    onSubmitEditing();
    setSelect(true);
    scrollRef.current?.scrollToEnd({ animated: true });
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

      {/* This offsets the padding from SplashScreen */}
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={80}>

        <View style={{ flex: 1, flexDirection: 'column', padding: 10 }}>
          <Input
            placeholder="New transaction"
            selection={(inputState === InputStates.SELECTING_QUANTITY && select) ? { start: inputValue.length - 1, end: inputValue.length } : undefined}
            value={inputValue}
            onChangeText={onChangeInputText}
            keyboardType={inputState === InputStates.SELECTING_QUANTITY ? 'number-pad' : 'default'}
            submitBehavior='submit'
            onSubmitEditing={handleSubmitEditing}
            id='transaction-input'
            includeClearButton={true}
            innerRef={inputRef}
            onKeyPress={() => {
              if (inputState === InputStates.SELECTING_QUANTITY) setSelect(false);
            }}
          />

          {/* {showLoadingMoreIndicator && (
            <View style={{ padding: 10 }}>
              <Text style={{ color: COLORS.tabIconSelected, textAlign: 'center' }}>Loading more transactions...</Text>
            </View>
          )} */}

          <FlatList<Transaction>
            style={{ flex: 1 }}
            keyboardShouldPersistTaps="always"
            contentContainerStyle={{ flexGrow: 1, flexDirection: 'column-reverse' }}
            persistentScrollbar={true}
            ref={scrollRef}
            indicatorStyle='white'
            data={transactions}
            inverted={true}
            scrollEnabled={!isLoadingMoreTransactions || isLoadingMore.current === true}
            keyExtractor={(item) => item.timestamp.toISOString()}
            renderItem={({ item: transaction, index }) => (
              <View key={transaction.timestamp.toISOString()} style={
                {
                  marginVertical: 2, flexDirection: 'row', borderBottomColor: index === transactions.length - 1 ? COLORS.borderColor : '#454545', borderBottomWidth: 1,
                  borderTopColor: index === 0 ? COLORS.borderColor : 'transparent', borderTopWidth: 1,
                }}>
                <Text style={{ color: 'white', padding: 2, width: '80%' }}>
                  {formatTransaction(transaction)}
                </Text>
                <Ionicons
                  name='pencil'
                  size={20}
                  color={COLORS.tabIconSelected}
                  style={{ marginLeft: 5, alignSelf: 'center' }}
                  onPress={() => {
                    setIsEditingTransaction(true);
                    setTransactionSelectedForEditOrRemoval(transaction);
                  }}
                />
                <Ionicons
                  name='trash'
                  size={20}
                  color={COLORS.tabIconSelected}
                  style={{ marginLeft: 20, alignSelf: 'center' }}
                  onPress={() => {
                    setIsConfirmDeleteModalOpen(true);
                    setTransactionSelectedForEditOrRemoval(transaction);
                  }}
                />
              </View>
            )}
            onMomentumScrollEnd={({ nativeEvent }) => {
              if (isLoadingMore.current) return;
              const nearBottom = nativeEvent.contentOffset.y < 50;
              if (nearBottom && transactions.length > 20) {
                unloadOlderTransactions();
                return;
              }

              if (!hasMoreTransactions || isLoadingMoreTransactions) return;
              if (transactions.length === 0) return;

              const nearTop = nativeEvent.contentSize.height - nativeEvent.contentOffset.y - nativeEvent.layoutMeasurement.height < 50;
              if (!nearTop) return;
              isLoadingMore.current = true;
              loadAnotherTransactionsBatch(transactions[0].timestamp);
              isLoadingMore.current = false;
            }}
          />

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
                text={`Are you sure you want to delete the transaction: "${formatTransaction(transactionSelectedForEditOrRemoval)}"?`}
                onConfirm={() => {
                  handleDeleteTransaction(transactionSelectedForEditOrRemoval);
                  setIsConfirmDeleteModalOpen(false);
                  setTransactionSelectedForEditOrRemoval(null);
                  inputRef.current?.focus();
                }}
                onCancel={() => {
                  setIsConfirmDeleteModalOpen(false);
                  setTransactionSelectedForEditOrRemoval(null);
                  inputRef.current?.focus();
                }}
              />
            )}
            {isEditingTransaction && transactionSelectedForEditOrRemoval && (
              <EditTransactionModal
                title="Edit transaction"
                text={`Edit the transaction: "${formatTransaction(transactionSelectedForEditOrRemoval)}"`}
                transaction={transactionSelectedForEditOrRemoval}
                onConfirm={() => {
                  setIsEditingTransaction(false);
                  setTransactionSelectedForEditOrRemoval(null);
                  inputRef.current?.focus();
                }}
                onCancel={() => {
                  setIsEditingTransaction(false);
                  setTransactionSelectedForEditOrRemoval(null);
                  inputRef.current?.focus();
                }}
              />
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  )
}

export default Transactions;