import { View } from "react-native";

import { Text } from "@/components/common";
import { useTheme } from "@/contexts/ThemeContext";

export const SuggestionButton = ({ onPress, text }: { onPress: () => void; text: string }) => {
    const { COLORS } = useTheme();

    const isTextLong = text.length > 10;

    return (
        <View style={{ flex: 1, height: 40, marginHorizontal: 5, backgroundColor: COLORS.tabIconDefault, borderRadius: 5, paddingHorizontal: 10 }} onTouchStart={onPress}>
            <Text style={{ fontSize: isTextLong ? 14 : 18, textAlign: 'center', textAlignVertical: 'center', height: '100%' }}>{text}</Text>
        </View>
    )
};