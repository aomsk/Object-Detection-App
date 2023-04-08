import { DEVICE_LANGUAGE } from "../actions/DeviceLanguageAction";

const initialState = {
  device_lang: null
}

const DeviceLanguageReducer = (state = initialState, action) => {
  switch (action.type) {
    case DEVICE_LANGUAGE:
      return { device_lang: action.device_lang }
    default:
      return state
  };
};

export default DeviceLanguageReducer;