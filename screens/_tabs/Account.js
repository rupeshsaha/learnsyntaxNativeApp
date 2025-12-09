import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { baseUrl, PURPLE } from "../../lib/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { accountMenus } from "../../data";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";

const AccountMenu = ({ menu }) => {
  return (
    <View style={{ marginTop: 24, width: "100%" }}>
      <Text
        style={{
          color: "#888888",
          fontSize: 11,
          fontWeight: "600",
          textTransform: "uppercase",
          letterSpacing: 0.5,
          marginBottom: 12,
        }}
      >
        {menu.title}
      </Text>

      <View
        style={{
          backgroundColor: "#1A1A1A",
          borderRadius: 12,
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#2A2A2A",
        }}
      >
        {menu.submenus.map((submenu, i) => (
          <Pressable
            key={i}
            style={({ pressed }) => ({
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 16,
              paddingHorizontal: 16,
              backgroundColor: pressed ? "#222222" : "transparent",
              borderTopWidth: i > 0 ? 1 : 0,
              borderTopColor: "#2A2A2A",
            })}
          >
            <Text style={{ fontSize: 15, color: "#E0E0E0", fontWeight: "500" }}>
              {submenu}
            </Text>
            <Entypo name="chevron-right" size={20} color="#888888" />
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const Account = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getCurrentUser = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      const res = await fetch(`${baseUrl}/user/me/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      const data = await res.json();

      if (!res.ok) {
        console.log(data.detail ?? "Error while getting logged in user");
        setUser(null);
      } else {
        setUser(data);
      }
    } catch (error) {
      console.log(error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const navigation = useNavigation();

  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem("token");
      setUser(null);
      Toast.show({
        type: "success",
        text1: "Signed Out",
        text2: "You have been successfully signed out",
      });
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to sign out",
      });
    }
  };

  if (loading) {
    return (
      <SafeAreaView
        style={{
          backgroundColor: "#000000",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#888888", fontSize: 16 }}>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#000000",
        height: "100%",
        paddingHorizontal: 16,
      }}
    >
      {user && user.id ? (
        <ScrollView
          contentContainerStyle={{
            width: "100%",
            alignItems: "center",
            paddingVertical: 24,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Profile Avatar */}
          <View
            style={{
              borderColor: "#2A2A2A",
              borderRadius: 64,
              borderWidth: 3,
              padding: 24,
              backgroundColor: "#1A1A1A",
              marginBottom: 20,
            }}
          >
            <AntDesign name="user" size={72} color="#888888" />
          </View>

          {/* User Info */}
          <View
            style={{
              width: "100%",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 26,
                fontWeight: "700",
                marginBottom: 6,
              }}
            >
              {user?.username}
            </Text>
            <Text
              style={{
                color: "#B0B0B0",
                fontSize: 15,
                marginBottom: 20,
              }}
            >
              {user?.email}
            </Text>

            {/* Become Instructor CTA */}
            <Pressable
              style={({ pressed }) => ({
                backgroundColor: pressed ? "#8B5CF6" : PURPLE,
                paddingVertical: 14,
                paddingHorizontal: 32,
                borderRadius: 10,
                shadowColor: PURPLE,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 5,
              })}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontWeight: "700",
                  fontSize: 15,
                  letterSpacing: 0.3,
                }}
              >
                Become an Instructor
              </Text>
            </Pressable>
          </View>

          {/* Account Menus */}
          <View
            style={{
              marginTop: 8,
              width: "100%",
            }}
          >
            {accountMenus.map((accountMenu, i) => (
              <AccountMenu key={i} menu={accountMenu} />
            ))}
          </View>

          {/* Sign Out Button */}
          <Pressable
            onPress={handleSignOut}
            style={({ pressed }) => ({
              marginVertical: 32,
              paddingVertical: 14,
              paddingHorizontal: 40,
              borderRadius: 10,
              borderWidth: 2,
              borderColor: pressed ? "#8B5CF6" : PURPLE,
              backgroundColor: pressed ? "#1A1A1A" : "transparent",
            })}
          >
            <Text
              style={{
                color: PURPLE,
                fontWeight: "700",
                fontSize: 15,
                letterSpacing: 0.3,
              }}
            >
              Sign Out
            </Text>
          </Pressable>
        </ScrollView>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 32,
          }}
        >
          <View
            style={{
              alignItems: "center",
              marginBottom: 32,
            }}
          >
            <View
              style={{
                borderColor: "#2A2A2A",
                borderRadius: 64,
                borderWidth: 3,
                padding: 24,
                backgroundColor: "#1A1A1A",
                marginBottom: 20,
              }}
            >
              <AntDesign name="user" size={72} color="#888888" />
            </View>
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 22,
                fontWeight: "700",
                marginBottom: 8,
                textAlign: "center",
              }}
            >
              Welcome Back
            </Text>
            <Text
              style={{
                color: "#888888",
                fontSize: 14,
                textAlign: "center",
                marginBottom: 32,
              }}
            >
              Sign in to access your courses and profile
            </Text>
          </View>

          <Pressable
            onPress={() => navigation.navigate("login")}
            style={({ pressed }) => ({
              backgroundColor: pressed ? "#8B5CF6" : PURPLE,
              paddingVertical: 16,
              paddingHorizontal: 64,
              borderRadius: 10,
              width: "100%",
              maxWidth: 300,
              alignItems: "center",
              shadowColor: PURPLE,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.4,
              shadowRadius: 12,
              elevation: 8,
            })}
          >
            <Text
              style={{
                color: "#FFFFFF",
                fontWeight: "700",
                fontSize: 16,
                letterSpacing: 0.5,
              }}
            >
              Sign In
            </Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Account;
