import { useEffect, useState } from 'react';
import { Keyboard, View } from 'react-native';
import { GestureHandlerRootView, ScrollView, TextInput } from 'react-native-gesture-handler';

import { ChatMessage, Product } from '@/@types';
import { Text } from '@/components/common';
import { useHistory } from '@/contexts/HistoryContext';
import { useProducts } from '@/contexts/ProductsContext';
import ProductCategory from '@/@types/products/ProductCategory';

enum States {
  SELECTING_CATEGORY = 1,
  SELECTING_KEYWORDS = 2,
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
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);

  const { stickers, prints } = useProducts();

  const productsCategories: Record<ProductCategory, Product[]> = {
    "N": stickers,
    "A4": prints,
    "A5": prints,
    "A6": prints,
  }

  useEffect(() => {
    console.log(state);
  }, [state]);

  const onChangeText = (text: string) => {
    // split input by spaces
    const isBackspace = text.length < inputValue.length;
    text = text.trimStart()
    const parts = text.split(' ').filter(part => part.length > 0);
    setInputValue(text);

    switch (state) {
      case States.SELECTING_CATEGORY: {
        if (parts.length === 1 && parts[0].length === 0) {
          setCategory(null);
          setSuggestions([]);
          return;
        }

        if (parts.length === 1) {
          const cat = parts[0].toUpperCase() as ProductCategory;
          // @ts-ignore
          if (productsCategories[cat]) {
            setCategory(cat);
            setState(States.SELECTING_KEYWORDS);
          }
        }
        break;
      }
      case States.SELECTING_KEYWORDS: {
        const keywords = parts.slice(1, parts.length);
        if (keywords.length === 0 && isBackspace && text[text.length - 1] !== ' ') {
          setCategory(parts[0].toUpperCase() as ProductCategory);
          setSuggestions([]);
          setState(States.SELECTING_CATEGORY);
          return;
        }

        if (keywords.length === 0) return;
        let filteredStickers = [];
        let valuesToFilter = suggestions;
        const lastKeyword = keywords[keywords.length - 1]?.toLowerCase() || '';
        if (lastKeyword.length <= 1 || isBackspace) {
          // @ts-ignore
          valuesToFilter = productsCategories[category];
        }

        filteredStickers = valuesToFilter.filter(sticker => {
          // look for a sticker that has all keywords in its keywords array
          return keywords.every((kw) => sticker.keywords.some((stickerKw) => stickerKw.startsWith(kw)));
        });
        // sort them so that the ones which names start with the keyword are first
        filteredStickers.sort((a, b) => {
          const aStartsWith = a.name.toLowerCase().startsWith(lastKeyword);
          const bStartsWith = b.name.toLowerCase().startsWith(lastKeyword);
          if (aStartsWith && !bStartsWith) return -1;
          if (!aStartsWith && bStartsWith) return 1;
          return a.name.localeCompare(b.name);
        });
        console.log(`Keyword selected: ${JSON.stringify(filteredStickers)}`);
        setSuggestions(filteredStickers);
        break;
      }
      case States.SELECTING_QUANTITY: {
        const i = parts.length - 1;
        if (i === 1 && isBackspace) {
          setState(States.SELECTING_KEYWORDS);
          setSuggestions([]);
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
            onChangeText={onChangeText}
            keyboardType={state === States.SELECTING_QUANTITY ? 'number-pad' : 'default'}
            blurOnSubmit={false}
            // on keyboard enter
            onSubmitEditing={(e) => {
              if (state !== States.SELECTING_QUANTITY) return;
              if (!product) {
                console.warn('No product selected');
                return;
              }
              if (!category) {
                console.warn('No category selected');
                return;
              }

              const date = new Date();

              const newChatHistory: ChatMessage = {
                productName: product.name,
                productQuantity: quantity,
                productCategory: category,
                timestamp: date
              };
              handleAddChatMessage(newChatHistory);
              setInputValue('');
              setCategory(null);
              setProduct(null);
              setSuggestions([]);
              setState(States.SELECTING_CATEGORY);
              setQuantity(1);
            }}
          />

          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 30, height: 50 }}>
            {suggestions.slice(0, 3).map((suggestion, index) => (
              <View key={index} style={{ flex: 1, marginHorizontal: 5, backgroundColor: '#333', borderRadius: 5, padding: 10 }} onTouchStart={() => {
                // don't hide the keyboard on touch
                Keyboard.addListener('keyboardWillHide', (e) => { console.log(e) });
                console.log(`Selected suggestion: ${suggestion.name}`);
                setProduct(suggestion);
                setInputValue(`${category} ${suggestion.name.toLowerCase()} `);
                setSuggestions([]);
                setState(States.SELECTING_QUANTITY);
              }}>
                <Text key={index} style={{ fontSize: 18 }}>{suggestion.name}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  )
}

export default Chat;