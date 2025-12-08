import { View, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Rating from "./Rating";
import { PURPLE } from "../lib/constants";

const CartItem = ({ data, isCheckoutPage = false }) => {
  const navigation = useNavigation();
  return (
    <View style={{ width: "100%", gap: 10, alignItems: "center" }}>
      <View
        style={{ backgroundColor: "gray", height: 1, alignSelf: "stretch" }}
      ></View>

      <View style={{ width: "95%", flexDirection: "row", gap: 6 }}>
        <Image source={{ uri: data.image }} height={50} width={50} />

        {isCheckoutPage && (
          <View style={{ gap: 8 }}>
            <Text
              onPress={() => navigation.navigate("Course details", { data })}
              style={{ fontWeight: "bold", fontSize: 16, color: "white" }}
            >
              {data.title}
            </Text>
          </View>
        )}

        {!isCheckoutPage && (
          <View style={{ gap: 8, maxWidth: "70%" }}>
            <Text
              onPress={() => navigation.navigate("Course details", { data })}
              style={{ fontWeight: "bold", fontSize: 18, color: "white" }}
            >
              {data.title}
            </Text>
            <Rating ratingValue={4.6} />
            <Text style={{ fontSize: 12, color: "white" }}>
              55 total hours • 500 lectures • Beginner Level
            </Text>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Text
                style={{ color: PURPLE, fontWeight: "light", fontSize: 12 }}
              >
                Remove
              </Text>
              <Text
                style={{ color: PURPLE, fontWeight: "light", fontSize: 12 }}
              >
                Save for Later
              </Text>
              <Text
                style={{ color: PURPLE, fontWeight: "light", fontSize: 12 }}
              >
                Move to Wishlist
              </Text>
            </View>
          </View>
        )}

        <View style={{ marginLeft: `${isCheckoutPage ? "auto" : ""}` }}>
          <Text
            style={{
              color: `${isCheckoutPage ? "white" : PURPLE}`,
              fontSize: 22,
              fontWeight: 600,
            }}
          >
            ₹{data.price}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CartItem;
