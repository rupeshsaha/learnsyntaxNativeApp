import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo, Feather } from "@expo/vector-icons";

const MyLearning = () => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: "black",
        paddingHorizontal: 20,
        height: "100%",
        gap: 20,
      }}
    >
      {/* <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ color: "white", fontSize: 22 }}>My courses</Text>
        <View style={{ flexDirection: "row", gap: 20 }}>
          <Entypo name="magnifying-glass" size={26} color="white" />

          <Feather name="shopping-cart" size={26} color="white" />
        </View>
      </View> */}

      <ScrollView contentContainerStyle={{ gap: 18 }}>
        <Text style={{ fontWeight: 700, fontSize: 20, color: "white" }}>
          My courses
        </Text>
        {Array.from({ length: 12 }).map((_, i) => (
          <View key={i} style={{ flexDirection: "row", gap: 8 }}>
            <Image
              source={{ uri: "https://picsum.photos/seed/CS101/300/160" }}
              height={60}
              width={60}
              style={{ borderRadius: 10 }}
            />
            <View>
              <Text style={{ color: "white", fontWeight: 600, fontSize: 14 }}>
                C++ Tutorial for begginers
              </Text>
              <Text style={{ color: "white", fontWeight: 300, fontSize: 11 }}>
                John Purcell
              </Text>
              <View></View>
              <Text style={{ color: "white", fontWeight: 200, fontSize: 14 }}>
                34% complete
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyLearning;
