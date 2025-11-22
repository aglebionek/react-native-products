import { View } from "react-native";

import { Text } from "@/components/common";
import { useTheme } from "@/contexts/ThemeContext";

export const SuggestionButton = ({ onPress, text }: { onPress: () => void; text: string }) => {
    const { COLORS } = useTheme();

    let fontSize = 18;
    if (text.length > 9 && text.length <= 15) {
        fontSize = 14;
    } else if (text.length > 15) {
        fontSize = 10;
    }

    return (
        <View style={{ flex: 1, height: 40, marginHorizontal: 5, backgroundColor: COLORS.tabIconDefault, borderRadius: 5, paddingHorizontal: 10 }} onTouchStart={onPress}>
            <Text style={{ fontSize, textAlign: 'center', textAlignVertical: 'center', height: '100%' }}>{text}</Text>
        </View>
    )
};