import { View, Text, TextInput, Image, Pressable, ScrollView } from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Fontisto, AntDesign, FontAwesome } from "@expo/vector-icons";
import CartItem from "../components/CartItem";
import { CartContext } from "../App";
import { PURPLE } from "../lib/constants";

const Checkout = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cards");

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method.toLowerCase());
  };

  const isSelected = (method) => selectedPaymentMethod === method;
  const { items } = useContext(CartContext);
  const total = items.reduce((sum, item) => {
    return Number(sum) + Number(item.price);
  }, 0);

  return (
    <SafeAreaView
      style={{
        backgroundColor: "black",
        height: "100%",
        padding:10
        
       
      }}
    >
      {/* billing address section */}
      <ScrollView contentContainerStyle={{
        gap: 24,
        paddingBottom: 120,
        
        
        
      }}>
      <View style={{ gap: 14 }}>
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
          Billing address
        </Text>
        <View style={{ gap: 6 }}>
          <Text style={{ color: "white", fontWeight: 500, fontSize: 14 }}>
            Country
          </Text>
          <TextInput
            placeholder="Enter you country"
            placeholderTextColor={"white"}
            style={{
              borderColor: "white",
              borderWidth: 1,
              borderRadius: 8,
              color: "white",
            }}
          />
        </View>
        <View style={{ gap: 6 }}>
          <Text style={{ color: "white", fontWeight: 500, fontSize: 14 }}>
            State / Union Territory
          </Text>
          <TextInput
            placeholder="Enter you State / Union Territory"
            placeholderTextColor={"white"}
            style={{
              borderColor: "white",
              borderWidth: 1,
              borderRadius: 8,
              color: "white",
            }}
          />
        </View>
      </View>

      {/* Payment methods section */}
      <View style={{ gap: 14 }}>
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
          Payment method
        </Text>
        <View>
          <Pressable
            onPress={() => handlePaymentMethodSelect("cards")}
            style={{
              flexDirection: "row",
              gap: 8,
              backgroundColor: "#60606067",
              borderColor: isSelected("cards") ? "white" : "#9d9d9dff",
              paddingVertical: 8,
              paddingHorizontal: 10,
              alignItems: "center",
              borderWidth: 1,
            }}
          >
            <Fontisto
              name={
                isSelected("cards") ? "radio-btn-active" : "radio-btn-passive"
              }
              size={15}
              color="white"
            />
            <AntDesign name="credit-card" size={22} color="white" />
            <Text style={{ color: "white" }}>Cards</Text>
          </Pressable>

          <Pressable
            onPress={() => handlePaymentMethodSelect("upi")}
            style={{
              flexDirection: "row",
              gap: 8,
              backgroundColor: "#60606067",
              borderColor: isSelected("upi") ? "white" : "#9d9d9dff",
              paddingVertical: 8,
              paddingHorizontal: 10,
              alignItems: "center",
              borderWidth: 1,
            }}
          >
            <Fontisto
              name={
                isSelected("upi") ? "radio-btn-active" : "radio-btn-passive"
              }
              size={15}
              color="white"
            />
            <Image
              source={{
                uri: "https://indiadesignsystem.bombaydc.com/assets/india-designs/display/UPI/black.png",
              }}
              style={{
                width: 22,
                height: 22,
                resizeMode: "contain",
                backgroundColor: "white",
                borderRadius: 4,
              }}
            />
            <Text style={{ color: "white" }}>UPI</Text>
          </Pressable>

          <Pressable
            onPress={() => handlePaymentMethodSelect("netbanking")}
            style={{
              flexDirection: "row",
              gap: 8,
              backgroundColor: "#60606067",
              borderColor: isSelected("netbanking") ? "white" : "#9d9d9dff",
              paddingVertical: 8,
              paddingHorizontal: 10,
              alignItems: "center",
              borderWidth: 1,
            }}
          >
            <Fontisto
              name={
                isSelected("netbanking")
                  ? "radio-btn-active"
                  : "radio-btn-passive"
              }
              size={15}
              color="white"
            />
            <FontAwesome name="bank" size={22} color="white" />
            <Text style={{ color: "white" }}>Net Banking</Text>
          </Pressable>

          <Pressable
            onPress={() => handlePaymentMethodSelect("wallet")}
            style={{
              flexDirection: "row",
              gap: 8,
              backgroundColor: "#60606067",
              borderColor: isSelected("wallet") ? "white" : "#9d9d9dff",
              paddingVertical: 8,
              paddingHorizontal: 10,
              alignItems: "center",
              borderWidth: 1,
            }}
          >
            <Fontisto
              name={
                isSelected("wallet") ? "radio-btn-active" : "radio-btn-passive"
              }
              size={15}
              color="white"
            />
            <Fontisto name="wallet" size={22} color="white" />
            <Text style={{ color: "white" }}>Mobile Wallets</Text>
          </Pressable>
        </View>
      </View>

      <View style={{ gap: 14 }}>
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 18,
            
          }}
        >
          Order details ({items.length} course{items.length > 1 ? "s" : ""})
        </Text>
        {items &&
          items.map((item, i) => (
            <CartItem key={i} data={item} isCheckoutPage={true} />
          ))}
      </View>

      </ScrollView>

      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 150,
          minWidth:"105%",
          gap: 20,
          justifyContent:"space-around",
          alignItems: "center",
          backgroundColor: "#272727ff",
          width: "100%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            width: "100%",
          }}
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
            Total:
          </Text>
          <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
            ₹{total}
          </Text>
        </View>
        <Pressable
          onPress={() => navigation.navigate("Checkout")}
          style={{
            backgroundColor: PURPLE,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 20,
            paddingVertical: 10,
            flexDirection: "row",
            minWidth: "90%",
            marginBottom:10,
            gap: 4,
            borderRadius: 6,
          }}
        >
          <FontAwesome name="lock" color="white" size={22} />
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
            Pay Now
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Checkout;
