import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseUrl } from "../lib/constants";
import Toast from "react-native-toast-message";

export const markAsComplete = async (topicId) => {
  try {
    const res = await fetch(`${baseUrl}/content/${topicId}/complete/`, {
      method: "POST",
      headers: {
        Authorization: `Token ${await AsyncStorage.getItem("token")}`,
      },
    });

    if (res.ok) {
      Toast.show({
        type: "success",
        text1: "Completed",
        text2: "Topic completed successfully",
      });
    }
  } catch (error) {
    console.log(error);
  }
};