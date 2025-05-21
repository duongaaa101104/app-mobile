import React, { useState, useEffect } from "react";
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
import { getOrders, saveOrders } from "../utils/orderStorage";

const imageMap = {
  "assets/anh7.png": require("../assets/anh7.png"),
  "assets/giohang1.png": require("../assets/giohang1.png"),
  "assets/giohang2.png": require("../assets/giohang2.png"),
  "assets/giohang3.png": require("../assets/giohang3.png"),
  "assets/anh8.png": require("../assets/anh8.png"),
};

export default function MyBasketScreen() {
  const navigation = useNavigation();
  const [address, setAddress] = useState("10th avenue, Lekki, Lagos State");
  const [phoneNumber, setPhoneNumber] = useState("09090605708");
  const [showDelivery, setShowDelivery] = useState(true);
  const [renderKey, setRenderKey] = useState(0);
  const [orders, setOrders] = useState([]);

  // Fetch orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const storedOrders = await getOrders();
        setOrders(storedOrders || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  // Calculate total price
  const totalPrice = orders.reduce((sum, order) => sum + order.price * order.quantity, 0);

  // Handle item quantity change
  const handleQuantityChange = async (id, newQuantity) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, quantity: newQuantity } : order
    );
    setOrders(updatedOrders);
    try {
      await saveOrders(updatedOrders);
    } catch (error) {
      console.error("Error saving orders:", error);
    }
  };

  // Handle item removal
  const handleRemoveItem = async (id) => {
    const updatedOrders = orders.filter((order) => order.id !== id);
    setOrders(updatedOrders);
    try {
      await saveOrders(updatedOrders);
    } catch (error) {
      console.error("Error saving orders:", error);
    }
  };

  const handleCancelPress = () => {
    console.log("Cancel pressed, hiding delivery section");
    setShowDelivery(false);
    setRenderKey((prev) => prev + 1);
  };

  const handleCheckoutPress = () => {
    console.log("Checkout pressed, showing delivery section");
    setShowDelivery(true);
    setRenderKey((prev) => prev + 1);
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View style={{ flex: 1, position: "relative" }}>
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: "#FFA451",
            borderRadius: 30,
          }}
          contentContainerStyle={{ paddingBottom: 100 }} // Add padding to avoid overlap with footer
        >
          {/* Header Section */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 15,
              paddingHorizontal: 21,
              marginBottom: 50,
              opacity: showDelivery ? 0.5 : 1,
            }}
          >
            <View style={{ backgroundColor: "#FF3B30", borderRadius: 32, paddingVertical: 3 }} />
            <View style={{ flex: 1 }} />
          </View>

          {/* Back Button and Basket Title */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              marginBottom: 50,
              marginLeft: 24,
              opacity: showDelivery ? 0.5 : 1,
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
              onPress={() => navigation.navigate("HomeScreenOne")}
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

          {/* Basket Items Section */}
          <View style={{ backgroundColor: "#FFFFFF", paddingVertical: 20, opacity: showDelivery ? 0.5 : 1 }}>
            {orders.map((order) => (
              <View key={order.id}>
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
                    <Image
                      source={imageMap[order.image]}
                      resizeMode="stretch"
                      style={{ width: 40, height: 40 }}
                    />
                  </TouchableOpacity>

                  <View style={{ flex: 1, marginTop: 9, marginRight: 12 }}>
                    <Text style={{ color: "#000000", fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>
                     {order.name}
                    </Text>

                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <Text style={{ color: "#000000", fontSize: 14 }}>{order.quantity} packs</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center", paddingRight: 3, marginTop: 21 }}>
                    <Image
                      source={require("../assets/iconchuN.png")}
                      resizeMode="stretch"
                      style={{ width: 16, height: 12, marginRight: 4 }}
                    />
                    <Text style={{ color: "#27214D", fontSize: 16, fontWeight: "bold" }}>
                      {order.price * order.quantity}
                    </Text>
                  </View>
                </View>
                <View style={{ height: 1, backgroundColor: "#F4F4F4", marginVertical: 20 }} />
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Fixed Total & Checkout Footer */}
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "#FFFFFF",
            paddingHorizontal: 25,
            paddingVertical: 15,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderTopWidth: 1,
            borderTopColor: "#F4F4F4",
            zIndex: 10,
            opacity: showDelivery ? 0.5 : 1,
          }}
        >
          <View style={{ alignItems: "flex-start" }}>
            <Text style={{ color: "#000000", fontSize: 16, fontWeight: "bold" }}>Total</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../assets/iconchuN.png")}
                resizeMode="stretch"
                style={{ width: 20, height: 16, marginRight: 5 }}
              />
              <Text style={{ color: "#27214D", fontSize: 24, fontWeight: "bold" }}>{totalPrice}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: "center",
              backgroundColor: "#FFA451",
              borderRadius: 15,
              paddingVertical: 15,
              marginLeft: 20,
            }}
            onPress={handleCheckoutPress}
          >
            <Text style={{ color: "#FFFFFF", fontSize: 18, fontWeight: "bold" }}>Checkout</Text>
          </TouchableOpacity>
        </View>

        {/* Delivery Modal */}
        {showDelivery && (
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
                    Delivery Details
                  </Text>

                  <TextInput
                    value={address}
                    onChangeText={setAddress}
                    placeholder="Enter address"
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
                      fontSize: 20,
                      fontWeight: "bold",
                      marginBottom: 10,
                      color: "#27214D",
                    }}
                  >
                    Number we can call
                  </Text>
                  <TextInput
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    placeholder="Enter phone number"
                    keyboardType="phone-pad"
                    style={{
                      borderWidth: 1,
                      borderColor: "#F3F1F1",
                      borderRadius: 10,
                      padding: 20,
                      marginBottom: 20,
                      fontSize: 16,
                      color: "#C2BDBD",
                      width: "100%",
                      backgroundColor: "#F3F1F1",
                    }}
                    autoCapitalize="none"
                    returnKeyType="done"
                  />

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("InputCardDetails", {
                          paymentMethod: "Pay on delivery",
                          address,
                          phoneNumber,
                        })
                      }
                      style={{
                        backgroundColor: "#FFFFFF",
                        paddingVertical: 20,
                        paddingHorizontal: 10,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: "#FFA451",
                        flex: 1,
                        marginRight: 80,
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: "#FFA451",
                          fontWeight: "bold",
                          fontSize: 16,
                        }}
                      >
                        Pay on delivery
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => navigation.navigate("InputCardDetails")}
                      style={{
                        backgroundColor: "#FFFFFF",
                        paddingVertical: 20,
                        paddingHorizontal: 10,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: "#FFA451",
                        flex: 1,
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: "#FFA451",
                          fontWeight: "bold",
                          fontSize: 16,
                        }}
                      >
                        Pay with card
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
    </SafeAreaView>
  );
}