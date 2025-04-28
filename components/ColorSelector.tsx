import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native'
import React from 'react'
import Colors from "../utils/colors";
import {Player, useGame} from "../providers/GameProvider";

interface Props {
    player: Player;
}

const ColorSelector = (props: Props) => {
    const game = useGame();

    const isSelected = (color: string) => {
        if (props.player === "Home") {
            return game.colorHome === color;
        } else {
            return game.colorVisitor === color;
        }
    }

    return (
        <FlatList
            style={styles.list}
            numColumns={9}
            data={Object.values(Colors)}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false}
            renderItem={color =>
                <TouchableOpacity
                    onPress={() => game.setColor(props.player, color.item)}
                    style={{
                        ...styles.showColor,
                        backgroundColor: color.item
                    }}
                >
                    <View style={isSelected(color.item) ? styles.selectedColor : {}}/>
                </TouchableOpacity>
            }
        >
        </FlatList>
    )
}
export default ColorSelector

const styles = StyleSheet.create({
    list: {
        flexGrow: 0,
    },
    showColor: {
        width: 50,
        height: 50,
        borderRadius: 100,
        margin: 4,
        minHeight: "auto",
        position: "relative",
    },
    selectedColor: {
        position: 'absolute',
        top: "50%",
        left: "50%",
        width: 20,
        height: 20,
        borderRadius: 100,
        backgroundColor: "hsla(0, 0%, 100%, 1)",
        transform: [
            {translateX: "-50%"},
            {translateY: "-50%"}
        ],
    }
});
