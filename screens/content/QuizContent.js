import {
  Pressable,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { baseUrl } from "../../lib/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const QuizContent = ({ route }) => {
  const { id } = route.params;
  const [content, setContent] = useState();
  const [quizData,setQuizData] = useState()
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

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
      console.log("contentdata",data)
      setContent(data.quiz[0]);
    } catch (error) {
      console.log("err",error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to load quiz",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchQuizDetails = async () => {
    setLoading(true)
    try {
      
    const res = await fetch(`${baseUrl}/quiz/${content.id}/details/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${await AsyncStorage.getItem("token")}`,
      },
    });
      const data = await res.json();
      console.log("quizdata",data)
     setQuizData(data)
   } catch (error) {
    console.log("error",error)
   } finally {
     setLoading(false)
   }
  }

  const scorePercentage = quizData &&  quizData.best_score ? (quizData.best_score / 100) * 100 : 0;
 

 

    useFocusEffect(
         React.useCallback(() => {
           // Do something when the screen is focused
           fetchContent();
           content.id && fetchQuizDetails();
           return () => {
             // Do something when the screen is unfocused
             // Useful for cleanup functions
           };
         }, [id])
       );

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

  if (!content || !quizData) {
    return (
      <SafeAreaView>
        <Text>No data found</Text>
      </SafeAreaView>
    );
  }

  if (content && quizData) {
  

    return (
      <SafeAreaView style={{ backgroundColor: "#0a0a0a", flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 20 }}
        >
          {/* Header Section */}
          <View style={{ marginBottom: 32 }}>
            <Text
              style={{
                color: "#8b5cf6",
                fontSize: 14,
                fontWeight: "600",
                marginBottom: 8,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Quiz Challenge
            </Text>
            <Text
              style={{
                color: "#ffffff",
                fontSize: 32,
                fontWeight: "bold",
                marginBottom: 12,
                lineHeight: 38,
              }}
            >
              {content.title}
            </Text>
            <Text style={{ color: "#a1a1aa", fontSize: 16, lineHeight: 24 }}>
              {content.description}
            </Text>
          </View>

          {/* Score Card */}
          <View
            style={{
              backgroundColor: "#18181b",
              borderRadius: 20,
              padding: 24,
              marginBottom: 24,
              borderWidth: 1,
              borderColor: "#27272a",
            }}
          >
            <Text
              style={{
                color: "#a1a1aa",
                fontSize: 14,
                marginBottom: 12,
                fontWeight: "500",
              }}
            >
              YOUR BEST SCORE
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "baseline",
                marginBottom: 16,
              }}
            >
              <Text
                style={{ color: "#ffffff", fontSize: 48, fontWeight: "bold" }}
              >
                {quizData?.best_score ?? 0}
              </Text>
              <Text style={{ color: "#8b5cf6", fontSize: 24, marginLeft: 4 }}>
                pts
              </Text>
            </View>

            {/* Progress Bar */}
            <View
              style={{
                height: 8,
                backgroundColor: "#27272a",
                borderRadius: 4,
                overflow: "hidden",
                marginBottom: 8,
              }}
            >
              <View
                style={{
                  height: "100%",
                  width: `${scorePercentage}%`,
                  backgroundColor: "#8b5cf6",
                  borderRadius: 4,
                }}
              />
            </View>
            <Text style={{ color: "#71717a", fontSize: 12 }}>
              Passing score: {content.passing_score} pts
            </Text>
          </View>

          {/* Info Cards Grid */}
          <View style={{ flexDirection: "row", gap: 12, marginBottom: 32 }}>
            <View
              style={{
                flex: 1,
                backgroundColor: "#18181b",
                borderRadius: 16,
                padding: 20,
                borderWidth: 1,
                borderColor: "#27272a",
              }}
            >
              <Text
                style={{
                  color: "#a1a1aa",
                  fontSize: 12,
                  marginBottom: 8,
                  fontWeight: "500",
                }}
              >
                TIME LIMIT
              </Text>
              <Text
                style={{ color: "#ffffff", fontSize: 28, fontWeight: "bold" }}
              >
                {content.time_limit ?? 0}
              </Text>
              <Text style={{ color: "#71717a", fontSize: 14, marginTop: 4 }}>
                minutes
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                backgroundColor: "#18181b",
                borderRadius: 16,
                padding: 20,
                borderWidth: 1,
                borderColor: "#27272a",
              }}
            >
              <Text
                style={{
                  color: "#a1a1aa",
                  fontSize: 12,
                  marginBottom: 8,
                  fontWeight: "500",
                }}
              >
                ATTEMPTS
              </Text>
              <Text
                style={{ color: "#ffffff", fontSize: 28, fontWeight: "bold" }}
              >
                {content.attempts_allowed}
              </Text>
              <Text style={{ color: "#71717a", fontSize: 14, marginTop: 4 }}>
                allowed
              </Text>
            </View>
          </View>

          {/* Start Button */}
          <Pressable
            onPress={() => navigation.navigate("quiz_questions", { id: quizData?.id })}
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
              Start Quiz
            </Text>
          </Pressable>

          {/* Tips Section */}
          <View
            style={{
              marginTop: 32,
              padding: 20,
              backgroundColor: "#18181b",
              borderRadius: 16,
              borderLeftWidth: 4,
              borderLeftColor: "#8b5cf6",
            }}
          >
            <Text
              style={{
                color: "#ffffff",
                fontSize: 16,
                fontWeight: "600",
                marginBottom: 12,
              }}
            >
              💡 Quick Tips
            </Text>
            <Text style={{ color: "#a1a1aa", fontSize: 14, lineHeight: 22 }}>
              • Read each question carefully before answering{"\n"}• You can
              review your answers before submitting{"\n"}• Keep track of time to
              complete all questions
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
};

export default QuizContent;
