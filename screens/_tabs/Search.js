import { View, Text, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import { baseUrl } from "../../lib/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Search = () => {

  const [categories, setCategories] = useState("");
  const [subCategories, setSubCategories] = useState("");


    const fetchSubCategories = async () => {
      try {
        const res = await fetch(`${baseUrl}/subcategory/`, {
          headers: {
            Authorization: `Token ${await AsyncStorage.getItem("token")}`,
          },
        });
        if (!res.ok) {
          return console.log("Error while fetching category");
        }
        const data = await res.json();
        setSubCategories(data);
      } catch (error) {
        console.log(error);
      }
    };

   const fetchCategories = async () => {
     try {
       const res = await fetch(`${baseUrl}/category/`, {
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
     fetchSubCategories();
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
        <Text style={{ fontWeight: 700, fontSize: 16, color: "white", marginTop:10 }}>
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
          {subCategories && subCategories.map((subCategory, i) => (
            
            <View
              key={i}
            style={{
              borderWidth: 2,
              borderColor: "white",
              borderRadius: 30,
              paddingVertical: 10,
              paddingHorizontal: 20,
              alignItems: "center",
              justifyContent: "center",
              height: 50,
            }}
          >
            <Text style={{ fontWeight: 700, fontSize: 14, color: "white" }}>
              {subCategory.name}
            </Text>
          </View>
          ))}
         
        </View>
      </View>

      <View style={{ gap: 20 }}>
        <Text
          style={{
            color: "white",
            fontWeight: 700,
            fontSize: 16,
            marginTop:20
          }}
        >
          Browse Categories
        </Text>
        {categories && categories.map((category, i) => (
          
        <View key={i} style={{ justifyContent: "space-between", flexDirection: "row" }}>
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
