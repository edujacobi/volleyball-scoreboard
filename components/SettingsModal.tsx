import {Modal, ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native'
import React from 'react'
import {useGame} from "../providers/GameProvider";
import RoundButton from "./RoundButton";
import ColorSelector from "./ColorSelector";
import {Ionicons} from "@expo/vector-icons";
import * as NavigationBar from 'expo-navigation-bar';

const SettingsModal = () => {
    const game = useGame();
    NavigationBar.setVisibilityAsync("hidden");
    return (
        <>
            {game.isMenuOpen &&
              <ScrollView
                style={styles.container}
                contentContainerStyle={styles.modal}
                nestedScrollEnabled={true}
              >
                <Text style={styles.title}>
                  Settings
                </Text>
                <TouchableOpacity
                  style={styles.close}
                  onPress={() => game.setIsMenuOpen(false)}
                >
                  <Ionicons name="close-outline" size={24} color={"#FFFFFF"}/>
                </TouchableOpacity>

                <RoundButton
                  text="Restart set"
                  onPress={game.restartSet}
                  icon={<Ionicons name="chevron-back-outline" size={24} color={"#FFFFFF"}/>}
                />

                <RoundButton
                  text="Restart game"
                  onPress={game.restartGame}
                  icon={<Ionicons name="refresh-outline" size={24} color={"#FFFFFF"}/>}
                />

                <RoundButton
                  text="Change sides"
                  onPress={game.changeSides}
                  icon={<Ionicons name="chevron-expand-outline" size={24} color={"#FFFFFF"}/>}
                />

                <Text style={styles.text}>
                  Change color (Home)
                </Text>
                <ColorSelector player={"Home"}/>

                <Text style={styles.text}>
                  Change color (Visitor)
                </Text>
                <ColorSelector player={"Visitor"}/>
              </ScrollView>}
        </>

    )
}
export default SettingsModal

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: "hsla(0, 0%, 100%, 1)"
    },
    container: {
        position: "absolute",
        inset: 0,
        flex: 1,
        backgroundColor: 'hsla(0, 0%, 0%, 0.75)',
    },
    modal: {
        gap: 16,
        display: 'flex',
        alignItems: "center",
        justifyContent: "center",
        padding: 32,
    },
    close: {
        position: 'absolute',
        top: 8,
        right: 8,
        padding: 8,
        color: "hsla(0, 0%, 100%, 1)",
    },
    text: {
        color: "hsla(0, 0%, 100%, 1)",
        fontSize: 20,
        fontWeight: 'bold',
    },
});
