import { WebView } from "react-native-webview";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

export default function Checkout({ route }) {
  const { uri } = route.params
  const navigation = useNavigation()
   const handleNavChange = (navState) => {
     const { url } = navState;

     // hard stop, no guessing
     if (url.includes("status=success")) {
  navigation.reset({
    index: 0,
    routes: [
      {
        name: "main",
        params: { screen: "My Learning" },
      },
    ],
  });     }

     if (url.includes("status=failure")) {
       navigation.goBack();
       Toast.show({type:"error", text1:"Payment Failed"})
     }
   };
  return (
    <SafeAreaView style={styles.container}>
      

    <WebView
        source={{ uri }}
        onNavigationStateChange={handleNavChange}
      />
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
