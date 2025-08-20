import { LinearGradient } from 'expo-linear-gradient';
import { Tabs } from 'expo-router';
import React from 'react';

import { useTheme } from '@/contexts/ThemeContext';

export default function TabLayout() {
  const { COLORS } = useTheme();

  return (
    <LinearGradient colors={[COLORS.backgroundStart, COLORS.backgroundMiddle, COLORS.backgroundEnd]} style={{ flex: 1, paddingTop: 80 }}>
      <Tabs
        screenOptions={{ headerShown: false }}
        tabBar={() => <></>}
      >
      </Tabs>
    </LinearGradient>
  );
}