import { View, Text, Image, ScrollView, Pressable, Linking } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { baseUrl, PURPLE } from "../lib/constants";
import { courses } from "../data";
import { Feather } from "@expo/vector-icons";

import Rating from "../components/Rating";
import { CartContext } from "../App";
import { useNavigation } from "@react-navigation/native";
import CartItem from "../components/CartItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

const Cart = () => {
  const [isCartEmpty, setIsCartEmpty] = useState(false);

  
  useEffect(() => {
    if (items.length === 0) setIsCartEmpty(true);
  }, [items]);
  
  const { items, removeItem } = useContext(CartContext);
  const total = items.reduce((sum, item) => {
    return Number(sum) + Number(item.price);
  }, 0);

    const handleCheckout = async() => {
      try {
        const res = await fetch(`${baseUrl}/payments/buy/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization" :`Token ${await AsyncStorage.getItem("token")}`
          },
          body : JSON.stringify({course_id:items[0]?.id })
        })
        const data = await res.json();
        if (!res.ok) {
          return Toast.show({type:"error",text1: "ERROR", text2: data.error ?? "Error while buying course"})
        }
  
        Linking.openURL(`${baseUrl}/payment/webview/?order_id=${data?.gateway_order_id}&amount=${total}&course_id=${items[0]?.id}`)
  
  
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <SafeAreaView
      style={{
        backgroundColor: "black",
        height: "100%",
        padding: 10,
        gap: 10,
      }}
    >
      <ScrollView contentContainerStyle={{ gap: 8 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>Total: </Text>
          <Text style={{ color: "white", fontSize: 22, fontWeight: 600 }}>
            ₹{total}
          </Text>
          {/* <Text
          style={{
            color: "gray",
            textDecorationLine: "line-through",
            fontWeight: 300,
            fontSize: 16,
          }}
        >
          ₹2999
        </Text>
        <Text style={{ color: "gray", fontWeight: 300, fontSize: 16 }}>
          10% off
        </Text> */}
        </View>

        <View style={{ gap: 14, alignItems: "center", marginTop: 30 }}>
          <View
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.64)",
              height: 1,
              width: "95%",
            }}
          ></View>

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 2,
              borderRadius: 5,
              width: "95%",
              borderColor: PURPLE,
              paddingVertical: 12,
            }}
          >
            <Text style={{ fontSize: 14, color: PURPLE, fontWeight: "bold" }}>
              Apply Coupon
            </Text>
          </View>
        </View>

        <View style={{ alignItems: "center", marginTop: 25 }}>
          <Text
            style={{
              fontWeight: "medium",
              color: "white",
              alignSelf: "flex-start",
              paddingLeft: 8,
              fontSize: 16,
            }}
          >
            {items.length} courses in cart
          </Text>

          <View
            style={{
              alignItems: "center",
              width: "100%",
              gap: 30,
              marginTop: 10,
            }}
          >
            {isCartEmpty ? (
              <View style={{alignItems:"center", padding:50}}>
                <Text style={{ color: "white", fontSize: 16 }}>
                  Cart is empty
                </Text>
                <Pressable style={{backgroundColor: PURPLE, borderRadius:6,height:45, justifyContent:"center", width:250, alignItems:"center", margin:30}}>
                  <Text style={{ color: "white", fontSize: 16 }}>
                    Continue exploring courses
                  </Text>
                </Pressable>
              </View>
            ) : (
              items.map((item, idx) => <CartItem key={idx} data={item} />)
            )}
          </View>
        </View>
      </ScrollView>

      {!isCartEmpty && (
        <Pressable
          onPress={() => handleCheckout()}
          style={{
            backgroundColor: PURPLE,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 20,
            paddingVertical: 10,
            flexDirection: "row",
            gap: 4,
            marginBottom: 18,
            borderRadius: 6,
          }}
        >
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
            Proceed to Checkout
          </Text>
          <Feather name="arrow-right" color="white" size={22} />
        </Pressable>
      )}
    </SafeAreaView>
  );
};

export default Cart;
