import { useCallback, useEffect, useState } from 'react';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { Pressable, ToastAndroid, View } from "react-native";

import { Text } from '@/components';
import { useHistory } from '@/contexts/HistoryContext';
import { Ionicons } from '@expo/vector-icons';
import { usePermissions } from '@/contexts/PermissionsContext';
import { useRouter } from 'expo-router';
import { date2String, getCurrentDateInYYYY_MM_DD } from '@/utils/common';
import useNotifications from '@/hooks/useNotifications';
import { NotificationContentInput, NotificationResponse, NotificationTriggerInput } from 'expo-notifications';
import { startActivityAsync } from 'expo-intent-launcher';
import { NAVIGATION_VIEW_PATHNAMES, NAVIGATION_VIEWS, useNavigationContext } from '@/contexts/NavigationContext';

const extractYYYY_MM_DD = (filename: string) => {
  const match = filename.match(/chat_history_(\d{4}_\d{2}_\d{2})\.json/);
  return match ? match[1] : null;
};

const Chat = () => {
  const { chatHistory, readAllChatHistoryFiles, _setYYYY_MM_DD } = useHistory();
  const { setCurrentNavigationView } = useNavigationContext();
  const { handleDownloadFile } = usePermissions();
  const { navigate } = useRouter();

  const onNotificationClicked = async (response: NotificationResponse) => {
    const data = response.notification.request.content.data;
    await startActivityAsync('android.intent.action.VIEW', {
      data: data.fileUri,
      flags: 1,
      type: data.mimetype,
    });
  }

  const { sendPushNotification } = useNotifications({ onNotificationClicked });

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
      return `${date.date}, ${date.time}, ${message.productCategory}, ${message.productName}, ${message.productQuantity}`;
    });
    return rows.join("\n");
  }

  const handleDownloadCSV = async (chatHistoryElement: string) => {
    ToastAndroid.show("Downloading CSV...", ToastAndroid.SHORT);
    const YYYY_MM_DD = extractYYYY_MM_DD(chatHistoryElement);
    const csvData = convertChatHistoryToCSV();
    const filename = `${YYYY_MM_DD}.csv`;
    const mimetype = 'text/csv';

    const fileUri = await handleDownloadFile(filename, csvData, mimetype);
    const trigger = { seconds: 1, repeats: false } as NotificationTriggerInput;
    const content = {
      autoDismiss: true,
      title: `File ${filename} download failed`,
      body: `Tap to retry.`,
      data: {},
    } as NotificationContentInput;

    if (fileUri) {
      content.title = `File ${filename} downloaded`;
      content.body = `Tap to open.`;
      content.data = { fileUri, mimetype };
    }
    await sendPushNotification(content, trigger);
  }

  return (
    <GestureHandlerRootView>
      <ScrollView
        keyboardShouldPersistTaps="always"
      >
        {chatHistoryFiles.map((chatHistoryElement, index) => (
          <View key={`chat-file-${index}`} style={{ padding: 2, display: 'flex', flexDirection: 'row' }}>
            <Pressable style={{ width: '90%', display: 'flex', flexDirection: 'row' }}
              onPress={() => {
                const YYYY_MM_DD = extractYYYY_MM_DD(chatHistoryElement) as string;
                const currentYYYY_MM_DD = getCurrentDateInYYYY_MM_DD();
                _setYYYY_MM_DD(YYYY_MM_DD);
                if (YYYY_MM_DD === currentYYYY_MM_DD) {
                  navigate(NAVIGATION_VIEW_PATHNAMES.CURRENT_CHAT);
                  setCurrentNavigationView(NAVIGATION_VIEWS.CURRENT_CHAT);
                  return;
                }
                navigate(NAVIGATION_VIEW_PATHNAMES.OLD_CHAT);
                setCurrentNavigationView(NAVIGATION_VIEWS.OLD_CHAT);
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
                onPress={() => handleDownloadCSV(chatHistoryElement)}
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </GestureHandlerRootView>
  )
}

export default Chat;