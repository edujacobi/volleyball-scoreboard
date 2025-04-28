import ScoreBoard from "./components/ScoreBoard";
import {GameProvider} from "./providers/GameProvider";
import SettingsModal from "./components/SettingsModal";
import GameOverModal from "./components/GameOverModal";
import {StatusBar} from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';

export default function App() {

    // NavigationBar.setVisibilityAsync("hidden");

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
