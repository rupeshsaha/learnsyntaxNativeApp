import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { courses as data } from "../data";

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // const fetchData = async () => {
    //   const res = await fetch("https://learnsyntax.tymiqly.com/api/courses");
    //   const data = await res.json();
    //   if (data) {
    //     setCourses(data);
    //   }
    // };
    // fetchData();
    setCourses(data)
  }, []);
  return (
    <View>
      <Text
        style={{
          fontWeight: "700",
          fontSize: 23,
          color: "white",
          marginBottom: 20,
        }}
      >
        Recommended for you
      </Text>
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
