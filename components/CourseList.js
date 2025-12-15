import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { baseUrl, PURPLE } from "../lib/constants";

const CourseList = ({category, headingTitle, courses}) => {

  
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

      <ScrollView  contentContainerStyle={{ gap: 20}}>
        {courses &&
          courses.map((course, i) => <CourseCard key={i} course={course} />)}
       
      </ScrollView>
    </View>
  );
};

export default CourseList;
