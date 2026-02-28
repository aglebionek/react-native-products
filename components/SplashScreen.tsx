import { useFonts } from 'expo-font';
import * as NativeSplash from 'expo-splash-screen';
import { useEffect, useState } from 'react';

import { useProducts } from '@/contexts/ProductsContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Text } from './common';
import { usePermissions } from '@/contexts/PermissionsContext';
import { useTransactions } from '@/contexts/TransactionsContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
NativeSplash.preventAutoHideAsync();

const SplashScreen = ({ children }: { children: React.ReactNode }) => {
    const [fontsLoaded] = useFonts({ SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf') });
    const { permissionsLoaded } = usePermissions();
    const { productsLoaded, productsLoadingError } = useProducts();
    const { themeLoaded } = useTheme();
    const { transactionsLoaded } = useTransactions();

    useEffect(() => {
        if (fontsLoaded && permissionsLoaded && productsLoaded && themeLoaded && transactionsLoaded) {
            NativeSplash.hideAsync();
        }
    }, [fontsLoaded, permissionsLoaded, productsLoaded, themeLoaded, transactionsLoaded]);

    return (
        <>
            {children}
            {productsLoadingError !== null && <Text style={{ color: 'red', textAlign: 'center', marginTop: 20 }}>{productsLoadingError}</Text>}
        </>
    )
}

export default SplashScreen;