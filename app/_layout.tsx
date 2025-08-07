import { Stack } from 'expo-router';

import { SplashScreen } from '@/components';
import { ThemeProvider } from '@/contexts/ThemeContext';
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
