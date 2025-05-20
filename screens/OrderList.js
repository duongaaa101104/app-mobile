import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { getOrders, saveOrders } from "../utils/orderStorage";

// Ánh xạ imageUri sang require
const imageMap = {
  "assets/anh7.png": require("../assets/anh7.png"),
  "assets/giohang1.png": require("../assets/giohang1.png"),
  "assets/giohang2.png": require("../assets/giohang2.png"),
  "assets/giohang3.png": require("../assets/giohang3.png"),
  "assets/anh8.png": require("../assets/anh8.png"),
};

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const navigation = useNavigation();

  const loadOrders = async () => {
    try {
      const savedOrders = await getOrders();
      const validOrders = Array.isArray(savedOrders) ? savedOrders : [];
      setOrders(validOrders);
    } catch (error) {
      console.error("Lỗi tải đơn hàng:", error);
      setOrders([]);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", loadOrders);
    return unsubscribe;
  }, [navigation]);

  const calculateTotalAmount = () => {
    return orders.reduce((total, order) => {
      const price = typeof order.price === "number" ? order.price : parseFloat(order.price) || 0;
      return total + price * order.quantity;
    }, 0);
  };

  const renderItem = ({ item }) => {
    const imageSource = imageMap[item.image];
    const price = typeof item.price === "number" ? item.price : parseFloat(item.price) || 0;

    return (
      <View style={styles.card}>
        {imageSource ? (
          <Image source={imageSource} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.placeholderText}>No Image</Text>
          </View>
        )}
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.quantity}>{item.quantity} packs</Text>
        </View>
        <Text style={styles.price}>₦ {price.toLocaleString()}</Text>
      </View>
    );
  };

  const totalAmount = calculateTotalAmount();

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <View style={styles.topContainer}>
          <TouchableOpacity
            style={styles.backButtonAbsolute}
            onPress={() => {
              console.log("Back button pressed");
              if (navigation.canGoBack()) {
                navigation.goBack();
              } else {
                console.log("No screen to go back to");
              }
            }}
          >
            <AntDesign name="arrowleft" size={24} color="#000" />
            <Text style={styles.backText}>Go back</Text>
          </TouchableOpacity>
          <Text style={styles.header}>My Basket</Text>
        </View>
        <View style={styles.bottomContainer}>
          {orders.length === 0 ? (
            <Text style={styles.emptyText}>No orders yet.</Text>
          ) : (
            <FlatList
              data={orders}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
              contentContainerStyle={{ paddingBottom: 100 }}
            />
          )}
        </View>

        {orders.length > 0 && (
          <View style={styles.totalContainer}>
            <View style={styles.totalWrapper}>
              <Text style={styles.totalText}>Total</Text>
              <Text style={styles.totalAmount}>₦ {totalAmount.toLocaleString()}</Text>
            </View>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={() => navigation.navigate("CompleteDetails")}
            >
              <Text style={styles.checkoutText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default OrderList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  topContainer: {
    backgroundColor: "#ff914d",
    paddingTop: 60,
    paddingBottom: 80,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: "relative",
  },
  backButtonAbsolute: {
    position: "absolute",
    left: 20,
    top: 60,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    elevation: 4,
    zIndex: 10,
  },
  header: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  backText: {
    fontSize: 16,
    color: "#1e1e1e",
    marginLeft: 20,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    marginTop: -20,
  },
  emptyText: {
    fontSize: 16,
    color: "#6e6e6e",
    textAlign: "center",
    marginTop: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 16,
    borderRadius: 8,
  },
  imagePlaceholder: {
    width: 50,
    height: 50,
    marginRight: 16,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  placeholderText: {
    color: "#666",
    fontSize: 12,
  },
  infoContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  quantity: {
    fontSize: 14,
    color: "#000",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4a4a4a",
    marginLeft: 16,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  totalWrapper: {
    flexDirection: "column",
  },
  totalText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#666",
    marginBottom: 5,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#666",
  },
  checkoutButton: {
    backgroundColor: "#ff914d",
    width: 156,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  checkoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});