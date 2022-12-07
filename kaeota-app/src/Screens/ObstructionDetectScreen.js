import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-react-native";
import { loadModel } from '../LoadModel/TensorLoadModel';
import CameraView from '../Camera/CameraView';

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