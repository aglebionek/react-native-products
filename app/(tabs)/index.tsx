import { StorageAccessFramework, writeAsStringAsync, EncodingType } from 'expo-file-system';
import { useEffect, useState } from 'react';
import { Button, Keyboard, View } from 'react-native';
import { GestureHandlerRootView, ScrollView, TextInput } from 'react-native-gesture-handler';

import { ChatMessage, Product, Transaction } from '@/@types';
import { Text } from '@/components/common';
import { useHistory } from '@/contexts/HistoryContext';
import { useProducts } from '@/contexts/ProductsContext';
import { usePermissions } from '@/contexts/PermissionsContext';

enum States {
  SELECTING_CATEGORY = 1,
  SELECTING_KEYWORDS = 2,
  SELECTING_QUANTITY = 3,
}

const Chat = () => {
  const { chatHistory, handleAddChatMessage, handleAddTransaction, transactionHistory } = useHistory();
  const { handleDownloadFile } = usePermissions();
  const [state, setState] = useState(States.SELECTING_CATEGORY);

  const [inputValue, setInputValue] = useState('');
  const [category, setCategory] = useState('');
  const [product, setProduct] = useState<Product | null>(null);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);

  const { stickers, prints } = useProducts();

  const productsCategories = {
    "n": stickers,
    'a4': prints,
    "a5": prints,
    "a6": prints,
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
          setCategory('');
          setSuggestions([]);
          return;
        }

        if (parts.length === 1) {
          const cat = parts[0].toLowerCase();
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
          setCategory(parts[0].toLowerCase());
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
          <Button
            title="Download Excel"
            onPress={async () => {
              // const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
              // if (!permissions.granted) {
              //   return;
              // }
              // Implement download functionality here
              const formatDate = (date: Date) => {
                const d = new Date(date);
                return `${d.getDate().toString().padStart(2, '0')}.${(d.getMonth() + 1).toString().padStart(2, '0')}.${d.getFullYear()}`;
              };
              const csvContent = transactionHistory.map(t => `${formatDate(t.date)},${t.productName},${t.quantity}`).join('\n');
              const dateIsoString = new Date().toISOString();
              const fileName = `transactions_${dateIsoString.split('T')[0]}.csv`;
              handleDownloadFile(fileName, csvContent, 'text/csv');
              // save the file locally as .csv
              // StorageAccessFramework.createFileAsync(permissions.directoryUri, fileName, 'text/csv').then((fileUri) => {
              //   writeAsStringAsync(fileUri, csvContent, { encoding: EncodingType.UTF8 }).then(() => {
              //     console.log(`File saved to ${fileUri}`);
              //   });
              // }).catch((error) => {
              //   console.error(`[ERROR] Failed to create file: ${error}`);
              // });
            }}
          />

          {chatHistory.map((chatHistoryElement, index) => (
            <View key={index} style={{ padding: 2, backgroundColor: '#444' }}>
              <Text style={{ color: 'white' }}>{chatHistoryElement.message}</Text>
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
              const id = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('');
              const date = new Date();

              let message = e.nativeEvent.text;
              if (quantity === -1) message = message + ' 1';
              const newChatHistory: ChatMessage = { message: message, timestamp: date, transactionId: id };
              const transaction: Transaction = {
                id,
                productId: product?.id || '',
                productName: product?.name || '',
                quantity: quantity,
                date,
              };
              handleAddChatMessage(newChatHistory);
              handleAddTransaction(transaction);
              setInputValue('');
              setCategory('');
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
                // switch keyboard to number pad
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