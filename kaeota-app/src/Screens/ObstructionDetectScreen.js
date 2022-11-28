import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ObstructionDetectScreen = () => {
    return (
        <View style={styles.container}>
            <Text>ObstructionDetectScreen</Text>
        </View>
    )
}

export default ObstructionDetectScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
})