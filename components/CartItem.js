import { View, Text, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Rating from "./Rating";
import { PURPLE } from "../lib/constants";


const CartItem = ({ data,  }) => {
  const navigation = useNavigation();
  return (
    <View style={{ width: "100%", gap: 10, alignItems: "center" }}>
      <View
        style={{ backgroundColor: "gray", height: 1, alignSelf: "stretch" }}
      ></View>

      <View style={{ width: "95%", flexDirection: "row", gap: 6 }}>
        <Image source={{ uri: data.image_url }} height={50} width={50} />

        

        { (
          <View style={{ gap: 8, maxWidth: "70%" }}>
            <Text
              onPress={() => navigation.navigate("Course details", { data })}
              style={{ fontWeight: "bold", fontSize: 18, color: "white" }}
            >
              {data.title}
            </Text>
            <Rating
              ratingValue={data.average_rating}
              reviewCount={data.review_count}
            />

            <Text style={{ fontSize: 12, color: "white" }}>
              55 total hours • 500 lectures • Beginner Level
            </Text>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Pressable onPress={() => {}}>
                <Text
                  style={{ color: PURPLE, fontWeight: "light", fontSize: 12 }}
                >
                  Remove
                </Text>
              </Pressable>
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

        <View>
          <Text
            style={{
              color: `${"white"}`,
              fontSize: 22,
              fontWeight: 600,
            }}
          >
            ₹{data.discount_price}
          </Text>
          <Text
            style={{
              color: `${ "rgba(173, 173, 173, 1)" }`,
              fontSize: 16,
              fontWeight: 400,
              textDecorationLine: "line-through",
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
