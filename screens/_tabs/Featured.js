import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CourseCard from "../../components/CourseCard";
import CourseList from "../../components/CourseList";

const Featured = () => {
  return (
    <View
      style={{
        backgroundColor: "black",
        height: "100%",
        paddingHorizontal: 16,
      }}
    >
      <ScrollView>
        {Array.from({ length: 6 }).map((_, i) => (
          <CourseList key={i} />
        ))}
      </ScrollView>
    </View>
  );
};

export default Featured;
