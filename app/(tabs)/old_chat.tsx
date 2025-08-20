import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { View } from "react-native";

import { ChatMessage } from '@/@types';
import { Text } from '@/components';
import { useHistory } from '@/contexts/HistoryContext';
import { formatDateToPolishFormat } from '@/utils/common';

const formatChatMessage = (message: ChatMessage) => {
    return `${formatDateToPolishFormat(message.timestamp).time} - ${message.productCategory} ${message.productName} ${message.productQuantity}`;
}

const Chat = () => {
    const { chatHistory } = useHistory();

    return (
        <GestureHandlerRootView>
            <ScrollView>
                <View style={{ height: 400, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                    {chatHistory.map((chatHistoryElement, index) => (
                        <View key={index} style={{ padding: 2, backgroundColor: '#444' }}>
                            <Text style={{ color: 'white' }}>{formatChatMessage(chatHistoryElement)}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </GestureHandlerRootView>
    )
}

export default Chat;