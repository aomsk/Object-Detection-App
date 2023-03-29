import { StyleSheet, Text, View, useWindowDimensions, NativeModules } from 'react-native'
import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'

//Load Model
import { loadModel } from '../LoadModel/TensorLoadModel'

//TensorFlow
import * as tf from '@tensorflow/tfjs'
import '@tensorflow/tfjs-react-native'

//Camera
import { Camera } from 'expo-camera'
import { cameraWithTensors } from '@tensorflow/tfjs-react-native'

//Lables
import labels_Obstruction from '../utils/labels_Obstruction.json'

//Speech
import * as Speech from 'expo-speech'

//Global Styles
import global, { globalStyles } from '../../styles/global';

export default function ObstructionDetectScreen() {
    const modelJson = require('../../assets/model/obstruction_web_model/model.json')
    const modelWeights = [
        require('../../assets/model/obstruction_web_model/group1-shard1of7.bin'),
        require('../../assets/model/obstruction_web_model/group1-shard2of7.bin'),
        require('../../assets/model/obstruction_web_model/group1-shard3of7.bin'),
        require('../../assets/model/obstruction_web_model/group1-shard4of7.bin'),
        require('../../assets/model/obstruction_web_model/group1-shard5of7.bin'),
        require('../../assets/model/obstruction_web_model/group1-shard6of7.bin'),
        require('../../assets/model/obstruction_web_model/group1-shard7of7.bin'),
    ]

    const [model, setModel] = useState(null)
    const [inputTensor, setInputTensor] = useState([])

    // model configuration
    const configurations = { threshold: 0.25 }

    useEffect(() => {
        async function setUpModel() {
            tf.ready().then(() => {
                loadModel(modelJson, modelWeights).then(async (loadedModel) => {
                    // warming up model
                    const dummyInput = tf.ones(loadedModel.inputs[0].shape)
                    console.log('dummyInput: ', dummyInput)

                    await loadedModel.executeAsync(dummyInput)
                    tf.dispose(dummyInput)

                    // set state
                    setInputTensor(loadedModel.inputs[0].shape)
                    setModel(loadedModel)
                })
            })
        }
        setUpModel()
    }, [])

    return (
        <View style={globalStyles.container}>
            <View>
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
                    <Text>Loading Obstruction Model...</Text>
                )}
            </View>
            <StatusBar style="auto" />
        </View>
    )
}

// Check local language of mobile
// iOS:
const locale_lang_ios = NativeModules.SettingsManager.settings.AppleLocale ||
    NativeModules.SettingsManager.settings.AppleLanguages[0]
console.log('locale_lang_ios: ', locale_lang_ios);

// Android:
const locale_lang_android = NativeModules.I18nManager.localeIdentifier
console.log('locale_lang_android: ', locale_lang_android);

const TensorCamera = cameraWithTensors(Camera)
let textureDims =
    Platform.OS == 'ios'
        ? { height: 2000, width: 1000 }
        : { height: 1200, width: 1600 }

const CameraView = ({ model, inputTensorSize }) => {
    const threshold = 0.25

    const size = useWindowDimensions();
    // console.log('size: ', size);

    const [klassName, setKlassName] = useState('')

    const cameraStream = (images) => {
        const detectFrame = async () => {
            tf.engine().startScope()
            const input = tf.tidy(() => {
                return tf.image.resizeBilinear(images.next().value, [inputTensorSize[1], inputTensorSize[2]])
                    .div(255.0)
                    .expandDims(0)
            })

            await model.executeAsync(input).then((res) => {
                const [boxes, scores, classes] = res.slice(0, 3)
                const boxes_data = boxes.dataSync() //ขนาด
                const scores_data = scores.dataSync() //ค่าความเป็นไปได้
                const classes_data = classes.dataSync() //ข้อมูล Class

                for (let i = 0; i < scores_data.length; ++i) {
                    if (scores_data[i] > threshold) {
                        const klass = labels_Obstruction[classes_data[i]]
                        const score = (scores_data[i] * 100).toFixed(1)

                        console.log('Class: ', [klass, score])
                        setKlassName(klass)

                        if (Platform.OS === 'ios') {
                            if (locale_lang_ios.slice(0, 2) === 'th') {
                                if (klass == 'BillBoard') {
                                    Speech.speak('ป้ายโฆษณา',
                                        {
                                            language: 'th',
                                        }
                                    );
                                }
                                if (klass == 'Electric') {
                                    Speech.speak('เสาไฟฟ้า',
                                        {
                                            language: 'th',
                                        }
                                    );
                                }
                                if (klass == 'Sofa') {
                                    Speech.speak('โซฟา',
                                        {
                                            language: 'th',
                                        }
                                    );
                                }
                                if (klass == 'Table') {
                                    Speech.speak('โต๊ะ',
                                        {
                                            language: 'th',
                                        }
                                    );
                                }
                            }
                            else {
                                Speech.speak(klass,
                                    {
                                        language: 'en',
                                    }
                                );
                            }
                        }
                        if (Platform.OS === 'android') {
                            if (locale_lang_android.slice(0, 2) === 'th') {
                                if (klass == 'BillBoard') {
                                    Speech.speak('ป้ายโฆษณา',
                                        {
                                            language: 'th',
                                        }
                                    );
                                }
                                if (klass == 'Electric') {
                                    Speech.speak('เสาไฟฟ้า',
                                        {
                                            language: 'th',
                                        }
                                    );
                                }
                                if (klass == 'Sofa') {
                                    Speech.speak('โซฟา',
                                        {
                                            language: 'th',
                                        }
                                    );
                                }
                                if (klass == 'Table') {
                                    Speech.speak('โต๊ะ',
                                        {
                                            language: 'th',
                                        }
                                    );
                                }
                            }
                            else {
                                Speech.speak(klass,
                                    {
                                        language: 'en',
                                    }
                                );
                            }
                        }
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
        <View>
            <View style={{ flex: 2 }}>
                <TensorCamera
                    // Standard Camera props
                    width={size.width}
                    height={size.height}
                    style={{ zIndex: 0 }}
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
            <View style={globalStyles.predictionContainer}>
                <Text style={{ fontSize: 30, color: 'red', fontWeight: 'bold' }}>
                    ClassName : {klassName}
                </Text>
            </View>
        </View>
    )
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#fff',
//     },
//     predictionContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#494949',
//     },
// })
