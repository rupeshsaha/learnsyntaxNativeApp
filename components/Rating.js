import { View, Text } from 'react-native'
import { AntDesign,FontAwesome } from "@expo/vector-icons";

const Rating = ({ratingValue}) => {
  return (
    <View style={{ flexDirection: "row", gap: 6, alignItems: "center" }}>
      <Text style={{ color: "gold" }}>{ratingValue}</Text>
      <View style={{ flexDirection: "row" }}>
        <AntDesign name="star" size={14} color="gold" />
        <AntDesign name="star" size={14} color="gold" />
        <AntDesign name="star" size={14} color="gold" />
        <AntDesign name="star" size={14} color="gold" />
        <FontAwesome name="star-half-empty" size={14} color="gold" />
      </View>
      <Text style={{ color: "white" }}>(255)</Text>
    </View>
  );
}

export default Rating