import { useFonts } from 'expo-font';
import * as NativeSplash from 'expo-splash-screen';
import { useEffect, useState } from 'react';

import { useProducts } from '@/contexts/ProductsContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Text } from './common';
import { usePermissions } from '@/contexts/PermissionsContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
NativeSplash.preventAutoHideAsync();

const SplashScreen = ({ children }: { children: React.ReactNode }) => {
    const [loaded] = useFonts({ SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf') });
    const { permissionsLoaded } = usePermissions();
    const { productsLoaded, productsLoadingError } = useProducts();
    const { themeLoaded } = useTheme();

    const [loadedAllResources, setLoadedAllResources] = useState(false);

    useEffect(() => {
        if (loaded && permissionsLoaded && productsLoaded && themeLoaded) {
            setLoadedAllResources(true);
            NativeSplash.hideAsync();
        }
    }, [loaded, permissionsLoaded, productsLoaded, themeLoaded]);

    return (
        <>
            {loadedAllResources ? children : null}
            {productsLoadingError !== null && <Text style={{ color: 'red', textAlign: 'center', marginTop: 20 }}>{productsLoadingError}</Text>}
        </>
    )
}

export default SplashScreen;