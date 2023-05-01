export const DEVICE_LANGUAGE = "DEVICE_LANGUAGE";

export const checkDeviceLanguage = (device_lang) => {
  return { type: DEVICE_LANGUAGE, device_lang: device_lang };
}