import { Text, View, useWindowDimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar'

// Load Model
import { loadModel } from '../LoadModel/TensorLoadModel';

// TensorFlow
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';

// Camera
import { Camera } from 'expo-camera';
import { cameraWithTensors } from '@tensorflow/tfjs-react-native';

// Lables
import labels_Money from '../utils/labels_Money.json';

// Speech
import * as Speech from 'expo-speech';

// Global Styles
import { globalStyles } from '../../styles/global';

// I18n
import { i18n } from "../../language/i18n";

// useSelector
import { useSelector } from "react-redux";

export default function MoneyDetectScreen() {

  const modelJson = require('../../assets/model/money_web_model/model.json')
  const modelWeights = [
    require('../../assets/model/money_web_model/group1-shard1of7.bin'),
    require('../../assets/model/money_web_model/group1-shard2of7.bin'),
    require('../../assets/model/money_web_model/group1-shard3of7.bin'),
    require('../../assets/model/money_web_model/group1-shard4of7.bin'),
    require('../../assets/model/money_web_model/group1-shard5of7.bin'),
    require('../../assets/model/money_web_model/group1-shard6of7.bin'),
    require('../../assets/model/money_web_model/group1-shard7of7.bin'),
  ]

  const [model, setModel] = useState(null);
  const [inputTensor, setInputTensor] = useState([]);

  // model configuration
  const configurations = { threshold: 0.25 };

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
          <Text>Loading Money Model...</Text>
        )}
      </View>
      <StatusBar style="auto" />
    </View>
  )
}

const TensorCamera = cameraWithTensors(Camera)
let textureDims =
  Platform.OS == 'ios'
    ? { height: 2000, width: 1000 }
    : { height: 1200, width: 1600 }

const CameraView = ({ model, inputTensorSize }) => {

  // Check local language in device
  const deviceLanguage = useSelector((state) => state.deviceLangRoot.device_lang)

  // Set the locale once at the beginning of your app.
  i18n.locale = deviceLanguage;

  // When a value is missing from a language it'll fall back to another language with the key present.
  i18n.enableFallback = true

  const threshold = 0.25

  const [klassName, setKlassName] = useState('')
  const size = useWindowDimensions();
  // console.log('size: ', size);

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
            const klass = labels_Money[classes_data[i]]
            const score = (scores_data[i] * 100).toFixed(1)

            console.log('Class: ', [klass, score])
            setKlassName(klass)

            if (deviceLanguage === 'th') {
              if (klass == 'twentyBaht') {
                Speech.speak('ธนบัตรยี่สิบบาท',
                  {
                    language: 'th',
                  }
                );
              }
              if (klass == 'fiftyBaht') {
                Speech.speak('ธนบัตรห้าสิบบาท',
                  {
                    language: 'th',
                  }
                );
              }
              if (klass == 'oneHundredBaht') {
                Speech.speak('ธนบัตรหนึ่งร้อยบาท',
                  {
                    language: 'th',
                  }
                );
              }
              if (klass == 'fiveHundredBaht') {
                Speech.speak('ธนบัตรห้าร้อยบาท',
                  {
                    language: 'th',
                  }
                );
              }
              if (klass == 'oneThousandBaht') {
                Speech.speak('ธนบัตรหนึ่งพันบาท',
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
            } // End if
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
          {/* ClassName : {klassName} */}
          {/* {i18n.t(klassName)} */}
          {/* {i18n.t(klassName) !== '[missing "th." translation]' ? i18n.t(klassName) : null} */}
          {i18n.t(klassName) !== '[missing "th." translation]' && i18n.t(klassName) !== '[missing "en." translation]' ? i18n.t(klassName) : null}
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