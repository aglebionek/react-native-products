import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from '@/components/common';
import { useTheme } from '@/contexts/ThemeContext';

type SoundListItemProps = {
    currentlyPlayingAudioUri: string | null;
    el: {
        title: string;
        uri: string;
    };
    handlePlaySound: (uri: string) => void;
};

const FavSoundListItem = ({ currentlyPlayingAudioUri, el, handlePlaySound }: SoundListItemProps) => {
    const { COLORS } = useTheme();

    const isElPlaying = el.uri === currentlyPlayingAudioUri;
    const cutTitle = el.title.length > 16 ? `${el.title.slice(0, 10)}...` : el.title;

    return (
        <View key={el.uri} style={{ ...styles.view, borderColor: `${COLORS.borderColor}99` }}>
            <Pressable onPress={() => handlePlaySound(el.uri)} style={styles.pressable}>
                <Ionicons size={30} color={isElPlaying ? COLORS.tabIconSelected : COLORS.tabIconDefault} name={isElPlaying ? 'pause' : 'play'} />
                <Text style={styles.text}>{cutTitle}</Text>
            </Pressable>
        </View >
    )
}

const styles = StyleSheet.create({
    view: {
        margin: 5,
        padding: 10,
        backgroundColor: 'transparent',
        borderWidth: 1,
        // shadowColor: 'black',
        // shadowOffset: {
        //     width: 20,
        //     height: -20,
        // },
        // shadowRadius: 10,
        // shadowOpacity: 1,
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: -20,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // elevation: 5,
    },
    pressable: {
        display: 'flex',
        flexDirection: 'column',
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontWeight: 'bold',
    }
})

export default FavSoundListItem;