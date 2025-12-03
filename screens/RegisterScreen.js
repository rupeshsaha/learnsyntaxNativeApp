import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { Feather, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { PURPLE } from "../lib/constants";


const LoginScreen = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async() => {
    try {
      const res = await fetch("https://api.zxconline.com/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
        username,
        password
      })
      })
      if (res.ok) {
        
        navigation.navigate("main")
      }
      const data = await res.json();

      console.log(data)
    } catch (error) {
      console.log(error);
      alert("error while login", error)
    }
  }

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
          color:"white"
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
          color:"white"
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
        <Feather name="mail" size={18} color="white" />
        <Text style={{ color: "white", fontSize: 18, fontWeight: 700 }}>
          Log in with email
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
    </View>
  );
};

export default LoginScreen;
