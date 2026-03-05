import * as Notifications from 'expo-notifications';
import { type EventSubscription } from 'expo-modules-core';
import Constants from 'expo-constants';
import { useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

interface useNotificationsProps {
    onNotificationClicked?: (event: Notifications.NotificationResponse) => void;
    onNotificationShow?: (event: Notifications.Notification) => void;
}

const useNotifications = ({ onNotificationClicked = () => { }, onNotificationShow = () => { } }: useNotificationsProps) => {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [channels, setChannels] = useState<Notifications.NotificationChannel[]>([]);
    const [notification, setNotification] = useState<Notifications.Notification | undefined>(
        undefined
    );
    const notificationListener = useRef<EventSubscription>(null);
    const responseListener = useRef<EventSubscription>(null);

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => token && setExpoPushToken(token));

        if (Platform.OS === 'android') {
            Notifications.getNotificationChannelsAsync().then(value => setChannels(value ?? []));
        }
        // on notification show
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
            onNotificationShow(notification);
        });

        // on notification click
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            onNotificationClicked(response);
        });

        return () => {
            notificationListener.current?.remove();
            responseListener.current?.remove();
        };
    }, []);

    const sendPushNotification = async (content: Notifications.NotificationContentInput, trigger: Notifications.NotificationTriggerInput) => {
        await Notifications.scheduleNotificationAsync({ content, trigger });
    }

    return { sendPushNotification };
}

export default useNotifications;

async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }
    if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    // EAS projectId is used here.
    try {
        const projectId =
            Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
        if (!projectId) {
            throw new Error('Project ID not found');
        }
        token = (
            await Notifications.getExpoPushTokenAsync({
                projectId,
            })
        ).data;
        console.log(token);
    } catch (e) {
        token = `${e}`;
    }

    return token;
}
