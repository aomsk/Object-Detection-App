import { loadGraphModel } from "@tensorflow/tfjs";
import { bundleResourceIO } from "@tensorflow/tfjs-react-native";

// model path
const modelJson = require('../../assets/model/obstruction_model/model.json')
const modelWeights = [
  require('../../assets/model/obstruction_model/group1-shard1of7.bin'),
  require('../../assets/model/obstruction_model/group1-shard2of7.bin'),
  require('../../assets/model/obstruction_model/group1-shard3of7.bin'),
  require('../../assets/model/obstruction_model/group1-shard4of7.bin'),
  require('../../assets/model/obstruction_model/group1-shard5of7.bin'),
  require('../../assets/model/obstruction_model/group1-shard6of7.bin'),
  require('../../assets/model/obstruction_model/group1-shard7of7.bin'),
]

export const loadObstructionModel = async () => {
  const loadedModel = await loadGraphModel(bundleResourceIO(modelJson, modelWeights));
  return loadedModel;
};
