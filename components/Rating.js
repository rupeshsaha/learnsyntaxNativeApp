import { View, Text } from 'react-native'
import { AntDesign,FontAwesome } from "@expo/vector-icons";

const Rating = ({ratingValue, reviewCount}) => {
  return (
    <View style={{ flexDirection: "row", gap: 6, alignItems: "center" }}>
      <Text style={{ color: "gold" }}>{Number(ratingValue).toFixed(1) ?? 0.0}</Text>
      <View style={{ flexDirection: "row" }}>
        <AntDesign name="star" size={14} color="gold" />
        <AntDesign name="star" size={14} color="gold" />
        <AntDesign name="star" size={14} color="gold" />
        <AntDesign name="star" size={14} color="gold" />
        <FontAwesome name="star-half-empty" size={14} color="gold" />
      </View>
      <Text style={{ color: "white" }}>({reviewCount ?? 0})</Text>
    </View>
  );
}

export default Rating