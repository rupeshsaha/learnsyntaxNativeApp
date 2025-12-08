import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { NavigationContainer } from "@react-navigation/native";
import { Feather, Entypo, AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import Search from "./screens/_tabs/Search";
import Featured from "./screens/_tabs/Featured";
import MyLearning from "./screens/_tabs/MyLearning";
import Wishlist from "./screens/_tabs/Wishlist";
import Account from "./screens/_tabs/Account";
import CourseDetails from "./screens/CourseDetails";
import CustomHeader from "./components/Header";
import Cart from "./screens/Cart";
import { createContext, useEffect, useMemo, useState } from "react";
import Checkout from "./screens/Checkout";
import RegisterScreen from "./screens/RegisterScreen";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View } from "react-native";
import { baseUrl } from "./lib/constants";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";

const Tabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export const CartContext = createContext({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  clear: () => {},
});

const TabNav = () => {
  return (
    <Tabs.Navigator
      initialRouteName="Featured"
      screenOptions={{
        tabBarStyle: { backgroundColor: "black", height: 70,alignItems:"center" },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="Featured"
        component={Featured}
        options={{
          tabBarIcon: (focused) => (
            <Feather name="star" size={28} color="white" />
          ),
        }}
      />
      <Tabs.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: (focused) => (
            <Entypo name="magnifying-glass" size={28} color="white" />
          ),
        }}
      />
      <Tabs.Screen
        name="My Learning"
        component={MyLearning}
        options={{
          tabBarIcon: (focused) => (
            <AntDesign name="play-circle" size={28} color="white" />
          ),
        }}
      />

      <Tabs.Screen
        name="Wishlist"
        component={Wishlist}
        options={{
          tabBarIcon: (focused) => (
            <Feather name="heart" size={28} color="white" />
          ),
        }}
      />
      <Tabs.Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon: (focused) => (
            <FontAwesome5 name="user-circle" size={28} color="white" />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

const StackNav = ({ isLoggedIn }) => {
  const [items, setItems] = useState([]);

  const value = useMemo(
    () => ({
      items,
      addItem: (course) =>
        setItems((prev) => {
          const exists = prev.find((i) => i.id === course.id);
          return exists ? prev : [...prev, course];
        }),
      removeItem: (id) => setItems((prev) => prev.filter((i) => i.id !== id)),
      clear: () => setItems([]),
    }),
    [items]
  );

  return (
    <CartContext.Provider value={value}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={isLoggedIn ? "main" : "login"}>
          <Stack.Screen
            name="login"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="register"
            component={RegisterScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="forgotpassword"
            component={ForgotPasswordScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="main"
            component={TabNav}
            options={{
              header: ({ navigation, route, options, back }) => (
                <CustomHeader
                  navigation={navigation}
                  route={route}
                  options={options}
                  back={back}
                />
              ),
            }}
          />
          <Stack.Screen
            name="Course details"
            component={CourseDetails}
            options={{
              header: ({ navigation, route }) => (
                <CustomHeader navigation={navigation} route={route} />
              ),
            }}
          />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="Checkout" component={Checkout} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartContext.Provider>
  );
};

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "#22c55e", height: 80 }}
      contentContainerStyle={{ paddingHorizontal: 20 }}
      text1Style={{
        fontSize: 18,
        fontWeight: "bold",
      }}
      text2Style={{
        fontSize: 15,
        color:"green"
      }}
    />
  ),

  error: (props) => (
    <ErrorToast
      {...props}
      style={{ height: 80, borderLeftColor: "#ff0000ff" }}
      text1Style={{
        fontSize: 18,
        fontWeight: "bold",
      }}
      text2Style={{
        fontSize: 15,
        color:"red"
      }}
    />
  ),
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const getCurrentUser = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        console.log("No token found");
        setIsLoggedIn(false);
        return;
      }

      const res = await fetch(`${baseUrl}/user/me`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (!res.ok) {
        console.log("Token invalid, clearing");
        await AsyncStorage.removeItem("token");
        setIsLoggedIn(false);
        return;
      }

      const data = await res.json();

      setIsLoggedIn(true);
    } catch (err) {
      console.log("Auth crash:", err.message);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <StackNav isLoggedIn={isLoggedIn} />
      <Toast config={toastConfig} />
    </>
  );
}
