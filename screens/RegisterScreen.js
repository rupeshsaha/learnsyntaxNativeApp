import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { Feather, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { baseUrl, PURPLE } from "../lib/constants";
import Toast from "react-native-toast-message";

const RegisterScreen = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleRegister = async () => {
    try {
      if (!username?.trim() || !password?.trim() || !email?.trim()) {
        return Toast.show({
          type: "error",
          text1: "Error",
          text2: "All fields are required",
        });
      }
      const res = await fetch(`${baseUrl}/User/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        Toast.show({
                type: "error",
                text1: "Error",
                text2: "Error creating account",
        });
        console.log(data)
      }
      Toast.show({
              type: "success",
              text1: "Success",
              text2: "Account created successfully",
            });
      navigation.navigate("login", { data: { username, password } });
    } catch (error) {
      console.log(error);
      alert("error while creating account", error);
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
};

export default RegisterScreen;
