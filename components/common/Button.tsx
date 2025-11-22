import { type ButtonProps, Button as NativeButton } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";

export const Button = (props: ButtonProps) => {
    const { COLORS } = useTheme();

    return <NativeButton {...props} color={COLORS.tabIconDefault} />;
}
