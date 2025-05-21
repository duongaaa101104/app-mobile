import React from "react";
import { SafeAreaView, View, ScrollView, Text, Image, TouchableOpacity } from "react-native";

export default ({ navigation }) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
      }}
    >
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "#FFFFFF",
          borderRadius: 32,
        }}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Header Section (Status Bar) */}
        <View
          style={{
            alignSelf: "stretch",
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 12,
            paddingHorizontal: 21,
            marginBottom: 117,
          }}
        >
          <View
            style={{
              backgroundColor: "#FF3B30",
              borderRadius: 32,
              paddingVertical: 2,
            }}
          >
          </View>
          <View
            style={{
              flex: 1,
              alignSelf: "stretch",
            }}
          />
    
        </View>

        <View
          style={{
            alignItems: "center", 
            marginBottom: 56,
          }}
        >
          <TouchableOpacity
            style={{
              alignItems: "center",
              backgroundColor: "#E0FFE5",
              borderColor: "#4CD964",
              borderRadius: 100, 
              borderWidth: 2,
              padding: 32,
              marginBottom: 56,
            }}
            onPress={() => alert("Pressed!")}
          >
            <View
              style={{
                backgroundColor: "#4CD964",
                borderRadius: 100,
                padding: 29,
              }}
            >
              <Image
                source={require("../assets/icontich.png")}
                resizeMode={"stretch"}
                style={{
                  width: 42,
                  height: 42,
                }}
              />
            </View>
          </TouchableOpacity>

          <Text
            style={{
              color: "#27214D",
              fontSize: 32,
              fontWeight: "bold",
              marginBottom: 16,
              textAlign: "center",
            }}
          >
            {"Congratulations!!!"}
          </Text>

          <Text
            style={{
              color: "#27214D",
              fontSize: 20,
              textAlign: "center",
              width: 290,
            }}
          >
            {"Your order have been taken and is being attended to"}
          </Text>
        </View>

        {/* Buttons */}
        <TouchableOpacity
          style={{
            backgroundColor: "#FFA451",
            borderColor: "#FFA451",
            borderRadius: 10,
            borderWidth:1,
            paddingVertical: 22,
            paddingHorizontal: 30,
            marginBottom: 16, 
            width: 160, 
            alignItems: "center",
          }}
          onPress={() => navigation.navigate("TrackOrder")}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            {"Track order"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            borderColor: "#FFA451",
            borderRadius: 10,
            borderWidth: 1,
            paddingVertical: 25,
            paddingHorizontal: 32,
            marginBottom: 108,
            width: 220, // Fixed width to match "Track order" button
            alignItems: "center",
            top:35,
          }}
          onPress={() => navigation.navigate("HomeScreenOne")}
        >
          <Text
            style={{
              color: "#FFA451",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            {"Continue shopping"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};