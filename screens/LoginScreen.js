import { View, Text, TextInput, Pressable } from 'react-native'
import React from 'react'
import {Feather, AntDesign} from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation()
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
          marginBottom:20
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
        }}
        placeholderTextColor={"white"}
        placeholder="Email"
      />
      <Pressable
        onPress={()=>navigation.navigate("main")}
        style={{
          backgroundColor: "#A435F0",
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
      <View style={{ flexDirection: "row", gap:10 }}>
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
}

export default LoginScreen