import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { Feather, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { baseUrl, PURPLE } from "../lib/constants";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ route }) => {
const data = route?.params?.data;
  const navigation = useNavigation();

  const [username, setUsername] = useState(data?.username ?? "");
  const [password, setPassword] = useState(data?.password ?? "");

  const handleLogin = async () => {
    try {
      if (!username?.trim() || !password?.trim()) {
        return Toast.show({
          type: "error",
          text1: "Error",
          text2: "All fields are required",
        });
      }
      const res = await fetch(`${baseUrl}/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        return Toast.show({
          type: "error",
          text1: "Error",
          text2: `${
            data.non_field_errors[0] || data.password[0] || data.username[0]
          }`,
        });
      }

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Logged in successfully",
      });

      await AsyncStorage.setItem("token", data.token);
      navigation.navigate("main");
    } catch (error) {
      console.log(error);

      alert("Error while login", error);
    }
  };

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
        Log in to continue your learning journey
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
        secureTextEntry
        placeholderTextColor={"white"}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />
      <Pressable
        onPress={() => handleLogin()}
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
          Log in
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
          Other login options
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
        <Text style={{ color: "white" }}>Don't have an account ? </Text>
        <Pressable onPress={() => navigation.navigate("register")}>
          <Text style={{ color: PURPLE, fontWeight: "bold" }}>
            Create Account
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginScreen;
