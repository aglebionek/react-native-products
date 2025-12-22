import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { View } from "react-native";

import { Text } from '@/components';
import { useTransactions } from '@/contexts/TransactionsContext';
import { formatChatMessage } from '@/utils/common';

const Chat = () => {
  const { chatHistory } = useTransactions();

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