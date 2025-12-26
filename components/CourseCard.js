import { View, Text, Image, Pressable, TouchableHighlight } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Rating from "./Rating";
import { PURPLE } from "../lib/constants";
import {Feather} from "@expo/vector-icons"

const CourseCard = ({ course }) => {
  const navigation = useNavigation();

  const handlePress = () =>
    navigation.navigate("Course details", { slug: course.slug });

  return (
    <View
      style={{
        gap: 10,
        backgroundColor: "#1a1a1a",
        borderRadius: 12,
        overflow: "hidden",
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      }}
    >
      <Pressable
      onPress={handlePress}
      >
        <Image
          source={{ uri: course.image_url }}
          style={{ height: 200, width: "100%", backgroundColor: "#2a2a2a" }}
          resizeMode="cover"
        />
      </Pressable>

      <View style={{ paddingHorizontal: 14, paddingBottom: 16, gap: 8 }}>
        <View>
          <Text
            style={{
              fontWeight: "700",
              fontSize: 16,
              color: "#ffffff",
              lineHeight: 22,
            }}
            numberOfLines={2}
          >
            {course.title}
          </Text>
        </View>

        <Text style={{ color: "#a0a0a0", fontSize: 13, marginTop: -2 }}>
          {course?.author?.name}
        </Text>

        <Rating
          ratingValue={course.average_rating}
          reviewCount={course.review_count}
        />

        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "baseline",
            marginTop: 4,
          }}
        >
          <Text style={{ fontWeight: "700", fontSize: 20, color: "#ffffff" }}>
            ₹{course.discount_price}
          </Text>
          <Text
            style={{
              fontWeight: "400",
              fontSize: 15,
              color: "#888888",
              textDecorationLine: "line-through",
            }}
          >
            ₹{course.price}
          </Text>
        </View>
       
          <Pressable
            onPress={handlePress}
            style={{
              backgroundColor: PURPLE,
              paddingVertical: 10,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              flexDirection: "row",
              gap: 10,
            }}
          >
            <Text style={{ fontSize: 18, color: "white", fontWeight: 600 }}>
              View Details
            </Text>
            <Feather name="arrow-right" size={24} color="white" />
          </Pressable>
      </View>
    </View>
  );
};

export default CourseCard;
