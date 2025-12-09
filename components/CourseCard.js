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
        onPress={() => navigation.navigate("Course details", { id: course.id })}
      >
        <Image
          source={{ uri: course.image_url }}
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
      <Text style={{ color: "white", fontSize: 12 }}>{course?.author?.name}</Text>
        <Rating ratingValue={course.average_rating} reviewCount={course.review_count}/>
      <View style={{flexDirection:"row", gap:8, alignItems:"center"}}>
        
      <Text style={{ fontWeight: 700, fontSize: 16, color: "white" }}>
        ₹{course.discount_price}
      </Text>
      <Text style={{ fontWeight: 400, fontSize: 14, color: "rgba(176, 176, 176, 1)" ,textDecorationLine:"line-through"}}>
        ₹{course.price}
      </Text>
    </View>
    </View>
  );
};

export default CourseCard;
