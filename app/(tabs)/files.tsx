import { useEffect, useState } from 'react';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { View } from "react-native";

import { Text } from '@/components';
import { useHistory } from '@/contexts/HistoryContext';
import { Ionicons } from '@expo/vector-icons';
import { usePermissions } from '@/contexts/PermissionsContext';

const Chat = () => {
  const { readAllChatHistoryFiles } = useHistory();
  const { handleDownloadFile } = usePermissions();

  const [chatHistoryFiles, setChatHistoryFiles] = useState<string[]>([]);

  useEffect(() => {
    const fetchChatHistory = async () => {
      const files = await readAllChatHistoryFiles();
      setChatHistoryFiles(files);
    };
    fetchChatHistory();
  }, [readAllChatHistoryFiles]);

  return (
    <GestureHandlerRootView>
      <ScrollView
        keyboardShouldPersistTaps="always"
      >
        {chatHistoryFiles.map((chatHistoryElement, index) => (
          <View key={`chat-file-${index}`} style={{ padding: 2, backgroundColor: '#444', display: 'flex', flexDirection: 'row' }}>
            <View style={{ width: '90%', display: 'flex', flexDirection: 'row' }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', marginBottom: 10 }}>
                {chatHistoryElement}
              </Text>
            </View>
            <View key={`chat-file-${index}`} style={{ width: '10%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Ionicons
                name="arrow-down"
                size={35}
                style={{ marginBottom: 10 }}

              />
            </View>
          </View>
        ))}
      </ScrollView>
    </GestureHandlerRootView>
  )
}

export default Chat;