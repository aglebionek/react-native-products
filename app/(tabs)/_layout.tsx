import { LinearGradient } from 'expo-linear-gradient';
import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { Text } from '@/components';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { useTheme } from '@/contexts/ThemeContext';

export default function TabLayout() {
  const { COLORS } = useTheme();

  return (
    <LinearGradient colors={[COLORS.backgroundStart, COLORS.backgroundMiddle, COLORS.backgroundEnd]} style={{ flex: 1, paddingTop: 80 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 60,
            borderTopColor: COLORS.borderColor,
          },
          tabBarActiveTintColor: COLORS.tabIconSelected,
          tabBarInactiveTintColor: COLORS.tabIconDefault,
          tabBarItemStyle: {
            marginBottom: 10,
          },
        }}
        tabBar={({ state, descriptors, navigation }) => {
          return (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                backgroundColor: 'transparent',
                borderTopColor: COLORS.borderColor,
                borderTopWidth: 1,
              }}
            >
              {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;

                const determineIconName = () => {
                  if (route.name === 'browse')
                    return isFocused ? 'list' : 'list-outline';
                  return isFocused ? 'heart' : 'heart-outline';
                }

                const onPress = () => {
                  const event = navigation.emit({
                    type: 'tabPress',
                    target: route.key,
                    canPreventDefault: true,
                  });

                  if (!isFocused && !event.defaultPrevented) {
                    navigation.navigate(route.name);
                  }
                };

                return (
                  <View
                    key={index}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 5,
                      width: '50%',
                      height: 60,
                    }}
                    onTouchStart={onPress}
                  >
                    <TabBarIcon
                      key={index}
                      name={determineIconName()}
                      color={isFocused ? COLORS.tabIconSelected : COLORS.tabIconDefault}
                    />
                    <Text
                      key={route.key}
                      style={{
                        fontSize: 12,
                        fontWeight: 'bold',
                        color: isFocused ? COLORS.tabIconSelected : COLORS.tabIconDefault,
                      }}
                    >
                      {options.tabBarLabel as string}
                    </Text>
                  </View>
                );
              })}
            </View>
          );
        }
        }
      >
      </Tabs>
    </LinearGradient>
  );
}