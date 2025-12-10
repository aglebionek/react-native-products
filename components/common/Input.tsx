import { Ionicons } from '@expo/vector-icons';
import { TextInput as NativeTextInput, View, type TextInputProps } from 'react-native';

import { useTheme } from '@/contexts/ThemeContext';

export const Input = ({ includeClearButton = false, innerRef, ...props }: TextInputProps & { includeClearButton?: boolean, innerRef?: any }) => {
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
            ref={innerRef}
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
        <View style={{ width: '90%' }}>
            <NativeTextInput
                placeholderTextColor="gray"
                style={{
                    width: '100%',
                    color: COLORS.text,
                }}
                {...props}
                ref={innerRef}
            />
        </View>
        <Ionicons
            name="close-circle"
            size={20}
            color="gray"
            onPress={() => {
                if (props.onChangeText) props.onChangeText('');
            }}
            style={{ width: '10%' }}
        />
    </View >
}