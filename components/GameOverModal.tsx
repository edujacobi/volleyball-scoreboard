import {Modal, ScrollView, StyleSheet, Text} from 'react-native'
import React from 'react'
import {useGame} from "../providers/GameProvider";
import RoundButton from "./RoundButton";
import {Ionicons} from "@expo/vector-icons";

const GameOverModal = () => {
    const game = useGame();
    return (
        <>
            {game.gameFinished &&
              <ScrollView
                style={styles.container}
                contentContainerStyle={styles.modal}
              >
                <Text style={styles.title}>
                  Game Over
                </Text>
                <RoundButton
                  text="Next set"
                  onPress={game.restartSet}
                  icon={<Ionicons name="chevron-forward-outline" size={24} color={"#FFFFFF"}/>}
                />
                <RoundButton
                  text="Restart game"
                  onPress={game.restartGame}
                  icon={<Ionicons name="refresh-outline" size={24} color={"#FFFFFF"}/>}
                />
              </ScrollView>}
        </>
    )
}
export default GameOverModal

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
        flexGrow: 1,
        padding: 32,
    },
});
