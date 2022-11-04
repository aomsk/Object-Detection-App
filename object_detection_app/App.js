// import React from 'react'
// import { StyleSheet, Text, View, Image } from 'react-native'
// import * as tf from '@tensorflow/tfjs'
// import { fetch, decodeJpeg, bundleResourceIO } from '@tensorflow/tfjs-react-native';
// import { cameraWithTensors } from '@tensorflow/tfjs-react-native';
// import { Camera, CameraType } from 'expo-camera';
// import * as mobilenet from '@tensorflow-models/mobilenet'

// const weights = './model/cat-dog_web_model/model.json';

// const names = ['cat', 'dog']

// class App extends React.Component {

//     state = {
//         isTfReady: false,
//         isModelReady: false,
//         prediction: null,
//         model: null
//     }

//     handleCameraStream(images) {
//         const loop = async () => {
//             const nextImageTensor = images.next().value;
//             requestAnimationFrame(loop)
//             // const model = this.state.model
//             // if (!this.state.model || !nextImageTensor)
//             //     throw new Error('No model or image tensor');
//             // model.detect(nextImageTensor[0]).then((prediction) => {
//             //     console.log('prediction : ', prediction);
//             // })
//         }
//         loop()
//     }

//     // async loadModel() {
//     //     const modelJson = require('./model/cat-dog_web_model/model.json');
//     //     const modelWeights_1 = require('./model/cat-dog_web_model/group1-shard1of7.bin');
//     //     const modelWeights_2 = require('./model/cat-dog_web_model/group1-shard2of7.bin');
//     //     const modelWeights_3 = require('./model/cat-dog_web_model/group1-shard3of7.bin');
//     //     const modelWeights_4 = require('./model/cat-dog_web_model/group1-shard4of7.bin');
//     //     const modelWeights_5 = require('./model/cat-dog_web_model/group1-shard5of7.bin');
//     //     const modelWeights_6 = require('./model/cat-dog_web_model/group1-shard6of7.bin');
//     //     const modelWeights_7 = require('./model/cat-dog_web_model/group1-shard7of7.bin');

//     //     await tf.ready();

//     //     const model = await tf.loadGraphModel(bundleResourceIO(modelJson, [modelWeights_1, modelWeights_2, modelWeights_3, modelWeights_4, modelWeights_5, modelWeights_6, modelWeights_7]));

//     //     this.setState({
//     //         isModelReady: true,
//     //         model: model
//     //     })
//     //     console.log('Model is ready : ', this.state.isModelReady)
//     // }

//     async componentDidMount() {
//         await tf.ready()
//         this.setState({
//             isTfReady: true
//         })
        // this.loadModel()

        // this.model = await mobilenet.load()
        // this.setState({
        //     isModelReady: true,
        // })

//         //Output in Expo console
//         console.log('TfReady : ', this.state.isTfReady)

//         // await tf.loadGraphModel(weights).then(model => {
//         //     this.setState({
//         //         model: model
//         //     })
//         //     console.log('Model is ready : ', this.state.isModelReady)
//         // })
//         const modelJson = require('./model/cat-dog_web_model/model.json');
//         const modelWeights_1 = require('./model/cat-dog_web_model/group1-shard1of7.bin');
//         const modelWeights_2 = require('./model/cat-dog_web_model/group1-shard2of7.bin');
//         const modelWeights_3 = require('./model/cat-dog_web_model/group1-shard3of7.bin');
//         const modelWeights_4 = require('./model/cat-dog_web_model/group1-shard4of7.bin');
//         const modelWeights_5 = require('./model/cat-dog_web_model/group1-shard5of7.bin');
//         const modelWeights_6 = require('./model/cat-dog_web_model/group1-shard6of7.bin');
//         const modelWeights_7 = require('./model/cat-dog_web_model/group1-shard7of7.bin');

//         await tf.ready();

//         const model = await tf.loadGraphModel(bundleResourceIO(modelJson, [modelWeights_1, modelWeights_2, modelWeights_3, modelWeights_4, modelWeights_5, modelWeights_6, modelWeights_7]));
//         this.setState({
//             isModelReady: true,
//             model: model
//         })
//         console.log('Model is ready : ', this.state.isModelReady)
        
//         const imageUri = 'https://images.squarespace-cdn.com/content/v1/5ac696982714e5ccacc1f762/1527021991006-7PVUSIH7M5DWKGKPH7V1/cat+image+1.jpg';
//         const response = await fetch(imageUri, {}, { isBinary: true })
//         const rawImageData = await response.arrayBuffer()
//         const imageData = new Uint8Array(rawImageData)

//         const imageTensor = decodeJpeg(imageData);
//         console.log('imageTensor: ', imageTensor)

//         const predictions = await model.predict(imageTensor)
//         console.log('predictions: ', predictions);

//         // var peopleImage = require('./test/people.jpg');
//         // try {
//         // const imageAssetPath = Image.resolveAssetSource(peopleImage)
//         // console.log('imageAssetPath: ', imageAssetPath);
//         // const response = await fetch(imageAssetPath.uri, {}, { isBinary: true })

//         // const imageUri = 'https://images.squarespace-cdn.com/content/v1/5ac696982714e5ccacc1f762/1527021991006-7PVUSIH7M5DWKGKPH7V1/cat+image+1.jpg';
//         // const response = await fetch(imageUri, {}, { isBinary: true })
//         // const rawImageData = await response.arrayBuffer()
//         // const imageData = new Uint8Array(rawImageData)

//         // const imageTensor = decodeJpeg(imageData);
//         // console.log('imageTensor: ', imageTensor);

//         // const predictions = await this.model.classify(imageTensor)
//         // console.log('predictions: ', predictions);

//         //     const prediction = await model.predict(imageTensor);
//         //     console.log(prediction)
//         // } catch (error) {
//         //     console.log(error)
//         // }

//         // const modelJson = require('./model/cat-dog_web_model/model.json');
//         // const modelWeights_1 = require('./model/cat-dog_web_model/group1-shard1of7.bin');
//         // const modelWeights_2 = require('./model/cat-dog_web_model/group1-shard2of7.bin');
//         // const modelWeights_3 = require('./model/cat-dog_web_model/group1-shard3of7.bin');
//         // const modelWeights_4 = require('./model/cat-dog_web_model/group1-shard4of7.bin');
//         // const modelWeights_5 = require('./model/cat-dog_web_model/group1-shard5of7.bin');
//         // const modelWeights_6 = require('./model/cat-dog_web_model/group1-shard6of7.bin');
//         // const modelWeights_7 = require('./model/cat-dog_web_model/group1-shard7of7.bin');

//         // await tf.ready();

//         // const model = await tf.loadGraphModel(bundleResourceIO(modelJson, [modelWeights_1, modelWeights_2, modelWeights_3, modelWeights_4, modelWeights_5, modelWeights_6, modelWeights_7]));

//         // this.setState({
//         //     isModelReady: true,
//         //     model
//         // })
//         // console.log('Model is ready : ', this.state.isModelReady);

//         // Load an image from the web
//         // const imageUri = 'https://images.squarespace-cdn.com/content/v1/5ac696982714e5ccacc1f762/1527021991006-7PVUSIH7M5DWKGKPH7V1/cat+image+1.jpg';
//         // const response = await fetch(imageUri, {}, { isBinary: true });
//         // const imageDataArrayBuffer = await response.arrayBuffer();
//         // const imageData = new Uint8Array(imageDataArrayBuffer);

//         // Decode image data to a tensor
//         // const imageTensor = decodeJpeg(imageData);

//         // const prediction = (await model.predict(imageTensor))[0];
//         // console.log('prediction: ', prediction);

//         // this.setState({
//         //     prediction
//         // })
//     }

//     render() {
//         const TensorCamera = cameraWithTensors(Camera)
//         let textureDims = Platform.OS == 'ios' ? { height: 1920, width: 1000 } : { height: 1200, width: 1600 }
//         return (
            // <View style={styles.container}>
            //     <Text>TFJS ready? : {this.state.isTfReady ? <Text>Yes</Text> : ''}</Text>
            //     <Text>Model ready? : {this.state.isModelReady ? <Text>Yes</Text> : <Text>Loading Model...</Text>}</Text>
            //     <Text>Prediction : {this.state.prediction}</Text>
            // </View>
//             <View style={styles.container}>
//                 <TensorCamera style={styles.camera}
//                     type={Camera.Constants.Type.back}
//                     cameraTextureHeight={textureDims.height}
//                     cameraTextureWidth={textureDims.width}
//                     resizeHeight={200}
//                     resizeWidth={152}
//                     resizeDepth={3}
//                     onReady={this.handleCameraStream}
//                     autorender={true}
//                     useCustomShadersToResize={false}
//                 />
//             </View>
//         )
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center'
//     },
//     camera: {
//         flex: 3,
//     },
// })

// export default App


// -----------------------------------------------------------
import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();

    if (!permission) {
        // Camera permissions are still loading
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    return (
        <View style={styles.container}>
            <Camera style={styles.camera} type={type}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                        <Text style={styles.text}>Flip Camera</Text>
                    </TouchableOpacity>
                </View>
            </Camera>
            <View style={styles.menuContainer}>
                <TouchableOpacity
                    style={styles.roundButton1}
                    onPress={() => Alert.alert('Alert Object Detection')}
                    accessible={true} // optional, this is the default
                    accessibilityLabel={'Objects Button'} // overrides child content
                    accessibilityTraits={'button'} // only works in ios
                    accessibilityComponentType={'button'} // only works in android
                >
                    <Text>Objects</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        flex: 3,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
    },
    menuContainer: {
        flex: 1,
        backgroundColor: 'gray'
    },
    roundButton1: {
        margin: 20,
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        backgroundColor: '#ccc',
    }
});