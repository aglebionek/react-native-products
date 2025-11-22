import { Stack} from 'expo-router';

import { SplashScreen } from '@/components';
import Header from '@/components/navigation/Header';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ProductsProvider } from '@/contexts/ProductsContext';
import { HistoryProvider } from '@/contexts/HistoryContext';
import { PermissionsProvider } from '@/contexts/PermissionsContext';
import { NavigationProvider} from '@/contexts/NavigationContext';



export default function RootLayout() {
  return (
    <PermissionsProvider>
      <ThemeProvider>
        <ProductsProvider>
          <HistoryProvider>
            <NavigationProvider>
              <SplashScreen>
                <Stack>
                  <Stack.Screen
                    name="(tabs)"
                    options={{
                      header: () => <Header />,
                      headerTransparent: true,
                    }}
                  />
                </Stack>
              </SplashScreen>
            </NavigationProvider>
          </HistoryProvider>
        </ProductsProvider>
      </ThemeProvider>
    </PermissionsProvider>
  );
}
