import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getOrders, saveOrders } from "../utils/orderStorage";

// Lấy chiều cao màn hình
const { height } = Dimensions.get("window");

// Ánh xạ imageUri sang require
const imageMap = {
  "assets/anh7.png": require("../assets/anh7.png"),
  "assets/giohang1.png": require("../assets/giohang1.png"),
  "assets/giohang2.png": require("../assets/giohang2.png"),
  "assets/giohang3.png": require("../assets/giohang3.png"),
  "assets/anh8.png": require("../assets/anh8.png"),
};

// Hàm định dạng số với dấu phẩy
const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const AddToBasket = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { name, price, image, imageUri } = route.params;
  const [quantity, setQuantity] = useState(1);

  // Chuyển price thành số để tính toán (loại bỏ dấu phẩy)
  const basePrice = parseFloat(price.replace(",", ""));
  const totalPrice = basePrice * quantity;

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  // Hàm gộp các sản phẩm giống nhau
  const mergeOrders = (ordersList) => {
    const map = new Map();
    ordersList.forEach((order) => {
      const key = `${order.title}-${order.price}`;
      if (map.has(key)) {
        const existing = map.get(key);
        existing.quantity += order.quantity;
      } else {
        map.set(key, { ...order });
      }
    });
    return Array.from(map.values());
  };

  const handleAddToBasket = async () => {
    try {
      const newOrder = {
        id: Date.now().toString(),
        title: name,
        quantity: quantity,
        price: basePrice,
        image: imageUri || (typeof image === "string" ? image : ""),
        date: new Date().toLocaleString(),
      };

      const currentOrders = await getOrders();
      const updatedOrders = [...currentOrders, newOrder];
      const mergedOrders = mergeOrders(updatedOrders);

      await saveOrders(mergedOrders);
      navigation.navigate("OrderList");
    } catch (error) {
      console.error("Lỗi thêm vào giỏ hàng:", error);
    }
  };

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContent}
    >
      <View style={styles.topContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Image source={require("../assets/Vector.png")} style={styles.backIcon} />
          <Text style={styles.backText}>Go back</Text>
        </TouchableOpacity>
        <Image
          source={imageMap[imageUri] || image || { uri: imageUri }}
          style={styles.foodImage}
        />
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.foodName}>{name}</Text>
        <View style={styles.priceCounterRow}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={handleDecrease} style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity onPress={handleIncrease} style={styles.quantityButton}>
              <Image source={require("../assets/iconcong.png")} />
            </TouchableOpacity>
          </View>
          <View style={styles.priceContainer}>
            <Image source={require("../assets/iconchuN.png")} style={styles.currencyIcon} />
            <Text style={styles.priceText}>{formatPrice(totalPrice)}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.descriptionTitle}>One Pack Contains:</Text>
          <Image source={require("../assets/Line7.png")} style={styles.divider} />
          <Text style={styles.description}>
            Red Quinoa, Lime, Honey, Blueberries, Strawberries, Mango, Fresh mint
          </Text>
          <Text style={styles.subDescription}>
            If you are looking for a new fruit salad to eat today, quinoa is the perfect brunch for you. Make
          </Text>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.heartButton}>
            <Image source={require("../assets/traitim.png")} style={styles.heartIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton} onPress={handleAddToBasket}>
            <Text style={styles.addButtonText}>Add to basket</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default AddToBasket;

// Styles remain unchanged
const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  topContainer: {
    backgroundColor: "#ff914d",
    paddingTop: 20,
    paddingBottom: 0,
    alignItems: "center",
  },
  backButton: {
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "center",
    marginLeft: 15,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  backIcon: {
    width: 10,
    height: 20,
    marginRight: 6,
  },
  backText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  foodImage: {
    width: 300,
    height: 300,
    borderRadius: 150,
    marginBottom: 10,
  },
  bottomContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    marginTop: -20,
    minHeight: height - 300,
  },
  foodName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#27214D",
    marginBottom: 15,
  },
  priceCounterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F9",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#27214D",
  },
  quantity: {
    fontSize: 18,
    marginHorizontal: 15,
    color: "#27214D",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  currencyIcon: {
    width: 18,
    height: 15,
    marginRight: 2,
  },
  priceText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#27214D",
  },
  section: {
    marginVertical: 12,
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#27214D",
    marginBottom: 10,
    marginTop: 50,
  },
  divider: {
    width: "100%",
    height: 1,
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    color: "#27214D",
    marginBottom: 10,
    marginTop: 35,
  },
  subDescription: {
    fontSize: 16,
    color: "#000000",
    marginBottom: 20,
    marginTop: 30,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  heartButton: {
    backgroundColor: "#fff5ec",
    padding: 12,
    borderRadius: 12,
  },
  heartIcon: {
    width: 24,
    height: 24,
  },
  addButton: {
    backgroundColor: "#FF8C00",
    paddingVertical: 20,
    borderRadius: 10,
    alignItems: "center",
    flex: 1,
    marginLeft: 10,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});