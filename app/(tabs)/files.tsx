import { useEffect, useState } from 'react';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { Pressable, View } from "react-native";

import { Text } from '@/components';
import { useHistory } from '@/contexts/HistoryContext';
import { Ionicons } from '@expo/vector-icons';
import { usePermissions } from '@/contexts/PermissionsContext';
import { useRouter } from 'expo-router';
import { date2String, date2YYYY_MM_DD, getCurrentDateInPolishTimezone } from '@/utils/common';

const extractYYYY_MM_DD = (filename: string) => {
  const match = filename.match(/chat_history_(\d{4}_\d{2}_\d{2})\.json/);
  return match ? match[1] : null;
};

const Chat = () => {
  const { chatHistory, readAllChatHistoryFiles, _setYYYY_MM_DD } = useHistory();
  const { handleDownloadFile } = usePermissions();
  const { navigate } = useRouter();

  const [chatHistoryFiles, setChatHistoryFiles] = useState<string[]>([]);

  useEffect(() => {
    const fetchChatHistory = async () => {
      const files = await readAllChatHistoryFiles();
      setChatHistoryFiles(files.filter(file => file.startsWith('chat_history_') && file.endsWith('.json')).sort().reverse());
    };
    fetchChatHistory();
  }, [readAllChatHistoryFiles]);

  const convertChatHistoryToCSV = () => {
    const rows = chatHistory.map(message => {
      const date = date2String(message.timestamp);
      return `${date.date} ${date.time}, ${message.productCategory}, ${message.productName}, ${message.productQuantity}`;
    });
    return rows.join("\n");
  }

  return (
    <GestureHandlerRootView>
      <ScrollView
        keyboardShouldPersistTaps="always"
      >
        {chatHistoryFiles.map((chatHistoryElement, index) => (
          <View key={`chat-file-${index}`} style={{ padding: 2, backgroundColor: '#444', display: 'flex', flexDirection: 'row' }}>
            <Pressable style={{ width: '90%', display: 'flex', flexDirection: 'row' }}
              onPress={() => {
                const YYYY_MM_DD = extractYYYY_MM_DD(chatHistoryElement) as string;
                const currentDate = getCurrentDateInPolishTimezone();
                const currentYYYY_MM_DD = date2YYYY_MM_DD(currentDate);
                _setYYYY_MM_DD(YYYY_MM_DD);
                if (YYYY_MM_DD === currentYYYY_MM_DD) return navigate(`/(tabs)/`);
                navigate(`/(tabs)/old_chat`);
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', marginBottom: 10 }}>
                {chatHistoryElement}
              </Text>

            </Pressable>
            <View key={`chat-file-${index}`} style={{ width: '10%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Ionicons
                name="arrow-down"
                size={35}
                style={{ marginBottom: 10 }}
                onPress={() => {
                  const YYYY_MM_DD = extractYYYY_MM_DD(chatHistoryElement);
                  const csvData = convertChatHistoryToCSV();
                  handleDownloadFile(`${YYYY_MM_DD}.csv`, csvData, 'text/csv');
                  // TODO: add system notification about the downloaded file
                }}
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </GestureHandlerRootView>
  )
}

export default Chat;