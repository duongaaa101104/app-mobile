import AsyncStorage from "@react-native-async-storage/async-storage";

export const getOrders = async () => {
  try {
    const orders = await AsyncStorage.getItem("orders");
    console.log("Đã tải đơn hàng:", orders);
    return orders ? JSON.parse(orders) : [];
  } catch (error) {
    console.error("Lỗi tải đơn hàng:", error);
    return [];
  }
};

export const saveOrders = async (orders) => {
  try {
    await AsyncStorage.setItem("orders", JSON.stringify(orders));
    console.log("Đã lưu đơn hàng:", orders);
  } catch (error) {
    console.error("Lỗi lưu đơn hàng:", error);
  }
};
export const clearOrders = async () => {
  try {
    await AsyncStorage.removeItem("orders");
    console.log("Đã xóa đơn hàng");
  } catch (error) {
    console.error("Lỗi xóa đơn hàng:", error);
  }
};