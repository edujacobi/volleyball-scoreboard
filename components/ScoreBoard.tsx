import {StyleSheet, TouchableOpacity, View} from 'react-native'
import React from 'react'
import Score from "./Score";
import {useGame} from "../providers/GameProvider";
import {Ionicons} from "@expo/vector-icons";

const ScoreBoard = () => {
    const game = useGame();

    return (
        <View style={styles.board}>
            <Score player="Home"/>
            <Score player="Visitor"/>
            <TouchableOpacity
                style={styles.menu}
                onPress={() => game.setIsMenuOpen(true)}
            >
                {!game.isMenuOpen && <Ionicons name="menu-outline" size={24} color={"#FFFFFF"}/>}
            </TouchableOpacity>
        </View>
    )
}
export default ScoreBoard

const styles = StyleSheet.create({
    board: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    menu: {
        position: 'absolute',
        top: 8,
        right: 8,
        padding: 8,
    }
});
