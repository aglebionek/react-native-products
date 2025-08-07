import { useEffect, useState } from 'react';
import { GestureHandlerRootView, ScrollView, TextInput } from 'react-native-gesture-handler';
import { ToastAndroid, View } from "react-native";

import { ChatMessage, Product } from '@/@types';
import ProductCategory from '@/@types/products/ProductCategory';
import { SuggestionButton, Text } from '@/components';
import { useHistory } from '@/contexts/HistoryContext';
import { useProducts } from '@/contexts/ProductsContext';

enum States {
  SELECTING_CATEGORY = 1,
  SELECTING_PRODUCT = 2,
  SELECTING_QUANTITY = 3,
}

const formatChatMessage = (message: ChatMessage) => {
  return `${message.productCategory} ${message.productName} ${message.productQuantity}`;
}

const Chat = () => {
  const { chatHistory, handleAddChatMessage } = useHistory();
  const [state, setState] = useState(States.SELECTING_CATEGORY);

  const [inputValue, setInputValue] = useState('');
  const [category, setCategory] = useState<ProductCategory | null>(null);
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
    setInputValue(`${category} ${product.name} `);
    setState(States.SELECTING_QUANTITY);
  }

  const onChangeInputText = (inputText: string) => {
    const isBackspace = inputText.length < inputValue.length;
    inputText = inputText.trimStart();
    inputText = inputText.replace(/\s+/g, ' ');
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
          // @ts-ignore
          valuesToFilter = productsCategories[category];
        }

        filteredProducts = valuesToFilter.filter(sticker => {
          // look for a sticker that has all keywords in its keywords array
          return keywords.every((kw) => sticker.keywords.some((stickerKw) => stickerKw.startsWith(kw)));
        });
        // sort them so that the ones which names start with the keyword are first
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
        if (i === 1 && isBackspace) {
          setState(States.SELECTING_PRODUCT);
          setProductSuggestions([]);
        }
        const lastPart = parts[i].trim();
        console.log(lastPart, lastPart.length);
        if (lastPart.length === 0) setQuantity(-1);
        if (!isNaN(Number(lastPart))) {
          const newQuantity = Number(lastPart);
          setQuantity(newQuantity);
          break;
        }
      }
    }
  }

  return (
    <GestureHandlerRootView>
      <ScrollView
        keyboardShouldPersistTaps="always"
      >
        <View style={{ height: 400, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>

          {chatHistory.map((chatHistoryElement, index) => (
            <View key={index} style={{ padding: 2, backgroundColor: '#444' }}>
              <Text style={{ color: 'white' }}>{formatChatMessage(chatHistoryElement)}</Text>
            </View>
          ))}

          <View style={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
            <Text>{category}</Text>
            {product && <Text>{product.name}</Text>}
            {state === States.SELECTING_QUANTITY && <Text>{quantity}</Text>}
          </View>

          <TextInput
            placeholder="Search....."
            style={{
              height: 40,
              borderColor: 'grey',
              borderWidth: 1,
              marginBottom: 10,
              paddingHorizontal: 10,
              color: 'white'
            }}
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

              const newChatHistory: ChatMessage = {
                productName: product.name,
                productQuantity: quantity,
                productCategory: category,
                timestamp: new Date()
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