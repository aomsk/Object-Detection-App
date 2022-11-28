import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-react-native";
import { loadModel } from '../LoadModel/TensorLoadModel';
import CameraView from '../Camera/CameraView';

const ObjectDetectScreen = () => {
    const modelJson = require("../../assets/model/general_object_web_model/model.json");
    const modelWeights = [
        require("../../assets/model/general_object_web_model/group1-shard1of7.bin"),
        require("../../assets/model/general_object_web_model/group1-shard2of7.bin"),
        require("../../assets/model/general_object_web_model/group1-shard3of7.bin"),
        require("../../assets/model/general_object_web_model/group1-shard4of7.bin"),
        require("../../assets/model/general_object_web_model/group1-shard5of7.bin"),
        require("../../assets/model/general_object_web_model/group1-shard6of7.bin"),
        require("../../assets/model/general_object_web_model/group1-shard7of7.bin"),
    ];

    // const [hasPermission, setHasPermission] = useState(null);
    // const [type, setType] = useState("back");
    const [model, setModel] = useState(null);
    const [inputTensor, setInputTensor] = useState([]);
    // const [ctx, setCTX] = useState(null);

    // model configuration
    const configurations = { threshold: 0.25 };

    useEffect(() => {
        (async () => {
            // const { status } = await Camera.requestCameraPermissionsAsync();
            // setHasPermission(status === "granted");
            tf.ready().then(() => {
                loadModel(modelJson, modelWeights).then(async (loadedModel) => {
                    // warming up model
                    const dummyInput = tf.ones(loadedModel.inputs[0].shape);
                    console.log('dummyInput: ', dummyInput);
                    await loadedModel.executeAsync(dummyInput);
                    tf.dispose(dummyInput);

                    // set state
                    setInputTensor(loadedModel.inputs[0].shape);
                    setModel(loadedModel);
                });
            });
        })();
    }, []);

    return (
        <View style={styles.container}>
            <>
                {model ? (
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <View style={{ alignItems: 'center' }}>
                            <CameraView
                                model={model}
                                inputTensorSize={inputTensor}
                            // config={configurations}
                            />
                        </View>
                    </View>
                ) : (
                    <Text>Loading model...</Text>
                )}
            </>
            <StatusBar style="auto" />
        </View>
    );
};

export default ObjectDetectScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
})