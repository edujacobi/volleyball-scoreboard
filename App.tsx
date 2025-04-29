import ScoreBoard from "./components/ScoreBoard";
import {GameProvider} from "./providers/GameProvider";
import SettingsModal from "./components/SettingsModal";
import GameOverModal from "./components/GameOverModal";
import {StatusBar} from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import {useFonts} from "expo-font";
import {useEffect} from "react";

SplashScreen.preventAutoHideAsync();

export default function App() {

    const [loaded, error] = useFonts({
        'SpaceGrotesk': require('./assets/fonts/SpaceGrotesk.ttf'),
    });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

    return (
        <>
            <StatusBar hidden/>
            <GameProvider>
                <ScoreBoard/>
                <SettingsModal/>
                <GameOverModal/>
            </GameProvider>
        </>
    );
}
