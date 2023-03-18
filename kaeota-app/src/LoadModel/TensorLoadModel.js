import { loadGraphModel } from "@tensorflow/tfjs-converter";
import { bundleResourceIO } from "@tensorflow/tfjs-react-native";

//model path

//load graph model
export const loadModel = async (modelJson, modelWeights) => {
    const loadedModel = await loadGraphModel(bundleResourceIO(modelJson, modelWeights));
    return loadedModel;
}