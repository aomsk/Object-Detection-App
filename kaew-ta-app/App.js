import { Camera } from 'expo-camera';
import { StyleSheet, Button, View } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { LoadingView } from './src/utils/LoadingView';
import StackNavigation from './src/Navigation/StackNavigation'; // Navigation
import { Provider } from 'react-redux'; // Redux
import { createStore, combineReducers } from 'redux'; // Redux
import DeviceLanguageReducer from './store/reducers/DeviceLanguageReducer';
import { getLocales } from 'expo-localization'; // Expo Localization
import { i18n } from "../kaew-ta-app/language/i18n"; // Language

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
