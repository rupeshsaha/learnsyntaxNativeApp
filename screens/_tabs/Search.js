import { View, Text, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import { baseUrl } from "../../lib/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Search = () => {

   const [categories, setCategories] = useState("");

   const fetchCategories = async () => {
     try {
       const res = await fetch(`${baseUrl}/admin/category/`, {
         headers: {
           Authorization: `Token ${await AsyncStorage.getItem("token")}`,
         },
       });
       if (!res.ok) {
         return console.log("Error while fetching category");
       }
       const data = await res.json();
       setCategories(data);
     } catch (error) {
       console.log(error);
     }
   };

   useEffect(() => {
     fetchCategories();
   }, []);
  
  return (
    <SafeAreaView
      style={{
        backgroundColor: "black",
        height: "100%",
        paddingHorizontal: 8,
        gap: 20,
      }}
    >
      

      <View style={{ paddingHorizontal: 8, gap: 10 }}>
        <Text style={{ fontWeight: 700, fontSize: 16, color: "white" }}>
          Top searches
        </Text>
        <View
          style={{
            width: "98%",

            flexDirection: "row",
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <View
            style={{
              borderWidth: 2,
              borderColor: "white",
              borderRadius: 30,
              paddingVertical: 10,
              paddingHorizontal: 20,
              maxWidth: 100,
              alignItems: "center",
              justifyContent: "center",
              height: 50,
            }}
          >
            <Text style={{ fontWeight: 700, fontSize: 14, color: "white" }}>
              Python
            </Text>
          </View>
          <View
            style={{
              borderWidth: 2,
              borderColor: "white",
              borderRadius: 30,
              paddingVertical: 10,
              paddingHorizontal: 20,
              maxWidth: 100,
              alignItems: "center",
              justifyContent: "center",
              height: 50,
            }}
          >
            <Text style={{ fontWeight: 700, fontSize: 14, color: "white" }}>
              Python
            </Text>
          </View>
          <View
            style={{
              borderWidth: 2,
              borderColor: "white",
              borderRadius: 30,
              paddingVertical: 10,
              paddingHorizontal: 20,
              maxWidth: 100,
              alignItems: "center",
              justifyContent: "center",
              height: 50,
            }}
          >
            <Text style={{ fontWeight: 700, fontSize: 14, color: "white" }}>
              Python
            </Text>
          </View>
          <View
            style={{
              borderWidth: 2,
              borderColor: "white",
              borderRadius: 30,
              paddingVertical: 10,
              paddingHorizontal: 20,
              maxWidth: 100,
              alignItems: "center",
              justifyContent: "center",
              height: 50,
            }}
          >
            <Text style={{ fontWeight: 700, fontSize: 14, color: "white" }}>
              Python
            </Text>
          </View>
          <View
            style={{
              borderWidth: 2,
              borderColor: "white",
              borderRadius: 30,
              paddingVertical: 10,
              paddingHorizontal: 20,
              maxWidth: 100,
              alignItems: "center",
              justifyContent: "center",
              height: 50,
            }}
          >
            <Text style={{ fontWeight: 700, fontSize: 14, color: "white" }}>
              Python
            </Text>
          </View>
          <View
            style={{
              borderWidth: 2,
              borderColor: "white",
              borderRadius: 30,
              paddingVertical: 10,
              paddingHorizontal: 20,
              maxWidth: 100,
              alignItems: "center",
              justifyContent: "center",
              height: 50,
            }}
          >
            <Text style={{ fontWeight: 700, fontSize: 14, color: "white" }}>
              Python
            </Text>
          </View>
          <View
            style={{
              borderWidth: 2,
              borderColor: "white",
              borderRadius: 30,
              paddingVertical: 10,
              paddingHorizontal: 20,
              maxWidth: 100,
              alignItems: "center",
              justifyContent: "center",
              height: 50,
            }}
          >
            <Text style={{ fontWeight: 700, fontSize: 14, color: "white" }}>
              Python
            </Text>
          </View>
        </View>
      </View>

      <View style={{ gap: 20 }}>
        <Text
          style={{
            color: "white",
            fontWeight: 700,
            fontSize: 16,
            marginBottom: 20,
          }}
        >
          Browse Categories
        </Text>
        {categories && categories.map((category) => (
          
        <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
          <Text style={{ color: "white", fontSize: 16 }}>
           {category.name}
          </Text>
          <Feather name="arrow-right" size={24} color="white" />
        </View>
        ))}
         
       
      </View>
    </SafeAreaView>
  );
};

export default Search;
