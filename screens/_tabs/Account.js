import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../lib/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { accountMenus } from "../../data";
import { useNavigation } from "@react-navigation/native";

const AccountMenu = ({menu}) => {
  return (
    <View>
      <Text style={{ color: "white", marginTop:35, fontSize:12 }}>{menu.title}</Text>
      <View style={{gap:8,marginTop:8}}>

      {menu.submenus.map((submenu,i) => (
        
        <View
          key={i}
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          width: "100%",
        }}
        >
        <Text style={{ fontSize: 17, color: "white" }}>{ submenu}</Text>
        <Entypo name="chevron-right" size={24} color="white" />
      </View>
      ))}
      </View>
    </View>
  );
};


const Account = () => {
  const [user, setUser] = useState();
  const getCurrentUser = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await fetch(`${baseUrl}/user/me`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.detail ?? "Error while getting logged in user");
      }
      setUser(data);
    } catch (error) {
      console.log(error)
    }
  };



  useEffect(() => {
    getCurrentUser();
  }, []);

  const navigation = useNavigation()
  const handleSignOut = async () => {
    await AsyncStorage.removeItem("token")
    navigation.navigate("login")
  }

  return (
    <View
      style={{
        backgroundColor: "black",
        height: "100%",
        paddingHorizontal: 10,
        alignItems: "center",
      }}
    >
      <ScrollView
        contentContainerStyle={{ width: "98%", alignItems: "center" }}
      >
        <View
          style={{
            borderColor: "gray",
            borderRadius: 100,
            borderWidth: 2,
            padding: 20,
          }}
        >
          <AntDesign name="user" size={80} color="gray" />
        </View>
        <View
          style={{
            width: "95%",
            alignItems: "center",
            height: 130,
            justifyContent: "space-between",
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "white", fontSize: 28 }}>
              {user?.username}
            </Text>
            <Text style={{ color: "white", fontSize: 18 }}>{user?.email}</Text>
          </View>
          <Text
            style={{ color: "#ee99ffff", fontWeight: "bold", fontSize: 16 }}
          >
            Become an Instructor
          </Text>
        </View>

        <View
          style={{
            marginTop: 10,
            justifyContent: "flex-start",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          {accountMenus.map((accountMenu, i) => (
            <AccountMenu key={i} menu={accountMenu} />
          ))}
        </View>
        <Pressable onPress={()=>handleSignOut()} style={{marginVertical:20}}>

        <Text style={{ color: "#ee99ffff", fontWeight: "bold", fontSize: 14 }}>
         Sign Out
        </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default Account;
