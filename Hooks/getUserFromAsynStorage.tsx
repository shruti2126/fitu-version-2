/** @format */
import AsyncStorage from "@react-native-async-storage/async-storage";
export const getUserFromAsyncStorage = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("user");
    console.log(jsonValue);
    return jsonValue !== null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    console.log("there was an error = ", e);
  }
};
