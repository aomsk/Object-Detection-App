import * as tf from '@tensorflow/tfjs';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';
import { useEffect, useRef, useState } from 'react';

export function useTensorFlowModel(modelJson, modelWeights) {
    const [model, setModel] = useState(null)

    const isMounted = useRef(true)

    useEffect(() => {
        isMounted.current = true
        return () => (isMounted.current = false)
    }, [])

    useEffect(() => {
        async function getModel() {
            setModel(null)
            await tf.ready();
            await tf.loadLayersModel(bundleResourceIO(modelJson, modelWeights)).then((model) => {
                if (isMounted.current) {
                    setModel(model)
                }
            });
        }
        getModel()
    }, [modelJson, modelWeights])

    return(model)
}

export function useTensorFlowLoaded() {
    const [isLoaded, setLoaded] = useState(false)

    useEffect(() => {
        let isMounted = true
        tf.ready().then(() => {
            if (isMounted) {
                setLoaded(true)
            }
        });
        return () => (isMounted = false)
    }, [])

    return isLoaded;
}

export const startPrediction = async (model, tensor) => {
    try {
        // predict against the model
        const output = await model.predict(tensor, {batchSize: 1});
        // return typed array
        return output.dataSync();
    } catch (error) {
        console.log('Error predicting from tesor image', error);
        throw error;
    }
};