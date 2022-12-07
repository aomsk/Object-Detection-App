import { Camera, CameraType } from 'expo-camera'
import * as tf from '@tensorflow/tfjs'
import { cameraWithTensors } from '@tensorflow/tfjs-react-native'
import labels from '../utils/labels.json'

import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'

const TensorCamera = cameraWithTensors(Camera)
let textureDims =
    Platform.OS == 'ios'
        ? { height: 2000, width: 1000 }
        : { height: 1200, width: 1600 }

const CameraView = ({ model, inputTensorSize }) => {
    const threshold = 0.25

    const [klassName, setKlassName] = useState('')

    const cameraStream = (images) => {
        const detectFrame = async () => {
            tf.engine().startScope()
            const input = tf.tidy(() => {
                return tf.image
                    .resizeBilinear(images.next().value, [
                        inputTensorSize[1],
                        inputTensorSize[2],
                    ])
                    .div(255.0)
                    .expandDims(0)
            })

            await model.executeAsync(input).then((res) => {
                const [boxes, scores, classes] = res.slice(0, 3)
                const boxes_data = boxes.dataSync()
                const scores_data = scores.dataSync()
                const classes_data = classes.dataSync()

                for (let i = 0; i < scores_data.length; ++i) {
                    if (scores_data[i] > threshold) {
                        const klass = labels[classes_data[i]]
                        const score = (scores_data[i] * 100).toFixed(1)

                        console.log('klass: ', [klass, score])
                        setKlassName(klass)
                    }
                }

                tf.dispose([res, input])
            })

            requestAnimationFrame(detectFrame) // get another frame
            tf.engine().endScope()
        }

        detectFrame()
    }

    return (
        <View style={styles.container}>
            <View>
                <TensorCamera
                    // Standard Camera props
                    style={{ zIndex: 0, width: 500, height: 500 }}
                    // Tensor related props
                    cameraTextureHeight={textureDims.height}
                    cameraTextureWidth={textureDims.width}
                    resizeHeight={inputTensorSize[1]}
                    resizeWidth={inputTensorSize[2]}
                    resizeDepth={inputTensorSize[3]}
                    onReady={cameraStream}
                    autorender={true}
                />
            </View>
            <View style={styles.predictionContainer}>
                <Text
                    style={{ fontSize: 35, color: 'red', fontWeight: 'bold' }}
                >
                    ClassName : {klassName}
                </Text>
            </View>
        </View>
    )
}

export default CameraView

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'black',
    },
    predictionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#494949',
    },
})
