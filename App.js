import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { NavigationContainer } from "@react-navigation/native";
import { Feather, Entypo, AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import Featured from "./screens/_tabs/Featured";
import MyLearning from "./screens/_tabs/MyLearning";
import Account from "./screens/_tabs/Account";
import CourseDetails from "./screens/CourseDetails";
import { createContext,  useMemo, useState } from "react";
import Checkout from "./screens/Checkout";
import RegisterScreen from "./screens/RegisterScreen";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import LearningScreen from "./screens/LearningScreen";
import QuizContent from "./screens/content/QuizContent";
import TextContent from "./screens/content/TextContent";

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
        tabBarStyle: {
          backgroundColor: "black",
          height: 70,
          alignItems: "center",
        },
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
        name="My Learning"
        component={MyLearning}
        options={{
          tabBarIcon: (focused) => (
            <AntDesign name="play-circle" size={28} color="white" />
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

const StackNav = () => {
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
        <Stack.Navigator
          initialRouteName={"main"}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="login" component={LoginScreen} />
          <Stack.Screen name="register" component={RegisterScreen} />
          <Stack.Screen
            name="forgotpassword"
            component={ForgotPasswordScreen}
          />
          <Stack.Screen name="main" component={TabNav} />
          <Stack.Screen name="Course details" component={CourseDetails} />
          <Stack.Screen name="checkout" component={Checkout} />
          <Stack.Screen name="learning" component={LearningScreen} />
          <Stack.Screen name="quiz_content" component={QuizContent} />
          <Stack.Screen name="text_content" component={TextContent} />
          
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
        color: "green",
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
        color: "red",
      }}
    />
  ),
};

export default function App() {
  return (
    <>
      <StackNav />
      <Toast config={toastConfig} />
    </>
  );
}
