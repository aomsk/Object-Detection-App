import { Camera } from 'expo-camera';
import { View, Button, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { LoadingView } from './src/components/LoadingView';
import StackNavigation from './src/Navigation/StackNavigation'; // Navigation
import { Provider } from 'react-redux'; // Redux
import { createStore, combineReducers } from 'redux'; // Redux
import DeviceLanguageReducer from './store/reducers/DeviceLanguageReducer';
import { getLocales } from 'expo-localization'; // Expo Localization
import { i18n } from "../kaew-ta-app/language/i18n"; // Language
import { useEffect } from 'react';

const rootReducer = combineReducers({
  deviceLangRoot: DeviceLanguageReducer
});
const store = createStore(rootReducer);

export default function App() {
  const deviceLanguage = getLocales()[0].languageCode;
  const [permission, requestPermission] = Camera.useCameraPermissions();

  // Set the locale once at the beginning of your app.
  i18n.locale = deviceLanguage;
  // When a value is missing from a language it'll fall back to another language with the key present.
  i18n.enableFallback = true;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.getCameraPermissionsAsync();
      console.log('status: ', status);
      if (!permission?.granted) {
        requestPermission()
      }
      // if (status === 'granted') {
      //   return <View />
      // }
    })()
  }, []);

  if (!permission?.granted) {
    return (
      <View className='flex-1 bg-white items-center justify-center'>
        <StatusBar style="auto" />
        <LoadingView message={i18n.t("cameraPermission")} />
      </View>
    );
  }

  return (
    <Provider store={store}>
      {permission?.granted && <StackNavigation />}
    </Provider>
  );

}