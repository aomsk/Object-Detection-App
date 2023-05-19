import { View, Text } from "react-native";
import { useState } from "react";
import { Camera, CameraType } from "expo-camera";
import * as tf from "@tensorflow/tfjs";
import { cameraWithTensors } from "@tensorflow/tfjs-react-native";
import labels_Obstruction from '../labels/labels_Obstruction.json' // labels
import * as Speech from 'expo-speech'
import { i18n } from "../../language/i18n";
import { getLocales } from 'expo-localization';

const TensorCamera = cameraWithTensors(Camera);

const CameraObstructionView = ({ ctx, model, inputTensorSize, type, config }) => {
  const [className, setClassName] = useState('')

  // Check local language in device
  const deviceLanguage = getLocales()[0].languageCode;
  i18n.locale = deviceLanguage;
  i18n.enableFallback = true

  const cameraStream = (images) => {
    const detectFrame = async () => {
      tf.engine().startScope();
      const input = tf.tidy(() => {
        return tf.image
          .resizeBilinear(images.next().value, [inputTensorSize[1], inputTensorSize[2]])
          .div(255.0)
          .expandDims(0);
      });

      await model.executeAsync(input).then((res) => {
        const [boxes, scores, classes] = res.slice(0, 3);
        // const boxes_data = boxes.dataSync();
        const scores_data = scores.dataSync();
        const classes_data = classes.dataSync();

        for (let i = 0; i < scores_data.length; ++i) {
          if (scores_data[i] > config.threshold) {
            const klass = labels_Obstruction[classes_data[i]]
            const score = (scores_data[i] * 100).toFixed(1)

            console.log('Class: ', [klass, score])
            setClassName(klass)

            if (deviceLanguage === 'th' && Platform.OS === 'ios') {
              if (klass == 'billBoard') {
                Speech.speak('ป้ายโฆษณา',
                  {
                    language: 'th',
                  }
                );
              }
              if (klass == 'electric') {
                Speech.speak('เสาไฟฟ้า',
                  {
                    language: 'th',
                  }
                );
              }
              if (klass == 'sofa') {
                Speech.speak('โซฟา',
                  {
                    language: 'th',
                  }
                );
              }
              if (klass == 'table') {
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
            } // End if
          }
        }

        tf.dispose([res, input]);
      });

      requestAnimationFrame(detectFrame); // get another frame
    };

    detectFrame();
  };

  return (
    <>
      <TensorCamera
        // Standard Camera props
        className="w-full h-3/4"
        type={CameraType.back}

        // Tensor related props
        resizeHeight={inputTensorSize[1]}
        resizeWidth={inputTensorSize[2]}
        resizeDepth={inputTensorSize[3]}
        onReady={cameraStream}
        autorender={true}
      />
      <View className='flex-1 justify-center items-center'>
        <Text className='text-4xl text-red-600 font-bold text-center'>
          {i18n.t(className) !== '[missing "th." translation]' && i18n.t(className) !== '[missing "en." translation]' ? i18n.t(className) : null}
        </Text>
      </View>
    </>
  );
};

export default CameraObstructionView;