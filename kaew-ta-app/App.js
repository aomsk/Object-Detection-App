import { Camera } from 'expo-camera';
import { StatusBar } from "expo-status-bar";
import { LoadingView } from './src/components/LoadingView';
import StackNavigation from './src/Navigation/StackNavigation'; // Navigation
import { Provider } from 'react-redux'; // Redux
import { createStore, combineReducers } from 'redux'; // Redux
import DeviceLanguageReducer from './store/reducers/DeviceLanguageReducer';
import { getLocales } from 'expo-localization'; // Expo Localization
import { i18n } from "../kaew-ta-app/language/i18n"; // Language
import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Speech from 'expo-speech'

const rootReducer = combineReducers({
  deviceLangRoot: DeviceLanguageReducer
});
const store = createStore(rootReducer);

SplashScreen.preventAutoHideAsync();

export default function App() {
  const deviceLanguage = getLocales()[0].languageCode;
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [appIsReady, setAppIsReady] = useState(false);

  // Set the locale once at the beginning of your app.
  i18n.locale = deviceLanguage;
  // When a value is missing from a language it'll fall back to another language with the key present.
  i18n.enableFallback = true;

  useEffect(() => {
    async function prepare() {
      try {
        const { status } = await Camera.getCameraPermissionsAsync();
        console.log('status: ', status);
        if (!permission?.granted) {
          requestPermission()
        }

        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  if (!permission?.granted) {
    // Speech.speak(i18n.t("cameraPermission"), { language: deviceLanguage, })
    return
    // return (
    //   <View className='flex-1 bg-white items-center justify-center'>
    //     <StatusBar style="auto" />
    //     <LoadingView message={i18n.t("cameraPermission")} />
    //   </View>
    // );
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <StatusBar hidden="auto" />
      <Provider store={store}>
        {permission?.granted && <StackNavigation />}
      </Provider>
    </View>
  );

}