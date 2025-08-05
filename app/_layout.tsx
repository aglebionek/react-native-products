import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { View } from 'react-native';

import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import { Text } from '@/components/common';
import SplashScreen from '@/components/SplashScreen';
import { ProductsProvider } from '@/contexts/ProductsContext';
import { HistoryProvider } from '@/contexts/HistoryContext';
import { PermissionsProvider } from '@/contexts/PermissionsContext';

export default function RootLayout() {
  return (
    <PermissionsProvider>
      <ThemeProvider>
        <ProductsProvider>
          <HistoryProvider>
            <SplashScreen>
              <Stack>
                <Stack.Screen
                  name="(tabs)"
                  options={{
                    header: () => <></>,
                    headerTransparent: true,
                  }}
                />
              </Stack>
            </SplashScreen>
          </HistoryProvider>
        </ProductsProvider>
      </ThemeProvider>
    </PermissionsProvider>
  );
}
