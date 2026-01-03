import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../lib/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";
import removeMarkdown from "markdown-to-text";
import { markAsComplete } from "../../utils/markAsCompleted";
import { useNavigation } from "@react-navigation/native";

const TextContent = ({ route }) => {
  const { id } = route.params;
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [fontSize, setFontSize] = useState(16);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${baseUrl}/content/${id}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${await AsyncStorage.getItem("token")}`,
        },
      });
      if (!res.ok) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Error while fetching content",
        });
      }
      const data = await res.json();
      console.log(data);
      setData(data);
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to load content",
      });
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchContent();
  }, [id]);
  
  const navigation = useNavigation()
  const increaseFontSize = () => {
    if (fontSize < 24) setFontSize(fontSize + 2);
  };

  const decreaseFontSize = () => {
    if (fontSize > 12) setFontSize(fontSize - 2);
  };

  if (loading) {
    return (
      <SafeAreaView
        style={{
          backgroundColor: "#0a0a0a",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#8b5cf6" />
      </SafeAreaView>
    );
  }

  if (!data) return null;

  const cleanText = removeMarkdown(data.text);
  const estimatedReadTime = Math.ceil(cleanText.split(" ").length / 200);


  return (
    <SafeAreaView style={{ backgroundColor: "#0a0a0a", flex: 1 }}>
      {/* Header */}
      <View
        style={{
          paddingHorizontal: 24,
          paddingVertical: 16,
          borderBottomWidth: 1,
          borderBottomColor: "#27272a",
          backgroundColor: "#0a0a0a",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: "#8b5cf6",
                fontSize: 12,
                fontWeight: "600",
                marginBottom: 4,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Reading Material
            </Text>
            <Text
              style={{
                color: "#ffffff",
                fontSize: 24,
                fontWeight: "bold",
                lineHeight: 30,
              }}
            >
              {data.title || "Content"}
            </Text>
          </View>
        </View>

        {/* Reading Info */}
        <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ color: "#71717a", fontSize: 13 }}>
              📖 {estimatedReadTime} min read
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ color: "#71717a", fontSize: 13 }}>
              📝 {cleanText.split(" ").length} words
            </Text>
          </View>
        </View>

        {/* Font Size Controls */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
            marginTop: 16,
            paddingTop: 16,
            borderTopWidth: 1,
            borderTopColor: "#27272a",
          }}
        >
          <Text style={{ color: "#a1a1aa", fontSize: 13, fontWeight: "500" }}>
            Text Size
          </Text>
          <View style={{ flexDirection: "row", gap: 8 }}>
            <Pressable
              onPress={decreaseFontSize}
              style={({ pressed }) => ({
                backgroundColor: "#18181b",
                borderWidth: 1,
                borderColor: "#27272a",
                borderRadius: 8,
                paddingHorizontal: 16,
                paddingVertical: 8,
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <Text
                style={{ color: "#ffffff", fontSize: 16, fontWeight: "600" }}
              >
                A-
              </Text>
            </Pressable>
            <Pressable
              onPress={increaseFontSize}
              style={({ pressed }) => ({
                backgroundColor: "#18181b",
                borderWidth: 1,
                borderColor: "#27272a",
                borderRadius: 8,
                paddingHorizontal: 16,
                paddingVertical: 8,
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <Text
                style={{ color: "#ffffff", fontSize: 16, fontWeight: "600" }}
              >
                A+
              </Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* Content */}
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 10,
          paddingVertical: 10,
          minHeight: "78%",
          justifyContent: "space-between",
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            backgroundColor: "#18181b",
            borderRadius: 20,
            padding: 20,
            borderWidth: 1,
            minHeight: "85%",

            borderColor: "#27272a",
          }}
        >
          <Text
            style={{
              color: "#e4e4e7",
              fontSize: fontSize,
              lineHeight: fontSize * 1.7,
              letterSpacing: 0.2,
            }}
          >
            {cleanText}
          </Text>
        </View>

        <Pressable
          onPress={() => {
            markAsComplete(data.id)
            if(navigation.canGoBack())
            navigation.goBack()
          }}
          style={({ pressed }) => ({
            backgroundColor: "#8b5cf6",
            borderRadius: 16,
            paddingVertical: 18,
            alignItems: "center",
            opacity: pressed ? 0.9 : 1,
            shadowColor: "#8b5cf6",
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.3,
            shadowRadius: 16,
            elevation: 8,
          })}
        >
          <Text
            style={{
              color: "#ffffff",
              fontSize: 18,
              fontWeight: "bold",
              letterSpacing: 0.5,
            }}
          >
            Mark as completed
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TextContent;
