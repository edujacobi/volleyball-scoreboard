import {StyleSheet, Text, TouchableOpacity} from 'react-native'
import React from 'react'

interface Props {
    text?: string,
    onPress: () => void,
    icon?: React.ReactNode,
}

const RoundButton = (props: Props) => {
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={{...styles.button, ...props.text ? {} : styles.buttonNoText}}
        >
            {props.icon}
            {props.text && <Text style={styles.buttonText}>
                {props.text}
            </Text>}
        </TouchableOpacity>
    )
}
export default RoundButton

const styles = StyleSheet.create({
    button: {
        backgroundColor: "transparent",
        borderRadius: 100,
        minWidth: 250,
        paddingBlock: 12,
        paddingInline: 24,
        borderColor: "hsla(0, 0%, 100%, 1)",
        borderStyle: "solid",
        borderWidth: 2,
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonNoText: {
        minWidth: 0,
        paddingBlock: 8,
        paddingInline: 8,
    },
    buttonText: {
        color: "hsla(0, 0%, 100%, 1)",
        fontSize: 20,
        fontWeight: 'bold',
    },
});
