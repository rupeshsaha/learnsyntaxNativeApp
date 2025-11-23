import { View, Text, ScrollView, Image } from "react-native";
import courses from "../../data";
import { Feather, MaterialIcons } from "@expo/vector-icons";

const Course = () => {
  return (
    <View style={{ paddingHorizontal: 10, width: "100%" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          style={{
            fontSize: 20,
            marginBottom: 20,
            paddingVertical: 10,
            fontWeight: 500,
          }}
        >
          Explore our vast range of course, taught by professionals.
        </Text>

        {courses.map((course, idx) => (
          <View
            key={idx}
            style={{
              marginBottom: 6,
              borderWidth: 3,
              borderRadius: 10,
              backgroundColor: "#B7B3F2",
              marginBottom: 20,
            }}
          >
            <Image
              style={{
                minWidth: "100%",
                minHeight:200,
                backgroundColor: "#f9f871",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
              width={100}
              source={{ uri: course.img_url }}
            />
            <View
              style={{
                height: 170,
                justifyContent: "space-between",
                paddingVertical: 4,
                paddingHorizontal: 4,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: 600 }}>
                {course.title}
                {` - ${course.code}`}
              </Text>
              <Text style={{ fontSize: 15 }}>{course.description}</Text>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
              >
                <Feather name="clock" size={22} color="black" />
                <Text style={{ fontSize: 16 }}>
                  {course.durationWeeks} weeks
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Course;
