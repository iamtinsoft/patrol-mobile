import Constants from "expo-constants";

const settings = {
  dev: {
    apiUrl: "https://server-fayaz.tinsoft.tech/api",
  },
  staging: {
    apiUrl: "https://server-fayaz.tinsoft.tech/api",
  },
  prod: {
    apiUrl: "https://server-fayaz.tinsoft.tech/api",
  },
};
export const ServerUrl = "https://server-fayaz.tinsoft.tech/";
const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;
  return settings.prod;
};

export default getCurrentSettings();
