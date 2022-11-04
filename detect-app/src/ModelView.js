import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { View, StyleSheet, Text, useWindowDimensions } from 'react-native';
import { Camera } from 'expo-camera';

import * as tf from '@tensorflow/tfjs';
import { useTensorFlowModel } from './useTensorFlow';
import { LoadingView } from './LoadingView';
import { CustomTensorCamera } from './CustomTensorCamera';
import { startPrediction } from './useTensorFlow';

export function ModelView() {
    const modelJson = require('../assets/dog_cat_model/model.json');
    const modelWeights = require('../assets/dog_cat_model/weights.bin');
    const model = useTensorFlowModel(modelJson, modelWeights)

    const [predictions, setPredictions] = useState([]);
    const [isclass, setClass] = useState('');
    const RESULT_MAPPING = ["Cat", "Dog"];

    // const list_predictions = predictions.map(a => a.toFixed(2));
    // console.log(list_predictions);

    let result = [];
    predictions.forEach(a => result.push( a.toFixed(1)));
    // console.log(result);

    if (!model) {
        console.log('Loading TensorFlow model');
        return <LoadingView message='Loading TensorFlow model' />
    }
    return (
        <View style={styles.container}>
            <View style={{ borderRadius: 20, overflow: "hidden" }}>
                <ModelCamera model={model} setPredictions={setPredictions} setClass={setClass} RESULT_MAPPING={RESULT_MAPPING} />
            </View>
            <View style={styles.predictions}>
                <Text style={{ fontSize: 18 }} >สัตว์ในรูป คือ { isclass }</Text>
                {
                    RESULT_MAPPING.map((resault, index) => {
                        return (
                            <View key={index}>
                                <Text style={{ fontSize: 18 }} key={index}>Class : { resault } {result[index]}</Text>
                                {/* <Text style={{ fontSize: 18 }} key={index}>predictions : { predictions[index] }</Text> */}
                            </View>
                        )
                    })
                }
            </View>
        </View>
    )
}

function ModelCamera({ model, setPredictions, setClass, RESULT_MAPPING }) {
    const raf = useRef(null)
    const size = useWindowDimensions()

    useEffect(() => {
        return () => {
            cancelAnimationFrame(raf.current)
        }
    }, [])

    const onReady = useCallback(
        (images) => {
            const loop = async () => {
                const nextImageTensor = images.next().value;
                // const predictions = await model.predict(nextImageTensor)
                // setPredictions(predictions)
                // raf.current = requestAnimationFrame(loop);

                const predictions = await startPrediction(model, nextImageTensor.expandDims(axis = 0));
                setPredictions(predictions);

                processImagePrediction(predictions)

                tf.dispose(nextImageTensor.expandDims(axis = 0));
                raf.current = requestAnimationFrame(loop);

                // console.log('predictions: ', predictions);
            }
            loop()
        }, [setPredictions]
    )

    const processImagePrediction = async (predictions) => {

        const highestPrediction = predictions.indexOf(
            Math.max.apply(null, predictions),
        );
        setClass(RESULT_MAPPING[highestPrediction]);
    };

    return useMemo(
        () => (
            <CustomTensorCamera
                width={size.width}
                style={styles.camera}
                type={Camera.Constants.Type.back}
                onReady={onReady}
                autorender
            />
        ), [onReady, size.width]
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    camera: {
        // flex: 1,
        zIndex: 0,
    },
    predictions: {
        flex: 1,
        backgroundColor: '#fff',
    }
})