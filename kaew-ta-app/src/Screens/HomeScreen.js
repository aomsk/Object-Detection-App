import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import React from "react";
import { getLocales } from "expo-localization"; // Expo Localization
import { useSelector, useDispatch } from "react-redux"; // Redux
import { checkDeviceLanguage } from "../../store/actions/DeviceLanguageAction";
import { i18n } from "../../language/i18n"; // I18n

export default function HomeScreen({ navigation }) {
  const deviceLanguage = getLocales()[0].languageCode;

  // Set the locale once at the beginning of your app.
  i18n.locale = deviceLanguage;
  // When a value is missing from a language it'll fall back to another language with the key present.
  i18n.enableFallback = true;

  // Redux
  const dispacth = useDispatch();
  dispacth(checkDeviceLanguage(deviceLanguage));
  const deviceLanguage_store = useSelector(
    (state) => state.deviceLangRoot.device_lang
  );
  console.log("deviceLanguage_in_store: ", deviceLanguage_store);

  return (
    <View className="flex-1 bg-white">
      <Text className="text-5xl text-center m-10">{i18n.t("mainMenu")}</Text>
      <View className="flex-1 flex-col items-center">
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Obstruction")}
          accessible={true} // optional, this is the default
          // accessibilityLabel={"Obstruction Detection button"} // overrides child content
          // accessibilityTraits={"Obstruction Detection button"} // only works in ios
          // accessibilityComponentType={"Obstruction Detection button"} // only works in android
          accessibilityHint={i18n.t("taptwicetoactivate")}
        // accessibilityState={{ selected: true }}
        >
          <Text style={styles.textButton}>{i18n.t("obstruction")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Object")}
          accessible={true} // optional, this is the default
          // accessibilityLabel={"Object Detection button"} // overrides child content
          // accessibilityTraits={"Object Detection button"} // only works in ios
          // accessibilityComponentType={"Object Detection button"} // only works in android
          accessibilityHint={i18n.t("taptwicetoactivate")}
        // accessibilityState={{ selected: true }}
        >
          <Text style={styles.textButton}>{i18n.t("object")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Money")}
          accessible={true} // optional, this is the default
          // accessibilityLabel={"Money Detection button"} // overrides child content
          // accessibilityTraits={"Money Detection button"} // only works in ios
          // accessibilityComponentType={"Money Detection button"} // only works in android
          accessibilityHint={i18n.t("taptwicetoactivate")}
        // accessibilityState={{ selected: true }}
        >
          <Text style={styles.textButton}>{i18n.t("money")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: "#fff",
  },
  buttonContainer: {
    flex: 1,
    // backgroundColor: 'pink',
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    backgroundColor: "orange",
    borderRadius: 20,
    margin: 10,
    width: 350,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  textButton: {
    fontSize: 25,
  },
});
