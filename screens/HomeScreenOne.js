import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { getOrders, saveOrders } from "../utils/orderStorage";

export default () => {
  const [textInput1, onChangeTextInput1] = useState("");
  const [isMenuVisible, setIsMenuVisible] = useState(false); // Trạng thái hiển thị menu
  const slideAnim = useState(new Animated.Value(-250))[0]; // Hiệu ứng trượt cho menu
  const route = useRoute();
  const navigation = useNavigation();
  const userName = route.params?.userName || "Tony";

  const hottestProducts = [
    { name: "Quinoa fruit salad", price: "10,000", image: require("../assets/anh7.png"), imageUri: "assets/anh7.png" },
    { name: "Tropical fruit salad", price: "10,000", image: require("../assets/giohang3.png"), imageUri: "assets/giohang3.png" },
    { name: "Melon fruit salad", price: "10,000", image: require("../assets/anh8.png"), imageUri: "assets/anh8.png" },
    { name: "Honey lime combo", price: "2,000", image: require("../assets/giohang1.png"), imageUri: "assets/giohang1.png" },
  ];

  const categories = ["Hottest", "Popular", "New combo", "Top"];

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

  const handleAddToBasket = async (product) => {
    try {
      const newOrder = {
        id: Date.now().toString(),
        title: product.name,
        quantity: 1,
        price: parseFloat(product.price.replace(",", "")),
        image: product.imageUri,
        date: new Date().toLocaleString(),
      };

      const currentOrders = await getOrders();
      const updatedOrders = [...currentOrders, newOrder];
      const mergedOrders = mergeOrders(updatedOrders);

      await saveOrders(mergedOrders);
      navigation.navigate("AddToBasket", {
        name: product.name,
        price: product.price,
        image: product.image,
        imageUri: product.imageUri,
      });
    } catch (error) {
      console.error("Lỗi khi lưu đơn hàng:", error);
    }
  };

  // Hàm mở menu
  const openMenu = () => {
    setIsMenuVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // Hàm đóng menu
  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: -250,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setIsMenuVisible(false));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Menu bên */}
      <View style={StyleSheet.absoluteFill}>
        <Animated.View
          style={[
            styles.sideMenu,
            { transform: [{ translateX: slideAnim }] },
          ]}
        >
          <ScrollView style={styles.menuContent}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                navigation.navigate("Home");
                closeMenu();
              }}
            >
              <Text style={styles.menuText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                navigation.navigate("OrderList");
                closeMenu();
              }}
            >
              <Text style={styles.menuText}>Order</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                navigation.navigate("Account");
                closeMenu();
              }}
            >
              <Text style={styles.menuText}>Account</Text>
            </TouchableOpacity>
          </ScrollView>
        </Animated.View>
        {isMenuVisible && (
          <TouchableOpacity
            style={styles.overlay}
            onPress={closeMenu}
            activeOpacity={1}
          />
        )}
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.row2}>
          <TouchableOpacity onPress={openMenu} style={styles.iconContainer}>
            <Image
              source={require("../assets/Group4.png")}
              resizeMode={"contain"}
              style={styles.image4}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("OrderList")} style={styles.iconContainer}>
            <Image
              source={require("../assets/Group25.png")}
              
              style={styles.image5}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.text3}>
          {`Hello ${userName}, What fruit salad combo do you want today?`}
        </Text>
        <View style={styles.row3}>
          <View style={styles.row4}>
            <Image
              source={require("../assets/timkiem.png")}
              resizeMode={"stretch"}
              style={styles.searchIcon}
            />
            <TextInput
              placeholder={"Search for fruit salad combos"}
              placeholderTextColor="#86859E"
              value={textInput1}
              onChangeText={onChangeTextInput1}
              style={styles.input}
            />
          </View>
          <Image
            source={require("../assets/Group6.png")}
            resizeMode={"stretch"}
            style={styles.image7}
          />
        </View>
        <Text style={styles.text4}>{"Recommended Combo"}</Text>
        <View style={styles.row5}>
          <TouchableOpacity
            style={styles.column2}
            onPress={() =>
              handleAddToBasket({
                name: "Honey lime combo",
                price: "2,000",
                image: require("../assets/giohang1.png"),
                imageUri: "assets/giohang1.png",
              })
            }
          >
            <View style={styles.row6}>
              <Image
                source={require("../assets/giohang1.png")}
                resizeMode={"stretch"}
                style={styles.image8}
              />
              <Image
                source={require("../assets/traitim.png")}
                resizeMode={"stretch"}
                style={styles.image9}
              />
            </View>
            <Text style={styles.text5}>{"Honey lime combo"}</Text>
            <View style={styles.row7}>
              <View style={styles.row8}>
                <Image
                  source={require("../assets/iconchuN1.png")}
                  resizeMode={"stretch"}
                  style={styles.image10}
                />
                <Text style={styles.text6}>{"2,000"}</Text>
              </View>
              <Image
                source={require("../assets/iconcong.png")}
                resizeMode={"stretch"}
                style={styles.image11}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.column3}
            onPress={() =>
              handleAddToBasket({
                name: "Berry mango combo",
                price: "8,000",
                image: require("../assets/giohang2.png"),
                imageUri: "assets/giohang2.png",
              })
            }
          >
            <View style={styles.row6}>
              <Image
                source={require("../assets/giohang2.png")}
                resizeMode={"stretch"}
                style={styles.image8}
              />
              <Image
                source={require("../assets/traitim.png")}
                resizeMode={"stretch"}
                style={styles.image9}
              />
            </View>
            <Text style={styles.text5}>{"Berry mango combo"}</Text>
            <View style={styles.row7}>
              <View style={styles.row9}>
                <Image
                  source={require("../assets/iconchuN1.png")}
                  resizeMode={"stretch"}
                  style={styles.image10}
                />
                <Text style={styles.text6}>{"8,000"}</Text>
              </View>
              <Image
                source={require("../assets/iconcong.png")}
                resizeMode={"stretch"}
                style={styles.image11}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.row10}>
          <ScrollView
            horizontal={true}
            style={styles.categoryScroll}
            showsHorizontalScrollIndicator={false}
          >
            {categories.map((category, index) => (
              <TouchableOpacity key={index} style={styles.categoryItem}>
                <Text
                  style={[styles.text7, category === "Hottest" && styles.activeCategory]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <ScrollView
          horizontal={true}
          style={styles.horizontalScroll}
          showsHorizontalScrollIndicator={false}
        >
          {hottestProducts.map((product, index) => (
            <TouchableOpacity
              key={index}
              style={styles.productCard}
              onPress={() => handleAddToBasket(product)}
            >
              <Image
                source={product.image}
                resizeMode={"stretch"}
                style={styles.productImage}
              />
              <Image
                source={require("../assets/traitim.png")}
                resizeMode={"stretch"}
                style={styles.heartIcon}
              />
              <Text style={styles.productName}>{product.name}</Text>
              <View style={styles.priceContainer}>
                <View style={styles.priceRow}>
                  <Image
                    source={require("../assets/iconchuN1.png")}
                    resizeMode={"stretch"}
                    style={styles.image10}
                  />
                  <Text style={styles.text11}>{product.price}</Text>
                </View>
                <Image
                  source={require("../assets/iconcong.png")}
                  resizeMode={"stretch"}
                  style={styles.image11}
                />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.box2}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  box: {
    flex: 1,
    alignSelf: "stretch",
  },
  box2: {
    width: 22,
    height: 2,
    backgroundColor: "#FFA451",
    marginBottom: 22,
    marginLeft: 26,
  },
  column: {
    alignItems: "center",
  },
  column2: {
    flex: 1,
    alignItems: "flex-start",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 16,
    marginRight: 23,
    shadowColor: "#2020200D",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 30 },
    shadowRadius: 60,
    elevation: 60,
  },
  column3: {
    flex: 1,
    alignItems: "flex-start",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 16,
    shadowColor: "#2020200D",
    shadowOpacity: 0.1,
    shadowOffset: { width: 2, height: 30 },
    shadowRadius: 60,
    elevation: 60,
  },
  image4: {
    borderRadius: 1,
    width: 22,
    height: 11,
  },
  image5: {
    borderRadius: 1,
    width: 70,
    height: 70,
    marginBottom: 0,
    
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginLeft: 16,
    marginRight: 12,
  },
  image7: {
    width: 26,
    height: 17,
  },
  image8: {
    width: 80,
    height: 80,
    marginTop: 6,
    marginRight: 4,
  },
  image9: {
    width: 16,
    height: 14,
  },
  image10: {
    width: 16,
    height: 12,
    marginRight: 4,
  },
  image11: {
    width: 24,
    height: 24,
  },
  heartIcon: {
    width: 16,
    height: 14,
    position: "absolute",
    top: 8,
    right: 8,
  },
  input: {
    color: "#27214D",
    fontSize: 16,
    fontWeight: "400",
    flex: 1,
    paddingVertical: 0,
  },
  row2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 11,
    marginHorizontal: 24,
    marginTop: 40, // Thêm marginTop để kéo xuống khỏi thanh trạng thái
  },
  iconContainer: {
    padding: 10, // Tăng vùng nhấn cho các biểu tượng
  },
  row3: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
    marginHorizontal: 21,
  },
  row4: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F9",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginRight: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  row5: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 48,
    marginHorizontal: 24,
  },
  row6: {
    flexDirection: "row",
    marginBottom: 8,
    marginLeft: 36,
  },
  row7: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 17,
  },
  row8: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 40,
  },
  row9: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 40,
  },
  row10: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 24,
    marginBottom: 16,
  },
  categoryScroll: {
    flexGrow: 0,
    paddingVertical: 8,
  },
  categoryItem: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  horizontalScroll: {
    flexGrow: 0,
    paddingLeft: 24,
  },
  productCard: {
    width: 150,
    backgroundColor: "#FFF5E6",
    borderRadius: 12,
    marginRight: 12,
    padding: 8,
    alignItems: "center",
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  productName: {
    color: "#27214D",
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 4,
    textAlign: "center",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 32,
  },
  text3: {
    color: "#27214D",
    fontSize: 20,
    marginBottom: 25,
    marginLeft: 24,
    marginRight: 47,
    width: 240,
  },
  text4: {
    color: "#27214D",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    marginLeft: 25,
  },
  text5: {
    color: "#27214D",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    marginHorizontal: 10,
  },
  text6: {
    color: "#F08626",
    fontSize: 14,
  },
  text7: {
    color: "#928DB4",
    fontSize: 16,
    fontWeight: "bold",
  },
  activeCategory: {
    color: "#27214D",
    borderBottomWidth: 2,
    borderBottomColor: "#FFA451",
  },
  text11: {
    color: "#F08626",
    fontSize: 14,
    fontWeight: "bold",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  sideMenu: {
    position: "absolute",
    width: 250,
    height: "100%",
    backgroundColor: "#FFA451",
    paddingTop: 50,
    zIndex: 1,
  },
  menuContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#FFFFFF",
  },
  menuText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});