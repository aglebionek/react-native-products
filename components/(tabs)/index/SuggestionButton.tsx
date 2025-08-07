import { View } from "react-native";

import { Text } from "@/components/common";

export const SuggestionButton = ({ onPress, text }: { onPress: () => void; text: string }) => {
    return (
        <View style={{ flex: 1, marginHorizontal: 5, backgroundColor: '#333', borderRadius: 5, padding: 10 }} onTouchStart={onPress}>
            <Text style={{ fontSize: 18 }}>{text}</Text>
        </View>
    )
};