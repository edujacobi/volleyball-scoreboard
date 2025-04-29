import {Dimensions, StyleSheet, Text, View} from 'react-native'
import Colors from "../utils/colors";
import {Player, useGame} from "../providers/GameProvider";
import RoundButton from "./RoundButton";
import {Ionicons} from "@expo/vector-icons";

interface Props {
    color?: Colors;
    player: Player;
}

const {width} = Dimensions.get('window');
const dynamicFontSize = Math.floor(width * 0.3);

function Score(props: Readonly<Props>) {
    const game = useGame();
    const color = props.player === "Home" ? game.colorHome : game.colorVisitor;

    return (
        <View style={{...styles.container, backgroundColor: color}}>
            <Text style={[styles.setBase, props.player === "Home" ? styles.setHome : styles.setVisitor]}>
                {game.getSets(props.player)}
            </Text>
            <RoundButton
                onPress={() => game.changeScore(props.player, "increment")}
                icon={<Ionicons name="add-outline" size={24} color={"#FFFFFF"}/>}
            />
            <View style={styles.pointContainer}>
                <Text style={styles.pointText}>
                    {game.getScore(props.player)}
                </Text>
                {game.currentPlayer == props.player &&
                  <Text style={styles.serve}>
                    🏐
                  </Text>
                }
            </View>
            <RoundButton
                onPress={() => game.changeScore(props.player, "decrement")}
                icon={<Ionicons name="remove-outline" size={24} color={"#FFFFFF"}/>}
            />
        </View>
    )
}

export default Score

const styles = StyleSheet.create({
    container: {
        flex: 0.5,
        flexDirection: 'row',
        gap: 24,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 24,
        width: '100%',
        height: '100%',
        position: "relative",
    },
    button: {
        backgroundColor: "transparent",
        aspectRatio: 1,
        borderRadius: 100,
        width: 40,
        padding: 16,
        borderColor: "hsla(0, 0%, 100%, 1)",
        borderStyle: "solid",
        borderWidth: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    setBase: {
        position: "absolute",
        top: 8,
        color: "hsla(0, 0%, 100%, 1)",
        fontSize: 40,
        fontWeight: 800,
        textAlign: 'center',
    },
    setHome: {
        right: 24,
    },
    setVisitor: {
        left: 24,
    },
    pointContainer: {
        alignItems: 'center',
        height: "60%",
        justifyContent: 'center',
    },
    pointText: {
        color: "hsla(0, 0%, 100%, 1)",
        fontSize: dynamicFontSize,
        lineHeight: Math.floor(dynamicFontSize * 1.05),
        fontVariant: ["proportional-nums"],
        fontWeight: 900,
        textAlign: 'center',
    },
    serve: {
        position: "absolute",
        display: "flex",
        bottom: -24,
        fontSize: 40,
        textAlign: 'center',
    },
});
