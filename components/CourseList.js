import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { baseUrl, PURPLE } from "../lib/constants";

const CourseList = ({category, headingTitle}) => {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
   try {
     const res = await fetch(`${baseUrl}/course/`)
     const data = await res.json();
     setCourses(data)
   } catch (error) {
    console.log(error)
   }
  }

  useEffect(() => {
    
    fetchCourses()
  }, []);
  return (
    <View>
      {category && !headingTitle && (
        <View style={{ flexDirection: "row", gap: 6 }}>
          <Text
            style={{
              fontWeight: "700",
              fontSize: 23,
              color: "white",
              marginBottom: 20,
            }}
          >
            Top courses in
          </Text>
          <Text
            style={{
              fontWeight: "700",
              fontSize: 23,
              color: PURPLE,
              marginBottom: 20,
              
              
            }}
          >
            {category?.name}
          </Text>
        </View>
      )}

      {headingTitle && !category && (
        <Text
          style={{
            fontWeight: "700",
            fontSize: 23,
            color: "white",
            marginBottom: 20,
          }}
        >
          {headingTitle}
        </Text>
      )}

      <ScrollView horizontal contentContainerStyle={{ gap: 15, height: 300 }}>
        {courses &&
          courses.map((course, i) => <CourseCard key={i} course={course} />)}
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text
            style={{
              color: "#d29cf6ff",
              fontWeight: 700,
              textAlign: "center",
              minWidth: 200,
              fontSize: 20,
            }}
          >
            See all
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default CourseList;
