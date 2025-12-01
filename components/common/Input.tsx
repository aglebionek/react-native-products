import { Ionicons } from '@expo/vector-icons';
import { TextInput as NativeTextInput, View, type TextInputProps } from 'react-native';

import { useTheme } from '@/contexts/ThemeContext';

export const Input = ({ includeClearButton = false, ...props }: TextInputProps & { includeClearButton?: boolean }) => {
    const { COLORS } = useTheme();

    if (!includeClearButton) {
        return <NativeTextInput
            placeholderTextColor="gray"
            style={{
                height: 40,
                borderColor: COLORS.borderColor,
                borderWidth: 1,
                marginBottom: 20,
                color: COLORS.text,
                paddingLeft: 10,
            }}
            {...props}
        />
    }

    return <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: COLORS.borderColor,
        borderWidth: 1,
        height: 40,
        marginBottom: 20,
        paddingLeft: 10,
    }}>
        <NativeTextInput
            placeholderTextColor="gray"
            style={{
                flex: 1,
                color: COLORS.text,
            }}
            {...props}
        />
        <Ionicons
            name="close-circle"
            size={20}
            color="gray"
            onPress={() => {
                if (props.onChangeText) props.onChangeText('');
            }}
            style={{ marginRight: 10 }}
        />
    </View>
}