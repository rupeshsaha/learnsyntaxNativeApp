import { WebView } from "react-native-webview";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Checkout({ route }) {
  const { uri } = route.params
  return (
    <SafeAreaView style={styles.container}>
      

    <WebView
      source={{ uri }}
      />
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
