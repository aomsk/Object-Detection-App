import { NativeModules } from 'react-native'
import { Platform, } from "react-native";

export const CheckLanguages = () => {

    // ios:
    const locale_lang_ios = NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0]

    // Android:
    const locale_lang_android = NativeModules.I18nManager.localeIdentifier

    if (Platform.OS === 'ios') {
        console.log('locale_lang_ios: ', locale_lang_ios);
        return locale_lang_ios
    }
    if (Platform.OS === 'android') {
        console.log('locale_lang_android: ', locale_lang_android);
        return locale_lang_android
    }
}