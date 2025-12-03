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
import { createContext, useMemo, useState } from "react";
import Checkout from "./screens/Checkout";

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
      screenOptions={{ tabBarStyle: { backgroundColor: "black", height:60 } }}
    >
      <Tabs.Screen
        name="Featured"
        component={Featured}
        options={{
          tabBarIcon: (focused) => (
            <Feather name="star" size={26} color="white" />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
          tabBarIcon: (focused) => (
            <Entypo name="magnifying-glass" size={26} color="white" />
          ),
        }}
      />
      <Tabs.Screen
        name="My Learning"
        component={MyLearning}
        options={{
          tabBarIcon: (focused) => (
            <AntDesign name="play-circle" size={26} color="white" />
          ),
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="Wishlist"
        component={Wishlist}
        options={{
          tabBarIcon: (focused) => (
            <Feather name="heart" size={26} color="white" />
          ),
        }}
      />
      <Tabs.Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon: (focused) => (
            <FontAwesome5 name="user-circle" size={26} color="white" />
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
        <Stack.Navigator initialRouteName="login">
          <Stack.Screen
            name="login"
            component={LoginScreen}
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

export default function App() {
  return (
    <>
      <StackNav />
    </>
  );
}
