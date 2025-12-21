import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { baseUrl, PURPLE } from "../lib/constants";
import Toast from "react-native-toast-message";

const ForgotPasswordScreen = () => {
  const [identifier, setIdentifier] = useState();
    const [OtpValue, setOtpValue] = useState();
    const [newPassword,setNewPassword ] = useState()
  const [currentStage, setCurrentStage] = useState("send_otp");
  const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    
  const handleSendOtp = async () => {
    try {
      setLoading(true);

      if (!identifier?.trim()) {
        return Toast.show({
          type: "error",
          text1: "Error",
          text2: "Username or email required",
        });
      }
      const res = await fetch(`${baseUrl}/auth/forget_password/`,
          {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({email: identifier, username: identifier})
          }
      )

      if (!res.ok) {
        return Toast.show({
          type: "error",
          text1: "Error",
          text2: "Error while sending OTP",
        });
      }
      const data = await res.json()
      // console.log(data)
      Toast.show({
        type: "success",
        text1: "Success",
        text2: data.message,
      });
      setCurrentStage("reset_password");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    };
    
    
    
    const handleResetPassword = async () => {
        console.log(identifier, newPassword)
         try {
           const res = await fetch(`${baseUrl}/auth/reset_password/`, {
             method: "POST",
             headers: {
               "Content-Type": "application/json",
             },
             body: JSON.stringify({
               email: identifier.trim(),
               otp: OtpValue,
               new_password: newPassword,
             }),
           });
           const data = await res.json();
           console.log(data);
           if (!res.ok) {
             return Toast.show({
               type: "error",
               text1: "Error",
               text2: "Error while resetting password",
             });
             }
           Toast.show({
             type: "success",
             text1: "Success",
             text2: data.message,
           });
           navigation.navigate("login",{data:{email:identifier,password:newPassword}})
         } catch (error) {
           console.log(error);
         }
    }

  const handleNumericChange = (text) => {
    
      const numericValue = text.replace(/[^0-9]/g, "");
      if(numericValue.length < 0 || numericValue.length >5) return
    setOtpValue(numericValue);
  };
  if (currentStage === "send_otp") {
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
          Forgot Password
        </Text>

        <TextInput
          style={{
            height: 40,
            minWidth: "90%",
            borderBottomWidth: 2,
            borderBottomColor: "white",
            color: "white",
          }}
          placeholderTextColor={"white"}
          placeholder="Username or Email"
          value={identifier}
          onChangeText={setIdentifier}
        />

        <Pressable
          onPress={() => handleSendOtp()}
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
          <Text style={{ color: "white", fontSize: 18, fontWeight: 700 }}>
            Get OTP
          </Text>
        </Pressable>

        <View
          style={{
            flexDirection: "row",
            gap: 10,
            justifyContent: "space-around",
          }}
        >
          <Pressable onPress={() => navigation.navigate("login")}>
            <Text style={{ color: PURPLE, fontWeight: "bold" }}>Log in</Text>
          </Pressable>
          <Text style={{ color: PURPLE, fontWeight: "bold" }}>|</Text>

          <Pressable onPress={() => navigation.navigate("register")}>
            <Text style={{ color: PURPLE, fontWeight: "bold" }}>
              Create Account
            </Text>
          </Pressable>
        </View>
      </View>
    );
  } else if (currentStage === "reset_password") {
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
             Reset Password
           </Text>

          
           <TextInput
             style={{
               height: 40,
               minWidth: "90%",
               borderBottomWidth: 2,
               borderBottomColor: "white",
               color: "white",
             }}
             placeholderTextColor={"white"}
             placeholder="Enter OTP"
             value={OtpValue}
             onChangeText={handleNumericChange}
           />
           <TextInput
             style={{
               height: 40,
               minWidth: "90%",
               borderBottomWidth: 2,
               borderBottomColor: "white",
               color: "white",
             }}
             placeholderTextColor={"white"}
             placeholder="New Password"
             value={newPassword}
             onChangeText={setNewPassword}
           />

           <Pressable
             onPress={() => handleResetPassword()}
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
             <Text style={{ color: "white", fontSize: 18, fontWeight: 700 }}>
               Reset Password
             </Text>
           </Pressable>

           
         </View>
       );
  }
};

export default ForgotPasswordScreen;
