import { Text as NativeText, type TextProps } from 'react-native';

import { useTheme } from '@/contexts/ThemeContext';

const Text = (props: TextProps) => {
    const { COLORS } = useTheme();
    return <NativeText {...props} style={[{ color: COLORS.text }, props.style]} />;
}

export default Text;