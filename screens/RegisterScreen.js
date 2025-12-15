import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Feather, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { baseUrl, PURPLE } from "../lib/constants";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RegisterScreen = () => {
  const navigation = useNavigation();

  const [password, setPassword] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [currentStage, setCurrentStage] = useState("register_form");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleNumericChange = (text) => {
    const numericValue = text.replace(/[^0-9]/g, "");
    if (numericValue.length < 0 || numericValue.length > 6) return;
    setOtpValue(numericValue);
  };

  const handleRegister = async () => {
    try {
      if (!password?.trim() || !email?.trim() || !firstName?.trim()) {
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
          email,
          password,
          first_name: firstName,
          last_name: lastName,
          contact_no: contact,
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
      await AsyncStorage.setItem("session_id", data?.session_id);
      setCurrentStage("verify_otp");
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
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session_id: await AsyncStorage.getItem("session_id"),
          otp: otpValue,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data);
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
      navigation.navigate("login", { data: { email, password } });
    } catch (error) {
      console.log(error);
    }
  };

  if (currentStage === "register_form") {
    return (
     
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
              paddingTop: 60,
              paddingBottom: 40,
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
                <MaterialCommunityIcons
                  name="account-plus"
                  size={32}
                  color="white"
                />
              </View>
              <Text
                style={{
                  fontSize: 32,
                  fontWeight: "800",
                  color: "white",
                  marginBottom: 8,
                }}
              >
                Create Account
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: "rgba(255, 255, 255, 0.6)",
                  fontWeight: "400",
                }}
              >
                Sign up to get started with your journey
              </Text>
            </View>

            {/* Form */}
            <View style={{ gap: 16, marginBottom: 32 }}>
              <View style={{ flexDirection: "row", gap: 12 }}>
                <View
                  style={{
                    flex: 1,
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
                    name="user"
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
                    placeholder="First name"
                    value={firstName}
                    onChangeText={setFirstName}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
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
                    name="user"
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
                    placeholder="Last name"
                    value={lastName}
                    onChangeText={setLastName}
                  />
                </View>
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
                  name="phone"
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
                  placeholder="Contact number"
                  value={contact}
                  onChangeText={setContact}
                  keyboardType="phone-pad"
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

            {/* Register Button */}
            <Pressable
              onPress={handleRegister}
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
                Create Account
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
                Already have an account?{" "}
              </Text>
              <Pressable onPress={() => navigation.navigate("login")}>
                <Text
                  style={{
                    color: PURPLE,
                    fontSize: 15,
                    fontWeight: "700",
                  }}
                >
                  Sign In
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
    );
  } else if (currentStage === "verify_otp") {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#000000",
          paddingHorizontal: 24,
          justifyContent: "center",
        }}
      >
        {/* Icon */}
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 24,
            backgroundColor: PURPLE,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 32,
            alignSelf: "center",
          }}
        >
          <MaterialCommunityIcons name="shield-check" size={40} color="white" />
        </View>

        {/* Header */}
        <Text
          style={{
            fontSize: 32,
            fontWeight: "800",
            color: "white",
            textAlign: "center",
            marginBottom: 12,
          }}
        >
          Verify Your Email
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: "rgba(255, 255, 255, 0.6)",
            textAlign: "center",
            marginBottom: 48,
            paddingHorizontal: 20,
          }}
        >
          We've sent a 6-digit code to {email}
        </Text>

        {/* OTP Input */}
        <View style={{ marginBottom: 32 }}>
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
              name="hash"
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
              placeholder="Enter 6-digit code"
              value={otpValue}
              onChangeText={handleNumericChange}
              keyboardType="number-pad"
            />
          </View>
          <Text
            style={{
              color: "rgba(255, 255, 255, 0.4)",
              fontSize: 13,
              marginTop: 12,
              textAlign: "center",
            }}
          >
            Code expires in 10 minutes
          </Text>
        </View>

        {/* Verify Button */}
        <Pressable
          onPress={handleVerifyOtp}
          style={{
            backgroundColor: PURPLE,
            height: 56,
            borderRadius: 16,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 24,
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
            Verify Code
          </Text>
        </Pressable>

        {/* Footer Actions */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 24,
          }}
        >
          <Pressable onPress={() => setCurrentStage("register_form")}>
            <Text
              style={{
                color: PURPLE,
                fontSize: 15,
                fontWeight: "600",
              }}
            >
              Change Details
            </Text>
          </Pressable>
          <Text style={{ color: "rgba(255, 255, 255, 0.3)" }}>•</Text>
          <Pressable onPress={handleRegister}>
            <Text
              style={{
                color: PURPLE,
                fontSize: 15,
                fontWeight: "600",
              }}
            >
              Resend Code
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }
};

export default RegisterScreen;
