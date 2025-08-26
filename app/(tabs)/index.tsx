import { useState } from 'react';
import { GestureHandlerRootView, ScrollView, TextInput } from 'react-native-gesture-handler';
import { ToastAndroid, View } from "react-native";

import { ChatMessage, Product } from '@/@types';
import ProductCategory from '@/@types/products/ProductCategory';
import { SuggestionButton, Text } from '@/components';
import { useHistory } from '@/contexts/HistoryContext';
import { useProducts } from '@/contexts/ProductsContext';
import { date2String, getCurrentDateInPolishTimezone } from '@/utils/common';

enum States {
  SELECTING_CATEGORY = 1,
  SELECTING_PRODUCT = 2,
  SELECTING_QUANTITY = 3,
}

const formatChatMessage = (message: ChatMessage) => {
  return `${date2String(message.timestamp).time} - ${message.productCategory} ${message.productName} ${message.productQuantity}`;
}

const Chat = () => {
  const { chatHistory, handleAddChatMessage } = useHistory();
  const [state, setState] = useState(States.SELECTING_CATEGORY);

  const [category, setCategory] = useState<ProductCategory | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  const [categorySuggestions, setCategorySuggestions] = useState<ProductCategory[]>([]);
  const [productSuggestions, setProductSuggestions] = useState<Product[]>([]);

  const { stickers, prints } = useProducts();

  const productsCategories: Record<ProductCategory, Product[]> = {
    "N": stickers,
    "A4": prints,
    "A5": prints,
    "A6": prints,
  }

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

        filteredProducts = valuesToFilter.filter(sticker => {
          return keywords.every((kw) => sticker.keywords.some((stickerKw) => stickerKw.toLowerCase().startsWith(kw.toLowerCase())));
        });
        filteredProducts.sort((a, b) => {
          const aStartsWith = a.name.toLowerCase().startsWith(lastKeyword);
          const bStartsWith = b.name.toLowerCase().startsWith(lastKeyword);
          if (aStartsWith && !bStartsWith) return -1;
          if (!aStartsWith && bStartsWith) return 1;
          return a.name.localeCompare(b.name);
        });
        console.log(`Keyword selected: ${JSON.stringify(filteredProducts)}`);
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
      <ScrollView keyboardShouldPersistTaps="always">
        <View style={{ height: 400, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>

          {chatHistory.map((chatHistoryElement, index) => (
            <View key={index} style={{ padding: 2, backgroundColor: '#444' }}>
              <Text style={{ color: 'white' }}>{formatChatMessage(chatHistoryElement)}</Text>
            </View>
          ))}

          <TextInput
            placeholder="Search....."
            style={{
              height: 40,
              borderColor: 'grey',
              borderWidth: 1,
              marginVertical: 10,
              paddingHorizontal: 10,
              color: 'white'
            }}
            selection={state === States.SELECTING_QUANTITY ? { start: inputValue.length - 1, end: inputValue.length } : undefined}
            value={inputValue}
            onChangeText={onChangeInputText}
            keyboardType={state === States.SELECTING_QUANTITY ? 'number-pad' : 'default'}
            blurOnSubmit={false}
            onSubmitEditing={() => {
              if (state !== States.SELECTING_QUANTITY) return;
              if (!product) {
                console.warn('No product selected');
                return;
              }
              if (!category) {
                console.warn('No category selected');
                return;
              }

              const timestamp = getCurrentDateInPolishTimezone();

              const newChatHistory: ChatMessage = {
                productName: product.name,
                productQuantity: quantity,
                productCategory: category,
                timestamp
              };
              handleAddChatMessage(newChatHistory);
              handleSetDefaultStates();
            }}
          />

          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 30, height: 50 }}>
            {state === States.SELECTING_CATEGORY && categorySuggestions.slice(0, 3).map((suggestion, index) => (
              <SuggestionButton key={`cat-sug-${index}`} onPress={() => handleSetCategory(suggestion)} text={suggestion} />
            ))}
            {state === States.SELECTING_PRODUCT && productSuggestions.slice(0, 3).map((suggestion, index) => (
              <SuggestionButton key={`prod-sug-${index}`} onPress={() => handleSetProduct(suggestion)} text={suggestion.name} />
            ))}
          </View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  )
}

export default Chat;