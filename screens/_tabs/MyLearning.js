import { View, Text, ScrollView, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo, Feather } from "@expo/vector-icons";
import { baseUrl, PURPLE } from "../../lib/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const MyLearning = () => {
  const [courses, setCourses] = useState("");
  const navigation = useNavigation()

   const fetchCourses = async () => {
     try {
       const res = await fetch(`${baseUrl}/user/my_courses/`, {
         headers: {
           Authorization: `Token ${await AsyncStorage.getItem("token")}`,
         },
       });
       if (!res.ok) {
         return console.log("Error while fetching category");
       }
       const data = await res.json();
       setCourses(data);
     } catch (error) {
       console.log(error);
     }
   };

   useEffect(() => {
     fetchCourses();
   }, []);
  return (
    <SafeAreaView
      style={{
        backgroundColor: "black",
        paddingHorizontal: 20,
        height: "100%",
        gap: 20,
      }}
    >
      {/* <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ color: "white", fontSize: 22 }}>My courses</Text>
        <View style={{ flexDirection: "row", gap: 20 }}>
          <Entypo name="magnifying-glass" size={26} color="white" />

          <Feather name="shopping-cart" size={26} color="white" />
        </View>
      </View> */}

      <ScrollView contentContainerStyle={{ gap: 18 }}>
        <Text style={{ fontWeight: 700, fontSize: 20, color: "white" }}>
          My courses
        </Text>
        {courses?.length>0 ?
          (courses.map((course, i) => {
          return  (
            <Pressable
            onPress={()=>navigation.navigate("learning",{id:course?.id})}
              key={i} style={{ flexDirection: "row", gap: 8 }}>
              <Image
                source={{ uri: course.image_url }}
                height={60}
                width={60}
                style={{ borderRadius: 10 }}
              />
              <View style={{ maxWidth: "80%", gap: 3 }}>
                <Text style={{ color: "white", fontWeight: 600, fontSize: 16 }}>
                  {course.title}
                </Text>
                <Text style={{ color: "white", fontWeight: 300, fontSize: 12 }}>
                  John Purcell
                </Text>
                
                {course?.progress == 0 ? (
                  <Text
                    style={{ color: PURPLE, fontWeight: 500, fontSize: 14 }}
                  >
                    Start Course
                  </Text>
                ) : (
                  <Text
                    style={{ color: "white", fontWeight: 200, fontSize: 14 }}
                  >
                    {course.progress}% complete
                  </Text>
                )}
              </View>
            </Pressable>
            )
          })):(<View style={{justifyContent:"center", alignItems:"center", height:"100%"}}><Text style={{color: "white", fontSize: 16}}>You have not enrolled in any course</Text></View>)
        
        }
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyLearning;
