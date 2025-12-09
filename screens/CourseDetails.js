import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { createContext, useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { baseUrl, PURPLE } from "../lib/constants";
import Rating from "../components/Rating";
import { CartContext } from "../App";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import Cirriculum from "../components/Cirriculum";

const CourseDetails = ({ route }) => {
  const { id } = route.params;
  const navigation = useNavigation();

  const levelIcons = {
    beginner: <FontAwesome5 name="seedling" size={14} color="white" />,
    intermediate: <FontAwesome5 name="leaf" size={14} color="white" />,
    advanced: <FontAwesome5 name="tree" size={14} color="white" />,
  };

  const [existsInCart, setExistsInCart] = useState(false);
  const [course, setCourse] = useState();

  const fetchCourseDetails = async () => {
    try {
      const res = await fetch(`${baseUrl}/course/${id}/`);
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
  }, []);



 

  const { addItem, items } = useContext(CartContext);

  useEffect(() => {
    alreadyExistsInCart();
  }, [items]);

  const alreadyExistsInCart = () => {
    const exists = items.find((item) => item.id === course.id);
    if (exists) setExistsInCart(true);
  };

  if (!course)
    return (
      <View
        style={{
          backgroundColor: "black",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );

  return (
    <SafeAreaView
      style={{
        backgroundColor: "black",
        height: "100%",
        paddingHorizontal: 10,
        flex: 1,
      }}
    >
      <ScrollView contentContainerStyle={{ gap: 10, paddingBottom: 40 }}>
        <View style={{width:"100%", justifyContent:"center", alignItems:"center"}}>

        <Image
          source={{
            uri: course.image_url,
          }}
          height={240}
          width={"95%"}
          
          style={{ borderRadius: 10 }}
          />
          </View>
        <Text style={{ color: "white", fontSize: 22 }}>{course.title}</Text>
        <Text style={{ color: "white", fontSize: 16 }}>
          {course.description}
        </Text>

        {/* Ratings */}
        <Rating
          ratingValue={course.average_rating}
          reviewCount={course.review_count}
        />

        {/* Features */}

        <View style={{ marginTop: 16, gap: 8 }}>
          

          <View style={{ flexDirection: "row", gap: 6, alignItems: "center" }}>
            <AntDesign name="global" size={14} color="white" />
            <Text style={{ color: "white", fontSize: 14 }}>
              {course?.language}
            </Text>
          </View>

          <View style={{ flexDirection: "row", gap: 6, alignItems: "center" }}>
            {levelIcons[course?.author?.name] || null}

            <Text style={{ color: "white", fontSize: 14 }}>{course.level}</Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <Text
            style={{
              color: "white",
              fontSize: 22,
              fontWeight: 700,
              marginVertical: 10,
            }}
          >
            ₹{course.discount_price}
          </Text>
          <Text
            style={{
              color: "#a2a2a2ff",
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 10,
              textDecorationLine: "line-through",
            }}
          >
            ₹{course.price}
          </Text>
        </View>

        <View style={{ gap: 12 }}>
          <View
            style={{
              backgroundColor: PURPLE,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: 600, fontSize: 18, color: "white" }}>
              Buy Now
            </Text>
          </View>

          <View style={{ gap: 6, flexDirection: "row", maxWidth: "100%" }}>
            {!existsInCart ? (
              <Pressable
                onPress={() => addItem(course)}
                style={{
                  borderWidth: 2,
                  borderColor: "white",
                  height: 50,
                  width: "49%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white", fontSize: 16 }}>
                  Add to Cart
                </Text>
              </Pressable>
            ) : (
              <Pressable
                onPress={() => navigation.navigate("Cart")}
                style={{
                  borderWidth: 2,
                  borderColor: "white",
                  height: 50,
                  width: "49%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white", fontSize: 16 }}>Go to Cart</Text>
              </Pressable>
            )}

            <View
              style={{
                borderWidth: 2,
                borderColor: "white",
                height: 50,
                width: "49%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontSize: 16 }}>
                Add to wishlist
              </Text>
            </View>
          </View>
        </View>

        <Cirriculum modules={course?.modules}/>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CourseDetails;
