import * as SecureStore from "expo-secure-store";
import JWT from 'expo-jwt';
const key = "authToken";
const otpkey = "otpToken";


const storeToken = async (authToken) => {
  try {
    await SecureStore.setItemAsync(key, authToken);

  } catch (error) {
    console.log("Error storing the auth token", error);
  }
};

const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.log("Error getting the auth token", error);
  }
};



const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log("Error removing the auth token", error);
  }
};

const getUser = async () => {
  const token = await getToken();
  return token ? JWT.decode(token, '@Hidemyass2') : null;
};

export default { getToken, getUser, removeToken, storeToken };
