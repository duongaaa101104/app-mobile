import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function InputCardDetailsScreen() {
  const navigation = useNavigation();
  const [cardHolderName, setCardHolderName] = useState("Adolphus Chris");
  const [cardNumber, setCardNumber] = useState("1234 5678 9012 1314");
  const [expiryDate, setExpiryDate] = useState("10/30");
  const [ccv, setCcv] = useState("123");
  const [showCardDetails, setShowCardDetails] = useState(true);

  const handleCancelPress = () => {
    console.log("Cancel pressed, navigating back");
    setShowCardDetails(false);
    navigation.goBack();
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleCompleteOrderPress = () => {
    console.log("Complete Order pressed");
    // Navigate to the next screen or perform order completion logic
    navigation.navigate("OrderComplete", {
      cardHolderName,
      cardNumber,
      expiryDate,
      ccv,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View style={{ flex: 1, position: "relative" }}>
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: "#FFA451",
            borderRadius: 30,
            marginBottom: -100,
          }}
        >
          {/* Header Section */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 15,
              paddingHorizontal: 21,
              marginBottom: 50,
              opacity: showCardDetails ? 0.5 : 1,
            }}
          >
            <View style={{ backgroundColor: "#FF3B30", borderRadius: 32, paddingVertical: 3 }} />
            <View style={{ flex: 1 }} />
          </View>

          {/* Back Button and Title */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              marginBottom: 50,
              marginLeft: 24,
              opacity: showCardDetails ? 0.5 : 1,
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#FFFFFF",
                borderRadius: 100,
                paddingVertical: 6,
                paddingLeft: 8,
                paddingRight: 10,
                marginRight: 34,
              }}
              onPress={() => navigation.goBack()}
            >
              <Image
                source={require("../assets/Vector.png")}
                resizeMode="stretch"
                style={{ width: 10, height: 25, marginRight: 4 }}
              />
              <Text style={{ color: "#27214D", fontSize: 16 }}>Go back</Text>
            </TouchableOpacity>

            <Text style={{ color: "#FFFFFF", fontSize: 24, fontWeight: "bold" }}>My Basket</Text>
          </View>

          {/* Basket Items Section (unchanged from Complete Details) */}
          <View style={{ backgroundColor: "#FFFFFF", paddingVertical: 77, opacity: showCardDetails ? 0.5 : 1 }}>
            <View style={{ flexDirection: "row", alignItems: "flex-start", paddingHorizontal: 24 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#F1EFF6",
                  borderRadius: 10,
                  paddingVertical: 12,
                  paddingHorizontal: 13,
                  marginRight: 16,
                }}
                onPress={() => alert("Pressed!")}
              >
                <Image source={require("../assets/anh7.png")} resizeMode="stretch" style={{ width: 40, height: 40 }} />
              </TouchableOpacity>

              <View style={{ flex: 1, marginTop: 9, marginRight: 12 }}>
                <Text style={{ color: "#000000", fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>
                  Quinoa fruit salad
                </Text>
                <Text style={{ color: "#000000", fontSize: 14 }}>2packs</Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center", paddingRight: 3, marginTop: 21 }}>
                <Image
                  source={require("../assets/iconchuN.png")}
                  resizeMode="stretch"
                  style={{ width: 16, height: 12, marginRight: 4 }}
                />
                <Text style={{ color: "#27214D", fontSize: 16, fontWeight: "bold" }}>20,000</Text>
              </View>
            </View>

            <View style={{ height: 1, backgroundColor: "#F4F4F4", marginBottom: 31 }} />
          </View>
        </ScrollView>

        {/* Card Details Modal */}
        {showCardDetails && (
          <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: -35,
                backgroundColor: "rgba(0,0,0,0.3)",
                justifyContent: "flex-end",
                alignItems: "center",
                paddingHorizontal: 2,
                zIndex: 1000,
                borderRadius: 30,
              }}
            >
              <View
                style={{
                  width: "100%",
                  position: "relative",
                }}
              >
                <TouchableOpacity
                  onPress={handleCancelPress}
                  style={{
                    position: "absolute",
                    top: 0,
                    alignSelf: "center",
                    zIndex: 1100,
                  }}
                >
                  <Image
                    source={require("../assets/Cancel.png")}
                    resizeMode="contain"
                    style={{ width: 48, height: 48 }}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    width: "100%",
                    backgroundColor: "#fff",
                    borderRadius: 10,
                    padding: 30,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: -10 },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 5,
                    marginTop: 60,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      marginBottom: 20,
                      color: "#27214D",
                    }}
                  >
                    Card Details
                  </Text>

                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      marginBottom: 10,
                      color: "#27214D",
                    }}
                  >
                    Card Holder Name
                  </Text>
                  <TextInput
                    value={cardHolderName}
                    onChangeText={setCardHolderName}
                    placeholder="Enter card holder name"
                    style={{
                      borderWidth: 1,
                      borderColor: "#F3F1F1",
                      backgroundColor: "#F3F1F1",
                      borderRadius: 10,
                      padding: 20,
                      marginBottom: 15,
                      fontSize: 16,
                      color: "#C2BDBD",
                      width: "100%",
                    }}
                    autoCapitalize="none"
                    returnKeyType="done"
                  />

                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      marginBottom: 10,
                      color: "#27214D",
                    }}
                  >
                    Card Number
                  </Text>
                  <TextInput
                    value={cardNumber}
                    onChangeText={setCardNumber}
                    placeholder="Enter card number"
                    keyboardType="numeric"
                    style={{
                      borderWidth: 1,
                      borderColor: "#F3F1F1",
                      backgroundColor: "#F3F1F1",
                      borderRadius: 10,
                      padding: 20,
                      marginBottom: 15,
                      fontSize: 16,
                      color: "#C2BDBD",
                      width: "100%",
                    }}
                    autoCapitalize="none"
                    returnKeyType="done"
                  />

                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={{ flex: 1, marginRight: 15 }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "bold",
                          marginBottom: 10,
                          color: "#27214D",
                        }}
                      >
                        Date
                      </Text>
                      <TextInput
                        value={expiryDate}
                        onChangeText={setExpiryDate}
                        placeholder="MM/YY"
                        keyboardType="numeric"
                        style={{
                          borderWidth: 1,
                          borderColor: "#F3F1F1",
                          backgroundColor: "#F3F1F1",
                          borderRadius: 10,
                          padding: 20,
                          marginBottom: 20,
                          fontSize: 16,
                          color: "#C2BDBD",
                          width: "100%",
                        }}
                        autoCapitalize="none"
                        returnKeyType="done"
                      />
                    </View>

                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "bold",
                          marginBottom: 10,
                          color: "#27214D",
                        }}
                      >
                        CCV
                      </Text>
                      <TextInput
                        value={ccv}
                        onChangeText={setCcv}
                        placeholder="CCV"
                        keyboardType="numeric"
                        style={{
                          borderWidth: 1,
                          borderColor: "#F3F1F1",
                          backgroundColor: "#F3F1F1",
                          borderRadius: 10,
                          padding: 20,
                          marginBottom: 20,
                          fontSize: 16,
                          color: "#C2BDBD",
                          width: "100%",
                        }}
                        autoCapitalize="none"
                        returnKeyType="done"
                      />
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={handleCompleteOrderPress}
                    style={{
                      backgroundColor: "#FFA451",
                      paddingVertical: 20,
                      paddingHorizontal: 10,
                      borderRadius: 10,
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "#FFFFFF",
                        fontWeight: "bold",
                        fontSize: 16,
                      }}
                    >
                      Complete Order
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
    </SafeAreaView>
  );
}