import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";

import CourseList from "../../components/CourseList";
import { baseUrl, PURPLE } from "../../lib/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

const Featured = () => {
  const [categories, setCategories] = useState("");
  const [selectedCategory, setSelecedCategory] = useState("all");
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState();
  const [searchQuery, setSearchQuery] = useState("")
  
    const fetchCourses = async () => {
     try {
       const res = await fetch(`${baseUrl}/course/?search=${searchQuery}`)
       const data = await res.json();
       setCourses(data)
       setFilteredCourses(data)
     } catch (error) {
      console.log(error)
     }
    }
  
    // useEffect(() => {
    //   fetchCourses()
    // }, [searchQuery]);
  
   useFocusEffect(
       React.useCallback(() => {
         // Do something when the screen is focused
         fetchCourses();
         return () => {
           // Do something when the screen is unfocused
           // Useful for cleanup functions
         };
       }, [searchQuery])
     );
  
  

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${baseUrl}/category/`, {});
      if (!res.ok) {
        return console.log("Error while fetching category");
      }
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectedCategoryChange = (category) => {
    setSelecedCategory(category?.toLowerCase())
    const filteredCourses = category!=="all"  ? courses?.filter((course) => course?.category?.slug.toLowerCase() == category?.toLowerCase()): courses
    setFilteredCourses(filteredCourses);
  }

  

  const isSelectedCategory = (category) => {
    return selectedCategory === category?.toLowerCase() ? PURPLE : "white";
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <SafeAreaView
      style={{
        backgroundColor: "black",
        height: "100%",
        paddingHorizontal: 16,
      }}
    >
      <ScrollView>
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={{
            borderColor: "white",
            marginVertical: 10,
            height: 60,
            fontSize: 16,
            paddingHorizontal: 10,
            borderWidth: 2,
            borderRadius: 99,
            color: "white",
          }}
          placeholder="Search courses"
          placeholderTextColor={"white"}
        />
        <ScrollView
          horizontal
          contentContainerStyle={{ gap: 10, paddingVertical: 22 }}
        >
          <Pressable
            onPress={() => handleSelectedCategoryChange("all")}
            style={{
              borderColor: isSelectedCategory("all"),
              borderWidth: 2,
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 20,
              justifyContent: "center",
              alignItems:"center",
            }}
          >
            <Text style={{ color: isSelectedCategory("all"), fontSize: 16 }}>
              All
            </Text>
          </Pressable>
          {categories &&
            categories.map((category) => (
              <Pressable
                onPress={() =>
                  handleSelectedCategoryChange(category?.slug?.toLowerCase())
                }
                key={category.id}
                style={{
                  borderColor: isSelectedCategory(
                    category?.slug?.toLowerCase()
                  ),
                  borderWidth: 2,
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 99,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: isSelectedCategory(category?.slug?.toLowerCase()),
                    fontSize: 16,
                  }}
                >
                  {category.name}
                </Text>
              </Pressable>
            ))}
        </ScrollView>

        <CourseList headingTitle={"Top courses"} courses={filteredCourses} />
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default Featured;
