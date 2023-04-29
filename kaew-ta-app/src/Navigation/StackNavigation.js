import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

//import screens
import HomeScreen from '../Screens/HomeScreen'
import ObstructionDetectScreen from '../Screens/ObstructionDetectScreen'
import ObjectDetectScreen from '../Screens/ObjectDetectScreen'
import MoneyDetectScreen from '../Screens/MoneyDetectScreen'

// // Expo Localization
import { getLocales } from 'expo-localization';

// // Redux
import { useSelector, useDispatch } from "react-redux";
import { checkDeviceLanguage } from "../../store/actions/DeviceLanguageAction";

// // I18n
import { i18n } from "../../language/i18n";

const StackNavigation = () => {
//     // Check local language in device
//     const deviceLanguage = getLocales()[0].languageCode;

//   // Set the locale once at the beginning of your app.
//   i18n.locale = deviceLanguage;

//   // When a value is missing from a language it'll fall back to another language with the key present.
//   i18n.enableFallback = true

//   const dispacth = useDispatch();
//   dispacth(checkDeviceLanguage(deviceLanguage));

//   const deviceLanguage_store = useSelector((state) => state.deviceLangRoot.device_lang)
//   console.log('deviceLanguage_in_store: ', deviceLanguage_store);

    const Stack = createNativeStackNavigator()
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Obstruction" component={ObstructionDetectScreen} />
                <Stack.Screen name="Object" component={ObjectDetectScreen} />
                <Stack.Screen name="Money" component={MoneyDetectScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigation
