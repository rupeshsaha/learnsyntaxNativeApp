import { View, Text, Pressable, ScrollView, Animated } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { baseUrl } from "../../lib/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";

const QuizQuestions = ({ route }) => {
  const id = 25;
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState({});
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const currentQuestion = questions[currentQuestionIndex];
  const progress =
    questions.length > 0
      ? ((currentQuestionIndex + 1) / questions.length) * 100
      : 0;

  const fetchQuestions = async () => {
    try {
      const res = await fetch(`${baseUrl}/quiz/${id}/details/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${await AsyncStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (data.error) {
        Toast.show({ type: "error", text1: "Error", text2: data.error });
      } else {
        console.log(data)
        setQuestions(data.questions || []);
        setSelectedOption(answers[0] || null);
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to load questions",
      });
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    setSelectedOption(answers[currentQuestionIndex] || null);
  }, [currentQuestionIndex]);

  const handleNext = () => {
    if (selectedOption !== null) {
      setAnswers({ ...answers,  [questions[currentQuestionIndex].id]: selectedOption  });

      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      });
    }
  };

  const handlePrevious = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
      }
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleSubmit = async () => {
    
    // required body format

// answers: [
//   { question_id: 63, answer: "Voluptate quia dicta" },
//   { question_id: 64, answer: "Beatae Nam et dolore" },
// ];
// attempt_id: 72;
// duration_seconds: 0;


    if (selectedOption !== null) {
      setAnswers({
        ...answers,
        [questions[currentQuestionIndex].id]: selectedOption,
      });

      const answersArray = Object.entries(answers).map(
        ([question_id, answer]) => ({
          question_id: Number(question_id),
          answer,
        })
      );



      try {
        const res = await fetch(`${baseUrl}/quiz/${id}/submit/`,
          {
            method: "POST",
            headers: {
              "Authorization": `Token ${await AsyncStorage.getItem("token")}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              attempt_id: 71,
              duration_seconds: 0,
              answers:answersArray

            })
          }
        )
        const data = await res.json();
        if (!res.ok) {
           Toast.show({
             type: "error",
             text1: "Oops!",
             text2: data.error ?? "Error while submitting the quiz",
           });
        }
        // console.log(data);

      } catch (error) {
        console.log(error)
        Toast.show({
          type: "error",
          text1: "Oops!",
          text2: "Error while submitting the quiz",
        });
      }
      
    }
  };

  if (!currentQuestion) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f9fa" }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <Text style={{ fontSize: 18, color: "#6c757d", textAlign: "center" }}>
            Loading questions...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f9fa" }}>
      <View style={{ flex: 1 }}>
        {/* Header with Progress */}
        <View
          style={{
            backgroundColor: "#ffffff",
            paddingHorizontal: 20,
            paddingVertical: 16,
            borderBottomWidth: 1,
            borderBottomColor: "#e9ecef",
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
            <Text style={{ fontSize: 14, fontWeight: "600", color: "#495057" }}>
              Question {currentQuestionIndex + 1} of {questions.length}
            </Text>
            <Text style={{ fontSize: 14, fontWeight: "600", color: "#6366f1" }}>
              {Math.round(progress)}%
            </Text>
          </View>

          {/* Progress Bar */}
          <View
            style={{
              height: 6,
              backgroundColor: "#e9ecef",
              borderRadius: 3,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                height: "100%",
                width: `${progress}%`,
                backgroundColor: "#6366f1",
                borderRadius: 3,
              }}
            />
          </View>
        </View>

        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20 }}>
          <Animated.View style={{ opacity: fadeAnim }}>
            {/* Question Card */}
            <View
              style={{
                backgroundColor: "#ffffff",
                borderRadius: 16,
                padding: 24,
                marginBottom: 24,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 2,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "700",
                  color: "#212529",
                  lineHeight: 28,
                  marginBottom: 8,
                }}
              >
                {currentQuestion.question_text}
              </Text>

              {currentQuestion.points && (
                <View
                  style={{
                    backgroundColor: "#f0f9ff",
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 20,
                    alignSelf: "flex-start",
                    marginTop: 8,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "600",
                      color: "#0284c7",
                    }}
                  >
                    {currentQuestion.points} points
                  </Text>
                </View>
              )}
            </View>

            {/* Options */}
            <View style={{ gap: 12 }}>
              {currentQuestion.options.map((option, optionIndex) => {
                const isSelected = selectedOption === option.text;

                return (
                  <Pressable
                    key={optionIndex}
                    onPress={() => setSelectedOption(option.text)}
                    style={({ pressed }) => ({
                      backgroundColor: isSelected ? "#eef2ff" : "#ffffff",
                      borderRadius: 12,
                      padding: 18,
                      borderWidth: 2,
                      borderColor: isSelected ? "#6366f1" : "#e9ecef",
                      opacity: pressed ? 0.7 : 1,
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.03,
                      shadowRadius: 4,
                      elevation: 1,
                    })}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      {/* Radio Button */}
                      <View
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: 12,
                          borderWidth: 2,
                          borderColor: isSelected ? "#6366f1" : "#cbd5e1",
                          marginRight: 12,
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: isSelected
                            ? "#6366f1"
                            : "transparent",
                        }}
                      >
                        {isSelected && (
                          <View
                            style={{
                              width: 8,
                              height: 8,
                              borderRadius: 4,
                              backgroundColor: "#ffffff",
                            }}
                          />
                        )}
                      </View>

                      {/* Option Text */}
                      <Text
                        style={{
                          flex: 1,
                          fontSize: 16,
                          fontWeight: isSelected ? "600" : "400",
                          color: isSelected ? "#4f46e5" : "#495057",
                          lineHeight: 22,
                        }}
                      >
                        {option.text}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </Animated.View>
        </ScrollView>

        {/* Bottom Navigation */}
        <View
          style={{
            backgroundColor: "#ffffff",
            paddingHorizontal: 20,
            paddingVertical: 16,
            borderTopWidth: 1,
            borderTopColor: "#e9ecef",
            gap: 12,
          }}
        >
          <View style={{ flexDirection: "row", gap: 12 }}>
            {currentQuestionIndex > 0 && (
              <Pressable
                onPress={handlePrevious}
                style={({ pressed }) => ({
                  flex: 1,
                  backgroundColor: "#ffffff",
                  borderWidth: 2,
                  borderColor: "#e9ecef",
                  borderRadius: 12,
                  paddingVertical: 16,
                  alignItems: "center",
                  opacity: pressed ? 0.7 : 1,
                })}
              >
                <Text
                  style={{ fontSize: 16, fontWeight: "600", color: "#495057" }}
                >
                  Previous
                </Text>
              </Pressable>
            )}

            <Pressable
              onPress={isLastQuestion ? handleSubmit : handleNext}
              disabled={selectedOption === null}
              style={({ pressed }) => ({
                flex: 1,
                backgroundColor:
                  selectedOption === null ? "#cbd5e1" : "#6366f1",
                borderRadius: 12,
                paddingVertical: 16,
                alignItems: "center",
                opacity: pressed ? 0.8 : 1,
              })}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: selectedOption === null ? "#64748b" : "#ffffff",
                }}
              >
                {isLastQuestion ? "Submit Quiz" : "Next Question"}
              </Text>
            </Pressable>
          </View>

          {selectedOption === null && (
            <Text
              style={{
                fontSize: 13,
                color: "#6c757d",
                textAlign: "center",
              }}
            >
              Please select an answer to continue
            </Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default QuizQuestions;
