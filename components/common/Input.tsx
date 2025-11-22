import { TextInput as NativeTextInput, type TextInputProps } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

export const Input = (props: TextInputProps) => {
    const { COLORS } = useTheme();

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