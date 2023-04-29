import { Camera } from 'expo-camera';
import { StyleSheet, Button, View } from 'react-native';
import { StatusBar } from "expo-status-bar";

import { LoadingView } from './src/utils/LoadingView';

//import Navigation
import StackNavigation from './src/Navigation/StackNavigation';

// Store State with Redux
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import DeviceLanguageReducer from './store/reducers/DeviceLanguageReducer';

// Expo Localization
import { getLocales } from 'expo-localization';

// Redux
import { useSelector, useDispatch } from "react-redux";
import { checkDeviceLanguage } from "../kaew-ta-app/store/actions/DeviceLanguageAction";

// I18n
import { i18n } from "../kaew-ta-app/language/i18n";

// useSelector
// import { useSelector } from "react-redux";

const rootReducer = combineReducers({
  deviceLangRoot: DeviceLanguageReducer
  
});

const store = createStore(rootReducer);

export default function App() {

  const deviceLanguage = getLocales()[0].languageCode;

  // Set the locale once at the beginning of your app.
  i18n.locale = deviceLanguage;

  // When a value is missing from a language it'll fall back to another language with the key present.
  i18n.enableFallback = true;

  // const dispacth = useDispatch();
  // dispacth(checkDeviceLanguage(deviceLanguage));

  // const deviceLanguage_store = useSelector((state) => state.deviceLangRoot.device_lang)
  // console.log('deviceLanguage_in_store: ', deviceLanguage_store);


  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission?.granted) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <LoadingView message={i18n.t("homecameraPermis")}>
          <Button
            title={i18n.t("btnGrantPermis")}
            onPress={requestPermission}
          ></Button>
        </LoadingView>
      </View>
    );
  }

  const textCameraPermission = i18n.t("homecameraPermis")
  const btnGrantPermission = i18n.t("btnGrantPermis")
  console.log('textCameraPermission: ', textCameraPermission);
  console.log('buttonGrantPermission: ', btnGrantPermission);

  console.log('permission: ', permission);

  return (
    <Provider store={store}>
      <StackNavigation />
    </Provider>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
