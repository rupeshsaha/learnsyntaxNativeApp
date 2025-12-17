import {  Text } from 'react-native'
import  { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { baseUrl } from '../../lib/constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-toast-message'

const QuizContent = ({ route }) => {
    const { id } = route.params
     const [data, setData] = useState();

     const fetchContent = async () => {
       try {
         const res = await fetch(`${baseUrl}/quiz/${id}/details/`, {
           method: "GET",
           headers: {
             "Content-Type": "application/json",
             Authorization: `Token ${await AsyncStorage.getItem("token")}`,
           },
         });
         if (!res.ok) {
           Toast.show({
             type: "error",
             text1: "Error",
             text2: "Error while fetching content",
           });
         }
         const data = await res.json();
         setData(data);
       } catch (error) {
         console.log(error);
       }
     };

     useEffect(() => {
         fetchContent();
         console.log(data);
     }, [id]);

     if (!data) return;
  return (
    <SafeAreaView style={{backgroundColor:"black", height:"100%",paddingHorizontal:20}}>
          <Text style={{ color: "white", fontSize: 18 }}>{data?.title}</Text>
          <Text style={{ color: "white", fontSize: 18 }}>{data?.description}</Text>
          <Text style={{ color: "white", fontSize: 18 }}>{data?.attempts_allowed}</Text>
          <Text style={{ color: "white", fontSize: 18 }}>{data?.questions_count}</Text>
          <Text style={{ color: "white", fontSize: 18 }}>{data?.user_attempts}</Text>
          <Text style={{ color: "white", fontSize: 18 }}>{data?.passing_score}</Text>
          <Text style={{ color: "white", fontSize: 18 }}>{data?.best_score ?? 0}</Text>
    </SafeAreaView>
  )
}

export default QuizContent