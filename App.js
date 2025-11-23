import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/_tabs/Home';
import Course from './screens/_tabs/Course';
import Contact from './screens/_tabs/Contact';
import About from './screens/_tabs/About';
import { NavigationContainer } from '@react-navigation/native';
import { Feather, Entypo, AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import Search from './screens/_tabs/Search';


const Tabs = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const TabNav = () => {
  return (
    <Tabs.Navigator initialRouteName="Featured" >
      <Tabs.Screen
        name="Featured"
        component={Home}
        options={{
          tabBarIcon: (focused) => <Feather name="star" size={24} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: (focused) => (
            <Entypo name="magnifying-glass" size={24} color="black" />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="My Learning"
        component={Search}
        options={{
          tabBarIcon: (focused) => (
            <AntDesign name="play-circle" size={24} color="black" />
          ),
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="Wishlist"
        component={Contact}
        options={{
          tabBarIcon: (focused) => (
            <Feather name="heart" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="Account"
        component={About}
        options={{
          tabBarIcon: (focused) => (
            <FontAwesome5 name="user-circle" size={24} color="black" />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}

const StackNav = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='login'>
            <Stack.Screen name="login" component={LoginScreen} options={{
              headerShown:false
            }}/>
            <Stack.Screen name="main" component={TabNav} options={{
              headerShown:false,
            }}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default function App() {
  return ( 
    <>
    <StackNav/>
    </>
  
  );
}
