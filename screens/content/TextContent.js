import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../../lib/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { SafeAreaView } from 'react-native-safe-area-context';
import removeMarkdown from 'markdown-to-text';





const TextContent = ({ route }) => {
    const { id } = route.params;
    const [data, setData] = useState()
    

    const fetchContent = async () => {
        try {
            const res = await fetch(`${baseUrl}/content/${id}/text`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization" :`Token ${await AsyncStorage.getItem("token")}`
                    }
                    
              }
            )
            if (!res.ok) {
                Toast.show({type:"error",text1:"Error", text2:"Error while fetching content"})
            }
            const data = await res.json()
            setData(data)
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchContent()
    },[id])

    if (!data) return;


  return (
    <SafeAreaView
      style={{
        backgroundColor: "black",
        height: "100%",
        paddingHorizontal: 20,
      }}
    >
      <Text style={{ color: "white", fontSize: 18 }}>
        {removeMarkdown(data.content)}
      </Text>
    </SafeAreaView>
  );
}

export default TextContent