import { View, Text, Image, Pressable, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { baseUrl, PURPLE } from "../lib/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { useVideoPlayer, VideoView } from "expo-video";
import Toast from "react-native-toast-message";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { markAsComplete } from "../utils/markAsCompleted";



const Content = ({ topic,setProgressPercentage }) => {
  const isVideo = topic.type === "video";
  const navigation = useNavigation();

  const player = useVideoPlayer(isVideo ? topic.video_url : null, (player) => {
    if (!player) return;
    player.loop = true;
    player.play();
  });

  useEffect(() => {
    if (!player || !isVideo || !topic) return;
    const interval = setInterval(() => {
      setProgressPercentage((player?.currentTime / player?.duration) * 100);

    
    }, 5 * 1000);
    return () => clearInterval(interval);
  }, [player]);

  if (isVideo && player) {
    return (
      <VideoView
        style={{ width: "100%", height: 260 }}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
        nativeControls
      />
    );
  }

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: 260,
      }}
    >
      <Pressable
        onPress={() => {
          navigation.navigate(
            `${topic.type === "quiz" ? "quiz_content" : "text_content"}`,
            { id: topic?.id }
          );
        }}
        style={({ pressed }) => [
          {
            backgroundColor: PURPLE,
            paddingHorizontal: 28,
            paddingVertical: 14,
            borderRadius: 12,

            transform: [{ scale: pressed ? 0.95 : 1 }],
          },
        ]}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 18,
            fontWeight: "700",
            letterSpacing: 0.5,
          }}
        >
          Open {topic.type}
        </Text>
      </Pressable>
    </View>
  );
};

const LearningScreen = ({ route }) => {
  const { slug } = route.params;
  const [learning, setLearning] = useState("");
  const [course, setCourse] = useState("");
  const [currentTopic, setCurrentTopic] = useState();
    const [progressPercentage, setProgressPercentage] = useState(0);


  const fetchLearning = async () => {
    try {
      const res = await fetch(`${baseUrl}/course/${slug}/learning`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${await AsyncStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setLearning(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectTopic = (topic, module) => {
    if (module.is_unlocked) setCurrentTopic(topic);
    else
      Toast.show({
        type: "error",
        text1: "Access denied",
        text2: module.unlock_message,
      });
  };

  const fetchCourseDetails = async () => {
    try {
      const res = await fetch(`${baseUrl}/course/${slug}/`);
      const data = await res.json();
      if (!res.ok) {
        return Toast.show({
          type: "error",
          text1: "Error",
          text2:
            data?.error ??
            data?.detail ??
            "Error while fetching course details",
        });
      }
      setCourse(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCourseDetails();
  }, [slug]);

   useFocusEffect(
     React.useCallback(() => {
       // Do something when the screen is focused
       fetchLearning();
       return () => {
         // Do something when the screen is unfocused
         // Useful for cleanup functions
       };
     }, [])
   );

  const topicBadge = (topic) => {
    const isCompleted = topic.is_completed;
    const badgeStyle = {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 12,
      backgroundColor: isCompleted ? "#1a1a1a" : "rgba(138, 43, 226, 0.15)",
      borderWidth: 1,
      borderColor: isCompleted ? "#2a2a2a" : "rgba(138, 43, 226, 0.3)",
      marginTop: 6,
      alignSelf: "flex-start",
    };

    const textStyle = {
      color: isCompleted ? "#666" : "#bb86fc",
      fontSize: 12,
      fontWeight: "500",
    };

    switch (topic.type) {
      case "video":
        return (
          <View style={badgeStyle}>
            <Feather
              name="play-circle"
              size={14}
              color={isCompleted ? "#666" : "#bb86fc"}
            />
            <Text style={textStyle}>Video Lesson</Text>
          </View>
        );

      case "text":
        return (
          <View style={badgeStyle}>
            <Feather
              name="file-text"
              size={14}
              color={isCompleted ? "#666" : "#bb86fc"}
            />
            <Text style={textStyle}>Reading</Text>
          </View>
        );
      case "quiz":
        return (
          <View style={badgeStyle}>
            <FontAwesome5
              name="brain"
              size={14}
              color={isCompleted ? "#666" : "#bb86fc"}
            />
            <Text style={textStyle}>Quiz</Text>
          </View>
        );

      default:
        return null;
    }
  };

  if (!course || !learning)
    return (
      <SafeAreaView
        style={{
          backgroundColor: "#0a0a0a",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#999", fontSize: 16 }}>Loading...</Text>
      </SafeAreaView>
    );

  return (
    <SafeAreaView style={{ backgroundColor: "#0a0a0a", height: "100%" }}>
      {/* Content Display Section */}
      <View
        style={{
          position: "relative",
          height: 260,
          marginBottom: 20,
          backgroundColor: "#1a1a1aff",
        }}
      >
        {currentTopic ? (
          <Content topic={currentTopic} setProgressPercentage={setProgressPercentage} />
        ) : (
          <Image
            source={{ uri: course?.image_url }}
            height={260}
            width={"100%"}
          />
        )}
      </View>

      <View style={{ paddingHorizontal: 20 }}>
        {currentTopic && learning && !currentTopic.is_completed && (currentTopic.type === "video"? progressPercentage>90: true) ? (
          <View
            style={{
              justifyContent: "flex-end",
              flexDirection: "row",
              width: "100%",
            }}
          >
            <Pressable
              onPress={() => {
                markAsComplete(currentTopic.id);
                fetchLearning();
              }}
              style={{
                backgroundColor: PURPLE,
                paddingHorizontal: 18,
                paddingVertical: 10,
                borderRadius: 8,
              }}
            >
              <Text style={{ color: "white", fontWeight: 700 }}>
                Mark as complete
              </Text>
            </Pressable>
          </View>
        ) : (
          learning.progress == 100 && (
            <View
              style={{
                justifyContent: "flex-end",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <Pressable
                onPress={() => {
                  markAsComplete(currentTopic.id);
                  fetchLearning();
                }}
                style={{
                  backgroundColor: "#198900ff",
                  paddingHorizontal: 18,
                  paddingVertical: 10,
                  borderRadius: 8,
                }}
              >
                <Text style={{ color: "white", fontWeight: 700 }}>
                  Get certificate
                </Text>
              </Pressable>
            </View>
          )
        )}

        {/* Course Header */}
        <View style={{ marginBottom: 30 }}>
          <Text
            style={{
              color: "#ffffff",
              fontSize: 28,
              fontWeight: "700",
              marginBottom: 8,
              lineHeight: 34,
            }}
          >
            {course.title}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              marginTop: 4,
            }}
          >
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: "#bb86fc",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#0a0a0a", fontWeight: "700" }}>
                {course?.author?.name?.charAt(0).toUpperCase() ?? "A"}
              </Text>
            </View>
            <Text
              style={{
                color: "#aaa",
                fontSize: 15,
                fontWeight: "500",
              }}
            >
              {course.author.name}
            </Text>
          </View>
        </View>

        {/* Section Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginBottom: 10,
            paddingBottom: 12,
            borderBottomWidth: 2,
            borderBottomColor: "#1a1a1a",
          }}
        >
          <Text
            style={{
              color: "#ffffff",
              fontSize: 20,
              fontWeight: "700",
            }}
          >
            Course Content
          </Text>
          <View
            style={{
              backgroundColor: "#bb86fc",
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderRadius: 12,
            }}
          >
            <Text
              style={{
                color: "#0a0a0a",
                fontSize: 12,
                fontWeight: "700",
              }}
            >
              {learning.modules.reduce(
                (acc, mod) => acc + mod.topics.length,
                0
              )}{" "}
              Lessons
            </Text>
          </View>
        </View>
      </View>
      <ScrollView style={{ flex: 1, paddingHorizontal: 20 }}>
        {/* Modules */}
        <View style={{ gap: 32 }}>
          {learning.modules.map((module, moduleIndex) => (
            <View key={module.id}>
              {/* Module Header */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 16,
                }}
              >
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    backgroundColor: "#1a1a1a",
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 2,
                    borderColor: "#2a2a2a",
                  }}
                >
                  <Text
                    style={{
                      color: "#bb86fc",
                      fontSize: 14,
                      fontWeight: "700",
                    }}
                  >
                    {moduleIndex + 1}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: "#fff",
                    flex: 1,
                  }}
                >
                  {module.title}
                </Text>
              </View>

              {/* Topics */}
              <View style={{ gap: 12 }}>
                {module.topics.map((topic, topicIndex) => (
                  <Pressable
                    onPress={() => handleSelectTopic(topic, module)}
                    key={topic.id}
                    style={{
                      backgroundColor: topic.is_completed
                        ? "#0f0f0f"
                        : "#1a1a1a",
                      borderRadius: 16,
                      padding: 16,
                      borderWidth: 1,
                      borderColor: topic.is_completed
                        ? "#1a1a1a"
                        : currentTopic && currentTopic.id === topic.id
                        ? PURPLE
                        : "#2a2a2a",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <View style={{ flex: 1, gap: 4 }}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <Text
                          style={{
                            color: "#666",
                            fontSize: 12,
                            fontWeight: "600",
                          }}
                        >
                          {moduleIndex + 1}.{topicIndex + 1}
                        </Text>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: "600",
                            color: topic.is_completed ? "#666" : "#ffffff",
                            flex: 1,
                          }}
                        >
                          {topic.title}
                        </Text>
                      </View>
                      {topicBadge(topic)}
                    </View>

                    {topic.is_completed ? (
                      <View
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 14,
                          backgroundColor: "#0f3d0f",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Feather
                          name="check"
                          size={16}
                          color="#4ade80"
                          strokeWidth={3}
                        />
                      </View>
                    ) : module?.is_unlocked ? (
                      <View
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 14,
                          borderWidth: 2,
                          borderColor: "#2a2a2a",
                        }}
                      />
                    ) : (
                      <View
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 14,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Feather
                          name="lock"
                          size={16}
                          color={PURPLE}
                          strokeWidth={3}
                        />
                      </View>
                    )}
                  </Pressable>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LearningScreen;
