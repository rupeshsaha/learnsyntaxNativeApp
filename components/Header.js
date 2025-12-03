import {
  getFocusedRouteNameFromRoute,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { Pressable, StatusBar, Text, TextInput, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigationState } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../App";
import { PURPLE } from "../lib/constants";
import { SafeAreaView } from "react-native-safe-area-context";

const CustomHeader = ({ navigation, route }) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? route.name;
  console.log(routeName)

  const { items } = useContext(CartContext);
  return (
    <>
      <StatusBar
        barStyle="light-content" // or "dark-content"
        backgroundColor="#000" // Android only
        translucent={false}
      />
      <SafeAreaView
        style={{
          backgroundColor: "black",
          justifyContent: `${
            routeName === "Search" || routeName === "Course details"
              ? "space-between"
              : "flex-end"
          }`,
          flexDirection: "row",
          alignItems: `${
            routeName === "Search" || routeName === "Course details"
              ? "center"
              : "flex-end"
          }`,
          paddingTop: `${
            routeName === "Search" || routeName === "Course details" ? 5 : 10
          }`,

          minHeight: 53,

          paddingHorizontal: 20,
        }}
      >
        {routeName === "Search" && (
          <TextInput
            placeholder="Search"
            placeholderTextColor={"white"}
            style={{
              borderWidth: 2,
              borderColor: "white",
              borderRadius: 6,
              width: "88%",
              height: 50,
              paddingHorizontal: 10,
            }}
          />
        )}

        {routeName === "Course details" && (
          <Pressable onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" color="white" size={24} />
          </Pressable>
        )}

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          {items.length > 0 && (
            <Text
              style={{
                color: PURPLE,
                fontWeight: "bold",
                position: "absolute",
                fontSize: 12,
                bottom: 20,
                left: 10,
              }}
            >
              {items.length}
            </Text>
          )}

          <Pressable onPress={() => navigation.navigate("Cart")}>
            <Feather name="shopping-cart" size={24} color="white" />
          </Pressable>
        </View>
      </SafeAreaView>
    </>
  );
};

export default CustomHeader;
