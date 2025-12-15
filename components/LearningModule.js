import { View, Text } from 'react-native'
import React from 'react'

const LearningModule = () => {
  return (
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
                          color: `${module?.is_unlocked ? "#fff" : "#3b3b3bff"}`,
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
                          onPress={()=>handleSelectTopic(topic,module)}
                          key={topic.id}
                          style={{
                            backgroundColor: topic.is_completed
                              ? "#0f0f0f"
                              : "#1a1a1a",
                            borderRadius: 16,
                            padding: 16,
                            borderWidth: 1,
                            borderColor: topic.is_completed ? "#1a1a1a" : currentTopic.id===topic.id ? PURPLE:"#2a2a2a",
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
  )
}

export default LearningModule