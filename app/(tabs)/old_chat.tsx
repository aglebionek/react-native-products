import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { View } from "react-native";

import { ChatMessage } from '@/@types';
import { Text } from '@/components';
import { useHistory } from '@/contexts/HistoryContext';
import { date2String } from '@/utils/common';

const formatChatMessage = (message: ChatMessage) => {
  return `${date2String(message.timestamp).time} - ${message.productCategory} ${message.productName} ${message.productQuantity}`;
}

const Chat = () => {
  const { chatHistory } = useHistory();

  return (
    <GestureHandlerRootView>
      <ScrollView
        style={{ flexDirection: 'column', display: 'flex' }}
        contentContainerStyle={{ overflow: 'scroll', flexGrow: 1, justifyContent: 'flex-start', padding: 20 }}
      >
        {chatHistory.map((chatHistoryElement, index) => (
          <View key={index}>
            <Text style={{ color: 'white' }}>{formatChatMessage(chatHistoryElement)}</Text>
          </View>
        ))}
      </ScrollView>
    </GestureHandlerRootView>
  )
}

export default Chat;