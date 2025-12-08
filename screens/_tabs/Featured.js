import { View, Text, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CourseCard from "../../components/CourseCard";
import CourseList from "../../components/CourseList";
import { baseUrl } from "../../lib/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Featured = () => {

  const [categories, setCategories] = useState("")

   const fetchCategories = async () => {
     try {
       const res = await fetch(`${baseUrl}/category/`, {
         headers: {
           "Authorization" : `Token ${await AsyncStorage.getItem("token")}`
         }
       });
       if (!res.ok) {
         return console.log("Error while fetching category")
        }
        const data = await res.json();
       setCategories(data);
     } catch (error) {
       console.log(error)
     }
  };
  
  useEffect(() => {
    fetchCategories();
  },[])
  return (
    <View
      style={{
        backgroundColor: "black",
        height: "100%",
        paddingHorizontal: 16,
      }}
    >
      <ScrollView>
        <CourseList headingTitle={"Recommended for you"}/>
        <CourseList headingTitle={"Popular for Full Stack Web Developers"} />
        {categories && categories.slice(0,2).map((category, i) => (
          <CourseList key={i} category={category} />
        ))}
        <CourseList headingTitle={"Short and sweet courses for you"} />
        <CourseList headingTitle={"Trending courses"} />
        {categories && categories.slice(3,5).map((category, i) => (
          <CourseList key={i} category={category} />
        ))}

      </ScrollView>
    </View>
  );
};

export default Featured;
