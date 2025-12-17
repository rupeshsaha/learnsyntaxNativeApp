import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { Feather, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { baseUrl, PURPLE } from "../lib/constants";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ route }) => {
  const data = route?.params?.data;
  const navigation = useNavigation();

  const [email, setEmail] = useState(data?.email ?? "");
  const [password, setPassword] = useState(data?.password ?? "");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      if (!email?.trim() || !password?.trim()) {
        return Toast.show({
          type: "error",
          text1: "Error",
          text2: "All fields are required",
        });
      }
      const res = await fetch(`${baseUrl}/auth/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        return Toast.show({
          type: "error",
          text1: "Error",
          text2: `${data.error}`,
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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: "#000000",
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flex: 1,
            paddingHorizontal: 24,
            paddingTop: 80,
            paddingBottom: 40,
            justifyContent: "center",
          }}
        >
          {/* Header */}
          <View style={{ marginBottom: 48 }}>
            <View
              style={{
                width: 64,
                height: 64,
                borderRadius: 20,
                backgroundColor: PURPLE,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              <MaterialCommunityIcons name="login" size={32} color="white" />
            </View>
            <Text
              style={{
                fontSize: 32,
                fontWeight: "800",
                color: "white",
                marginBottom: 8,
              }}
            >
              Welcome Back
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "rgba(255, 255, 255, 0.6)",
                fontWeight: "400",
              }}
            >
              Log in to continue your learning journey
            </Text>
          </View>

          {/* Form */}
          <View style={{ gap: 16, marginBottom: 24 }}>
            <View
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                borderRadius: 16,
                borderWidth: 2,
                borderColor: "rgba(255, 255, 255, 0.1)",
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 16,
                height: 56,
              }}
            >
              <Feather
                name="mail"
                size={20}
                color="rgba(255, 255, 255, 0.5)"
                style={{ marginRight: 12 }}
              />
              <TextInput
                style={{
                  flex: 1,
                  color: "white",
                  fontSize: 16,
                  fontWeight: "500",
                }}
                placeholderTextColor="rgba(255, 255, 255, 0.4)"
                placeholder="Email address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                borderRadius: 16,
                borderWidth: 2,
                borderColor: "rgba(255, 255, 255, 0.1)",
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 16,
                height: 56,
              }}
            >
              <Feather
                name="lock"
                size={20}
                color="rgba(255, 255, 255, 0.5)"
                style={{ marginRight: 12 }}
              />
              <TextInput
                style={{
                  flex: 1,
                  color: "white",
                  fontSize: 16,
                  fontWeight: "500",
                }}
                placeholderTextColor="rgba(255, 255, 255, 0.4)"
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                <Feather
                  name={showPassword ? "eye" : "eye-off"}
                  size={20}
                  color="rgba(255, 255, 255, 0.5)"
                />
              </Pressable>
            </View>
          </View>

          {/* Forgot Password */}
          <Pressable
            onPress={() => navigation.navigate("forgotpassword")}
            style={{ alignSelf: "flex-end", marginBottom: 32 }}
          >
            <Text
              style={{
                color: PURPLE,
                fontSize: 15,
                fontWeight: "600",
              }}
            >
              Forgot Password?
            </Text>
          </Pressable>

          {/* Login Button */}
          <Pressable
            onPress={handleLogin}
            style={{
              backgroundColor: PURPLE,
              height: 56,
              borderRadius: 16,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 32,
              shadowColor: PURPLE,
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.4,
              shadowRadius: 16,
              elevation: 8,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 17,
                fontWeight: "700",
                letterSpacing: 0.5,
              }}
            >
              Log In
            </Text>
          </Pressable>

          {/* Divider */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 32,
              gap: 16,
            }}
          >
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
            />
            <Text
              style={{
                color: "rgba(255, 255, 255, 0.4)",
                fontSize: 14,
                fontWeight: "500",
              }}
            >
              Or continue with
            </Text>
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
            />
          </View>

          {/* Social Login */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              gap: 16,
              marginBottom: 32,
            }}
          >
            <Pressable
              style={{
                width: 64,
                height: 64,
                borderRadius: 16,
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                borderWidth: 1,
                borderColor: "rgba(255, 255, 255, 0.1)",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AntDesign name="google" size={24} color="white" />
            </Pressable>
            <Pressable
              style={{
                width: 64,
                height: 64,
                borderRadius: 16,
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                borderWidth: 1,
                borderColor: "rgba(255, 255, 255, 0.1)",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Feather name="facebook" size={24} color="white" />
            </Pressable>
            <Pressable
              style={{
                width: 64,
                height: 64,
                borderRadius: 16,
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                borderWidth: 1,
                borderColor: "rgba(255, 255, 255, 0.1)",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AntDesign name="apple" size={24} color="white" />
            </Pressable>
          </View>

          {/* Footer */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "rgba(255, 255, 255, 0.6)",
                fontSize: 15,
                fontWeight: "400",
              }}
            >
              Don't have an account?{" "}
            </Text>
            <Pressable onPress={() => navigation.navigate("register")}>
              <Text
                style={{
                  color: PURPLE,
                  fontSize: 15,
                  fontWeight: "700",
                }}
              >
                Sign Up
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
