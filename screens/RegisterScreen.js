import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { Feather, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { baseUrl, PURPLE } from "../lib/constants";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RegisterScreen = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [currentStage, setCurrentStage] = useState("register_form");
  const [email, setEmail] = useState("");

   const handleNumericChange = (text) => {
     const numericValue = text.replace(/[^0-9]/g, "");
     if (numericValue.length < 0 || numericValue.length > 6) return;
     setOtpValue(numericValue);
   };

  const handleRegister = async () => {
    try {
      if (!username?.trim() || !password?.trim() || !email?.trim()) {
        return Toast.show({
          type: "error",
          text1: "Error",
          text2: "All fields are required",
        });
      }
      const res = await fetch(`${baseUrl}/auth/signup/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password
        }),
      });
      const data = await res.json();
      if (!res.ok) {
       
        return Toast.show({
                type: "error",
                text1: "Error",
                text2: data.error ?? "Error creating account",
        });
      }

      Toast.show({
              type: "success",
              text1: "Success",
              text2: "OTP sent successfully",
      });
      await AsyncStorage.setItem("session_id", data?.session_id)
      setCurrentStage("verify_otp")
      // navigation.navigate("login", { data: { username, password } });
    } catch (error) {
      console.log(error);
      alert("error while creating account", error);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await fetch(`${baseUrl}/auth/verify_signup_otp/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          session_id: await AsyncStorage.getItem("session_id"),
          otp: otpValue
        })
      })
      const data = await res.json()
      if (!res.ok) {
        // console.log(await AsyncStorage.getItem("session_id"));
        console.log(data)

            return Toast.show({
              type: "error",
              text1: "Error",
              text2: data?.error ?? "Error verifying otp",
            });
      }

            Toast.show({
             type: "success",
             text1: "Success",
             text2: data?.message ?? "OTP verified and account created",
           });
      navigation.navigate("login",{data:{email,password}})

    } catch (error) {
      console.log(error)
    }
  }

  if (currentStage === "register_form") {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
          minHeight: "100%",
          gap: 25,
        }}
      >
        <Text
          style={{
            fontWeight: 700,
            fontSize: 20,
            color: "white",
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          Create account to get started
        </Text>
        <TextInput
          style={{
            height: 40,
            minWidth: "90%",
            borderBottomWidth: 2,
            borderBottomColor: "white",
            color: "white",
          }}
          placeholderTextColor={"white"}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={{
            height: 40,
            minWidth: "90%",
            borderBottomWidth: 2,
            borderBottomColor: "white",
            color: "white",
          }}
          placeholderTextColor={"white"}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={{
            height: 40,
            minWidth: "90%",
            borderBottomWidth: 2,
            borderBottomColor: "white",
            color: "white",
          }}
          secureTextEntry
          placeholderTextColor={"white"}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
        />
        <Pressable
          onPress={() => handleRegister()}
          style={{
            backgroundColor: PURPLE,
            width: "90%",
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: 8,
          }}
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: 700 }}>
            Create Account
          </Text>
        </Pressable>
        <View
          style={{
            flexDirection: "row",
            minWidth: "90%",
            alignItems: "center",
            gap: 10,
          }}
        >
          <View
            style={{ height: 1, width: "30%", backgroundColor: "white" }}
          ></View>
          <Text style={{ color: "white", fontSize: 14 }}>
            Other options to get started
          </Text>
          <View
            style={{ height: 1, width: "30%", backgroundColor: "white" }}
          ></View>
        </View>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <View style={{ borderWidth: 2, borderColor: "white", padding: 8 }}>
            <AntDesign name="google" size={20} color="white" />
          </View>
          <View style={{ borderWidth: 2, borderColor: "white", padding: 8 }}>
            <Feather name="facebook" size={20} color="white" />
          </View>
          <View style={{ borderWidth: 2, borderColor: "white", padding: 8 }}>
            <AntDesign name="apple" size={20} color="white" />
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: "white" }}>Already have an account ? </Text>
          <Pressable onPress={() => navigation.navigate("login")}>
            <Text style={{ color: PURPLE, fontWeight: "bold" }}>Log in</Text>
          </Pressable>
        </View>
      </View>
    );
  } else if (currentStage === "verify_otp") {
     return (
       <View
         style={{
           justifyContent: "center",
           alignItems: "center",
           backgroundColor: "black",
           minHeight: "100%",
           gap: 25,
         }}
       >
         <Text
           style={{
             fontWeight: 700,
             fontSize: 20,
             color: "white",
             textAlign: "center",
             marginBottom: 20,
           }}
         >
           Verify OTP
         </Text>

         <TextInput
           style={{
             height: 40,
             minWidth: "90%",
             borderBottomWidth: 2,
             borderBottomColor: "white",
             color: "white",
           }}
           placeholderTextColor={"white"}
           placeholder="Enter OTP"
           keyboardType="number-pad"
           value={otpValue}
           onChangeText={handleNumericChange}
         />

         <Pressable
           onPress={() => handleVerifyOtp()}
           style={{
             backgroundColor: PURPLE,
             width: "90%",
             height: 50,
             justifyContent: "center",
             alignItems: "center",
             flexDirection: "row",
             gap: 8,
           }}
         >
           <Text style={{ color: "white", fontSize: 18, fontWeight: 700 }}>
             Verify OTP
           </Text>
         </Pressable>

         <View
           style={{
             flexDirection: "row",
             gap: 10,
             justifyContent: "space-around",
           }}
         >
           <Pressable onPress={() => setCurrentStage("register_form")}>
             <Text style={{ color: PURPLE, fontWeight: "bold" }}>
               Change details
             </Text>
           </Pressable>
         </View>
       </View>
     );
  }
};

export default RegisterScreen;
