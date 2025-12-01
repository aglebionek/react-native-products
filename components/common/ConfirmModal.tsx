import { Modal, View } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "./Button";
import { Text } from "./Text";

interface ConfirmModalProps {
    title: string;
    text: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export const ConfirmModal = ({ title, text, onConfirm, onCancel }: ConfirmModalProps) => {
    const { COLORS } = useTheme();

    return <Modal transparent={true} >
        <GestureHandlerRootView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }} onTouchEnd={onCancel}>
            <View style={{ height: 300, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.backgroundMiddle, padding: 20 }} onTouchEnd={e => e.stopPropagation()}>
                <Text style={{ color: COLORS.text, fontWeight: 'bold', textAlign: 'center' }}>{title}</Text>

                <Text style={{ color: COLORS.text }}>{text}</Text>

                <View style={{ flexDirection: 'row', marginTop: 20, width: '100%', gap: 10 }}>
                    <Button onPress={onCancel} title="Cancel" />
                    <Button onPress={onConfirm} title="Confirm" />
                </View>
            </View>
        </GestureHandlerRootView>
    </Modal>
}