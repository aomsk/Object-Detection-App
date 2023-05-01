import { Text, View, useWindowDimensions, LogBox } from 'react-native'
import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { loadMoneyModel } from '../LoadModel/LoadMoneyModel' // Load Model
import * as tf from '@tensorflow/tfjs' // TensorFlow
import '@tensorflow/tfjs-react-native' // TensorFlow
import CameraMoneyView from '../Camera/CameraMoneyView' // Camera
import { GLView } from "expo-gl";
import Expo2DContext from "expo-2d-context";
import { i18n } from "../../language/i18n"; // Language

export default function MoneyDetectScreen() {
  const [model, setModel] = useState(null);
  const [inputTensor, setInputTensor] = useState([]);
  const [ctx, setCTX] = useState(null);

  // model configuration
  const configurations = { threshold: 0.25 };

  useEffect(() => {
    tf.ready()
    async function setUpModel() {
      tf.ready().then(() => {
        loadMoneyModel().then(async (loadedModel) => {
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
    <View className="flex-1 items-center justify-center bg-white">
      <>
        {model ?
          <View className="flex-1 w-full h-full">
            <View className="flex-1 w-full h-full z-0 items-center bg-gray-500">
              <CameraMoneyView
                model={model}
                inputTensorSize={inputTensor}
                config={configurations}
              />
            </View>
            {/* ใส่เพื่อกัน Android error */}
            <View className="absolute z-80 left-0 top-0 w-full h-full flex items-center bg-transparent">
              <GLView
                className="w-full h-full"
                onContextCreate={async (gl) => {
                  const ctx2d = new Expo2DContext(gl);
                  await ctx2d.initializeText();
                  setCTX(ctx2d);
                }}
              />
            </View>
            {/* end */}
          </View>
          :
          <Text className='text-4xl'>{i18n.t("loadingMoney")}</Text>
        }
      </>
      <StatusBar style="auto" />
    </View>
  )
}