import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import Rating from "./Rating";

const CourseCard = ({ course }) => {
  const navigation = useNavigation()
  return (
    <View style={{ gap: 6 }}>
      <Pressable
        onPress={() => navigation.navigate("Course details", { data: course })}
      >
        <Image
          source={{ uri: course.image }}
          height={150}
          width={230}
          style={{ borderRadius: 10 }}
        />
      </Pressable>
      <Text
        onPress={() => navigation.navigate("Course details", { data: course })}
        style={{ fontWeight: 700, fontSize: 15, color: "white" }}
      >
        {course.title}
      </Text>
      <Text style={{ color: "white", fontSize: 12 }}>{course.level}</Text>
        <Rating ratingValue={4.5}/>
    
      <Text style={{ fontWeight: 700, fontSize: 16, color: "white" }}>
        ₹{course.price}
      </Text>
    </View>
  );
};

export default CourseCard;
