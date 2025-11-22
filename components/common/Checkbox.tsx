import { useTheme } from "@/contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons"

interface CheckboxProps {
    checked: boolean;
    onPress: () => void;
}

export const Checkbox = ({ checked, onPress }: CheckboxProps) => {
    const { COLORS } = useTheme();

    return (
        <Ionicons
            name={'checkbox'}
            size={30}
            color={checked ? COLORS.tabIconSelected : 'gray'}
            onPress={onPress}
        />
    )
}