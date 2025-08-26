import { Stack, useRouter, usePathname } from 'expo-router';

import { SplashScreen, Text } from '@/components';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import { ProductsProvider } from '@/contexts/ProductsContext';
import { HistoryProvider, useHistory } from '@/contexts/HistoryContext';
import { PermissionsProvider } from '@/contexts/PermissionsContext';
import { View } from 'react-native';
import { date2String, YYYY_MM_DD2Date } from '@/utils/common';
import { Ionicons } from '@expo/vector-icons';

const selectHeaderTitle = (pathname: string, _YYYY_MM_DD: string) => {
  if (pathname === '/files') return "History";
  let dateToFormat = new Date();
  if (pathname === '/old_chat') {
    dateToFormat = YYYY_MM_DD2Date(_YYYY_MM_DD);
  }
  const dateString = date2String(dateToFormat);
  return `${dateString.weekday}, ${dateString.date}`;
}

const Header = () => {
  const { _YYYY_MM_DD } = useHistory();
  const pathname = usePathname();
  const { navigate } = useRouter();
  const { COLORS } = useTheme();

  return (
    <View style={{
      justifyContent: 'center', alignItems: 'flex-end', height: 80, display: 'flex', flexDirection: 'row',
      borderBottomColor: COLORS.borderColor, borderBottomWidth: 1,
      width: '100%',
    }}>
      <View style={{ width: '15%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Ionicons
          name={pathname === '/files' ? 'chatbubble' : 'list'}
          size={35}
          color={COLORS.tabIconSelected}
          style={{ marginBottom: 10 }}
          onPress={() => pathname === '/files' ? navigate('/') : navigate('/(tabs)/files')}
        />
      </View>
      <View style={{ width: '85%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingRight: '15%' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', marginBottom: 10 }}>
          {selectHeaderTitle(pathname, _YYYY_MM_DD)}
        </Text>
      </View>
    </View >
  )
}

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
                    header: () => <Header />,
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
