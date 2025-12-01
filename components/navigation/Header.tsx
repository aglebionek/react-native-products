import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import { View } from 'react-native';

import { Text } from '@/components';
import { useHistory } from '@/contexts/HistoryContext';
import { NAVIGATION_VIEWS, useNavigationContext, NAVIGATION_VIEW_PATHNAMES } from '@/contexts/NavigationContext';
import { useTheme } from '@/contexts/ThemeContext';
import { date2String, getCurrentDateInYYYY_MM_DD, YYYY_MM_DD2Date } from '@/utils/common';

// const selectHeaderTitle = (pathname: string, _YYYY_MM_DD: string) => {
//     if (pathname === '/files') return "History";
//     let dateToFormat = new Date();
//     if (pathname === '/old_chat') {
//         dateToFormat = YYYY_MM_DD2Date(_YYYY_MM_DD);
//     }
//     const dateString = date2String(dateToFormat);
//     return `${dateString.weekday}, ${dateString.date}`;
// }

const selectHeaderTitle = (currentNavigationView: NAVIGATION_VIEWS, _YYYY_MM_DD: string) => {
    switch (currentNavigationView) {
        case NAVIGATION_VIEWS.OLD_CHATS_LIST:
            return "History";
        case NAVIGATION_VIEWS.CURRENT_CHAT:
        case NAVIGATION_VIEWS.OLD_CHAT: {
            const oldDate = YYYY_MM_DD2Date(_YYYY_MM_DD);
            const dateString = date2String(oldDate);
            return `${dateString.weekday}, ${dateString.date}`;
        }
        case NAVIGATION_VIEWS.PRODUCTS_LIST:
            return "Products";
        default: 
            return '';
    }
}

const Header = () => {
    const { _YYYY_MM_DD, _setYYYY_MM_DD } = useHistory();
    const { currentNavigationView, setCurrentNavigationView } = useNavigationContext();
    const pathname = usePathname();
    const { navigate } = useRouter();
    const { COLORS } = useTheme();

    const handleLeftIconPress = () => {
        switch (currentNavigationView) {
            case NAVIGATION_VIEWS.OLD_CHATS_LIST:
                const currYYYY_MM_DD = getCurrentDateInYYYY_MM_DD();
                _setYYYY_MM_DD(currYYYY_MM_DD);
                setCurrentNavigationView(NAVIGATION_VIEWS.CURRENT_CHAT);
                navigate(NAVIGATION_VIEW_PATHNAMES.CURRENT_CHAT);
                break;
            case NAVIGATION_VIEWS.CURRENT_CHAT:
                setCurrentNavigationView(NAVIGATION_VIEWS.OLD_CHATS_LIST);
                navigate(NAVIGATION_VIEW_PATHNAMES.OLD_CHATS_LIST);
                break;
            case NAVIGATION_VIEWS.OLD_CHAT:
                setCurrentNavigationView(NAVIGATION_VIEWS.OLD_CHATS_LIST);
                navigate(NAVIGATION_VIEW_PATHNAMES.OLD_CHATS_LIST);
                break;
            case NAVIGATION_VIEWS.PRODUCTS_LIST:
                setCurrentNavigationView(NAVIGATION_VIEWS.OLD_CHATS_LIST);
                navigate(NAVIGATION_VIEW_PATHNAMES.OLD_CHATS_LIST);
                break;
        }
    }

    const handleRightIconPress = () => {
        switch (currentNavigationView) {
            case NAVIGATION_VIEWS.CURRENT_CHAT:
                setCurrentNavigationView(NAVIGATION_VIEWS.PRODUCTS_LIST);
                navigate(NAVIGATION_VIEW_PATHNAMES.PRODUCTS_LIST);
                break;
            case NAVIGATION_VIEWS.PRODUCTS_LIST:
                setCurrentNavigationView(NAVIGATION_VIEWS.CURRENT_CHAT);
                navigate(NAVIGATION_VIEW_PATHNAMES.CURRENT_CHAT);
                break;
            case NAVIGATION_VIEWS.OLD_CHATS_LIST:
                setCurrentNavigationView(NAVIGATION_VIEWS.PRODUCTS_LIST);
                navigate(NAVIGATION_VIEW_PATHNAMES.PRODUCTS_LIST);
                break;
            case NAVIGATION_VIEWS.EDIT_PRODUCT:
            case NAVIGATION_VIEWS.ADD_PRODUCT:
                setCurrentNavigationView(NAVIGATION_VIEWS.PRODUCTS_LIST);
                break;
        }
    }

    return (
        <View style={{
            justifyContent: 'center', alignItems: 'flex-end', height: 80, display: 'flex', flexDirection: 'row',
            borderBottomColor: COLORS.borderColor, borderBottomWidth: 1,
            width: '100%',
        }}>
            <View style={{ width: '15%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onTouchEnd={handleLeftIconPress}>
                <Ionicons
                    name={pathname === '/files' ? 'chatbubble' : 'list'}
                    size={35}
                    color={COLORS.tabIconSelected}
                    style={{ marginBottom: 10 }}
                />
            </View>
            <View style={{ width: '70%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', marginBottom: 10 }}>
                    {selectHeaderTitle(currentNavigationView, _YYYY_MM_DD)}
                </Text>
            </View>
            <View style={{ width: '15%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onTouchEnd={handleRightIconPress}>
                <Ionicons
                    name={pathname === '/products' ? 'close' : 'pencil'}
                    size={35}
                    color={COLORS.tabIconSelected}
                    style={{ marginBottom: 10 }}
                />
            </View>
        </View >
    )
}

export default Header;