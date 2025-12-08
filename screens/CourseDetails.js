import { View, Text, Image, ScrollView, Pressable } from "react-native";
import React, { createContext, useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { SECTIONS } from "../data";
import { PURPLE } from "../lib/constants";
import Rating from "../components/Rating";
import { CartContext } from "../App";
import { useNavigation } from "@react-navigation/native";

const CourseDetails = ({ route }) => {
  const { data } = route.params;
  const navigation = useNavigation();

  const levelIcons = {
    beginner: <FontAwesome5 name="seedling" size={14} color="white" />,
    intermediate: <FontAwesome5 name="leaf" size={14} color="white" />,
    advanced: <FontAwesome5 name="tree" size={14} color="white" />,
  };

  const [openSections, setOpenSections] = useState({});
  const [existsInCart, setExistsInCart] = useState(false);

  useEffect(() => {
    //  auto-open the first section
    setOpenSections((prev) => ({ ...prev, [SECTIONS[0]?.id]: true }));
  }, [SECTIONS]);

  const toggleSection = (id) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const { addItem, items } = useContext(CartContext);

  useEffect(() => {
    alreadyExistsInCart();
  }, [items]);

  const alreadyExistsInCart = () => {
    const exists = items.find((item) => item.id === data.id);
    if (exists) setExistsInCart(true);
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: "black",
        height: "100%",
        paddingHorizontal: 10,
      }}
    >
      <ScrollView contentContainerStyle={{ gap: 10 }}>
        <Image
          source={{
            uri: data.image_url,
          }}
          height={240}
          width={"100%"}
          style={{ borderRadius: 10 }}
        />
        <Text style={{ color: "white", fontSize: 22 }}>{data.title}</Text>
        <Text style={{ color: "white", fontSize: 16 }}>{data.description}</Text>

        {/* Ratings */}
        <Rating ratingValue={data.rating} />

        {/* Features */}

        <View style={{ marginTop: 16, gap: 8 }}>
          <View style={{ flexDirection: "row", gap: 6, alignItems: "center" }}>
            <AntDesign name="info-circle" size={14} color="white" />
            <Text style={{ color: "white", fontSize: 14 }}>
              Last updated {new Date(data.updated_at).toLocaleDateString()}
            </Text>
          </View>

          <View style={{ flexDirection: "row", gap: 6, alignItems: "center" }}>
            <AntDesign name="global" size={14} color="white" />
            <Text style={{ color: "white", fontSize: 14 }}>English</Text>
          </View>

          <View style={{ flexDirection: "row", gap: 6, alignItems: "center" }}>
            {levelIcons[data?.level?.toLowerCase()] || null}

            <Text style={{ color: "white", fontSize: 14 }}>{data.level}</Text>
          </View>
        </View>

        <Text
          style={{
            color: "white",
            fontSize: 22,
            fontWeight: 700,
            marginVertical: 10,
          }}
        >
          ₹{data.price}
        </Text>

        <View style={{ gap: 12 }}>
          <View
            style={{
              backgroundColor: PURPLE,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: 600, fontSize: 18, color: "white" }}>
              Buy Now
            </Text>
          </View>

          <View style={{ gap: 6, flexDirection: "row", maxWidth: "100%" }}>
            {!existsInCart ? (
              <Pressable
                onPress={() => addItem(data)}
                style={{
                  borderWidth: 2,
                  borderColor: "white",
                  height: 50,
                  width: "49%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white", fontSize: 16 }}>
                  Add to Cart
                </Text>
              </Pressable>
            ) : (
              <Pressable
                onPress={() => navigation.navigate("Cart")}
                style={{
                  borderWidth: 2,
                  borderColor: "white",
                  height: 50,
                  width: "49%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white", fontSize: 16 }}>Go to Cart</Text>
              </Pressable>
            )}

            <View
              style={{
                borderWidth: 2,
                borderColor: "white",
                height: 50,
                width: "49%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontSize: 16 }}>
                Add to wishlist
              </Text>
            </View>
          </View>
        </View>

        <View style={{ marginVertical: 8, gap: 8 }}>
          <Text style={{ color: "white", fontWeight: 700, fontSize: 18 }}>
            What you'll learn
          </Text>
          <View style={{ gap: 4 }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <View
                key={i}
                style={{ flexDirection: "row", gap: 6, alignItems: "center" }}
              >
                <AntDesign name="check" size={18} color="white" />
                <Text style={{ color: "white" }}>
                  Write efficient python programs from scratch, usin Git for
                  version control
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ gap: 10 }}>
          <Text style={{ color: "white", fontWeight: 700, fontSize: 18 }}>
            Cirriculum
          </Text>
          <View>
            <Text style={{ color: "white", fontSize: 12 }}>
              32 sections • 251 lectures • 32h 5m total length
            </Text>
          </View>
          <View style={{ gap: 28 }}>
            {SECTIONS.map((section) => (
              <View key={section.id}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: "white", fontSize: 20 }}>
                    Section {section.id} - {section.title}
                  </Text>
                  <Pressable onPress={() => toggleSection(section.id)}>
                    {openSections[section.id] ? (
                      <AntDesign name="minus" size={20} color="white" />
                    ) : (
                      <AntDesign name="plus" size={20} color="white" />
                    )}
                  </Pressable>
                </View>
                {openSections[section.id] &&
                  section.lessons.map((lesson, idx) => (
                    <View
                      key={idx}
                      style={{ flexDirection: "row", padding: 8 }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontSize: 14,
                          paddingHorizontal: 20,
                        }}
                      >
                        {lesson.id}
                      </Text>
                      <Text
                        key={idx}
                        style={{
                          color: "white",
                          fontSize: 14,
                          fontWeight: 600,
                        }}
                      >
                        {lesson.title}
                      </Text>
                    </View>
                  ))}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CourseDetails;
