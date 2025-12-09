import { View, Text, Pressable } from "react-native";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { PURPLE } from "../lib/constants";
import { useNavigation } from "@react-navigation/native";

const Cirriculum = ({ modules }) => {

    const navigation = useNavigation()
  useEffect(() => {
    //  auto-open the first section
    setOpenSections((prev) => ({
      ...prev,
      [modules?.[0]?.id]: true,
    }));
  }, [modules]);
  const [openSections, setOpenSections] = useState({});

  const getLessonIcon = (lessonType) => {
    switch (lessonType) {
      case "video":
        return <FontAwesome5 name="video" size={18} color={PURPLE} />;
      case "text":
        return <FontAwesome5 name="file-alt" size={18} color={PURPLE} />;
    }
  };

  const toggleSection = (id) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
    };
    
    const handleContentOpen = (content) => {
        if (content.content_type === "video") {
            navigation.navigate("course_video", {content})
        }
    }

  return (
    <View style={{ gap: 16, paddingHorizontal: 8, paddingVertical: 20 }}>
      <Text
        style={{
          color: "#FFFFFF",
          fontWeight: "700",
          fontSize: 22,
          letterSpacing: 0.3,
        }}
      >
        Curriculum
      </Text>

      <Text style={{ color: "#B0B0B0", fontSize: 13, fontWeight: "500" }}>
        32 sections • 251 lectures • 32h 5m total length
      </Text>

      <View style={{ gap: 8, marginTop: 8 }}>
        {modules?.map((module) => (
          <View
            key={module.id}
            style={{
              backgroundColor: "#1A1A1A",
              borderRadius: 10,
              overflow: "hidden",
              borderWidth: 1,
              borderColor: "#2A2A2A",
            }}
          >
            <Pressable
              onPress={() => toggleSection(module.id)}
              style={({ pressed }) => ({
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 16,
                backgroundColor: pressed ? "#222222" : "transparent",
              })}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 16,
                  fontWeight: "600",
                  flex: 1,
                  paddingRight: 12,
                }}
              >
                {module.title}
              </Text>
              <View
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: "#2A2A2A",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {openSections[module.id] ? (
                  <AntDesign name="minus" size={16} color="#FFFFFF" />
                ) : (
                  <AntDesign name="plus" size={16} color="#FFFFFF" />
                )}
              </View>
            </Pressable>

            {openSections[module.id] && (
              <View style={{ paddingBottom: 8 }}>
                {module.contents.map((content, idx) => (
                    <Pressable
                        onPress={()=>handleContentOpen(content)}
                    key={idx}
                    style={{
                      paddingVertical: 12,
                      paddingHorizontal: 16,
                      borderTopWidth: 1,
                      borderTopColor: "#2A2A2A",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        flex: 1,
                        gap: 12,
                      }}
                    >
                      <View style={{ minWidth: 32 }}>
                        <Text
                          style={{
                            color: "#888888",
                            fontSize: 13,
                            fontWeight: "500",
                          }}
                        >
                          {content.id}
                        </Text>
                      </View>
                      <Text
                        style={{
                          color: "#E0E0E0",
                          fontSize: 14,
                          fontWeight: "500",
                          flex: 1,
                        }}
                      >
                        {content.title}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 12,
                      }}
                    >
                      {getLessonIcon(content.content_type)}
                      {!content.is_free && (
                        <FontAwesome5 name="lock" size={16} color="#888888" />
                      )}
                    </View>
                  </Pressable>
                ))}
              </View>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

export default Cirriculum;
