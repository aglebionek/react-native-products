import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { Keyboard, TextInput, ToastAndroid, View } from "react-native";

import { ChatMessage, Product, PRODUCT_TYPE, ProductCategory } from '@/@types';
import { Input, SuggestionButton, Text } from '@/components';
import { useHistory } from '@/contexts/HistoryContext';
import { useProducts } from '@/contexts/ProductsContext';
import { useTheme } from '@/contexts/ThemeContext';
import { formatChatMessage, getCurrentDateInPolishTimezone } from '@/utils/common';

enum States {
  SELECTING_CATEGORY = 1,
  SELECTING_PRODUCT = 2,
  SELECTING_QUANTITY = 3,
}

const Chat = () => {
  const { chatHistory, handleAddChatMessage } = useHistory();
  const { stickers, prints, setStickers, setPrints } = useProducts();
  const { COLORS } = useTheme();
  const [state, setState] = useState(States.SELECTING_CATEGORY);

  const [category, setCategory] = useState<ProductCategory | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  const [categorySuggestions, setCategorySuggestions] = useState<ProductCategory[]>([]);
  const [productSuggestions, setProductSuggestions] = useState<Product[]>([]);
  const scrollRef = useRef<ScrollView>(null);
  const inputRef = useRef<TextInput>(null);

  useFocusEffect(
    useCallback(() => {
      inputRef.current?.focus();
    }, [])
  );

  const productsCategories: Record<ProductCategory, Product[]> = {
    "N": stickers,
    "A4": prints.filter(print => print.formats.includes('A4')),
    "A5": prints.filter(print => print.formats.includes('A5')),
    "A6": prints.filter(print => print.formats.includes('A6')),
  }

  Keyboard.addListener('keyboardDidShow', () => {
    scrollRef.current?.scrollToEnd({ animated: true });
  });

  const handleSetDefaultStates = () => {
    setInputValue('');
    setCategory(null);
    setCategorySuggestions([]);
    setProduct(null);
    setProductSuggestions([]);
    setState(States.SELECTING_CATEGORY);
    setQuantity(1);
  }

  const handleSetCategory = (text: ProductCategory) => {
    setCategory(text);
    setInputValue(`${text} `);
    setProductSuggestions([]);
    setState(States.SELECTING_PRODUCT);
  }

  const handleSetProduct = (product: Product) => {
    setProduct(product);
    setInputValue(`${category} ${product.name} ${quantity}`);
    setState(States.SELECTING_QUANTITY);
  }

  const handleUnsetSelectingQuantity = () => {
    setState(States.SELECTING_PRODUCT);
    setQuantity(1);
    setInputValue(inputValue.replace(/\s\d+$/, ''));
  }

  const onSubmitEditing = () => {
    if (state !== States.SELECTING_QUANTITY) return;
    if (!product) {
      ToastAndroid.show('No product selected', ToastAndroid.SHORT);
      return;
    }
    if (!category) {
      ToastAndroid.show('No category selected', ToastAndroid.SHORT);
      return;
    }

    const timestamp = getCurrentDateInPolishTimezone();

    const newChatHistory: ChatMessage = {
      productName: product.name,
      productQuantity: quantity,
      productCategory: category,
      timestamp
    };

    scrollRef.current?.scrollToEnd({ animated: true });

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
    }

    if (updateFunction) {
      updateFunction().then(() => {
        handleAddChatMessage(newChatHistory);
        handleSetDefaultStates();
      });
    }
  }

  const onChangeInputText = (inputText: string) => {
    const isBackspace = inputText.length < inputValue.length;
    inputText = inputText.trimStart();
    inputText = inputText.replace(/\s+/g, ' ');
    inputText = inputText.replace(/[^a-zA-Z0-9 ]/g, '')
    const parts = inputText.split(' ').filter(part => part.length > 0);
    setInputValue(inputText);

    switch (state) {
      case States.SELECTING_CATEGORY: {
        if (inputText.length === 0) return handleSetDefaultStates();
        inputText = inputText.toUpperCase();

        if (inputText in productsCategories) return handleSetCategory(inputText as ProductCategory);

        const filteredCategories = Object.keys(productsCategories).filter(cat => cat.startsWith(inputText));
        setCategorySuggestions(filteredCategories as ProductCategory[]);

        if (inputText.endsWith(' ')) {
          const cat = parts[0].toUpperCase() as ProductCategory;
          if (productsCategories[cat]) {
            setCategory(cat);
            setState(States.SELECTING_PRODUCT);
          } else {
            ToastAndroid.show(`No category found for "${cat}"`, ToastAndroid.SHORT);
          }
        }
        break;
      }
      case States.SELECTING_PRODUCT: {
        const keywords = parts.slice(1, parts.length);
        if (keywords.length === 0 && isBackspace && inputText[inputText.length - 1] !== ' ') {
          setCategory(parts[0].toUpperCase() as ProductCategory);
          setProductSuggestions([]);
          setState(States.SELECTING_CATEGORY);
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
      case States.SELECTING_QUANTITY: {
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

  return (
    <GestureHandlerRootView>

      <View style={{ height: '100%', flexDirection: 'column', justifyContent: 'flex-end', padding: 10 }}>

        <Input
          placeholder="New transaction"
          selection={state === States.SELECTING_QUANTITY ? { start: inputValue.length - 1, end: inputValue.length } : undefined}
          value={inputValue}
          onChangeText={onChangeInputText}
          keyboardType={state === States.SELECTING_QUANTITY ? 'number-pad' : 'default'}
          blurOnSubmit={false}
          onSubmitEditing={onSubmitEditing}
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
                color='white'
                style={{ marginLeft: 5, alignSelf: 'center' }}
                onPress={() => console.log('Edit message')}
              />
              <Ionicons
                name='trash'
                size={20}
                color='white'
                style={{ marginLeft: 20, alignSelf: 'center' }}
                onPress={() => console.log('Delete message')}
              />
            </View>
          ))}
        </ScrollView>


        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 20, height: 40, marginBottom: 10 }}>
          {state === States.SELECTING_CATEGORY && categorySuggestions.slice(0, 3).map((suggestion, index) => (
            <SuggestionButton key={`cat-sug-${index}`} onPress={() => handleSetCategory(suggestion)} text={suggestion} />
          ))}
          {state === States.SELECTING_PRODUCT && productSuggestions.slice(0, 3).map((suggestion, index) => (
            <SuggestionButton key={`prod-sug-${index}`} onPress={() => handleSetProduct(suggestion)} text={suggestion.name} />
          ))}
        </View>
      </View>
    </GestureHandlerRootView>
  )
}

export default Chat;