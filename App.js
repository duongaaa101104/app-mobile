import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./screens/SplashScreen"; // Màn hình của bạn
import WelcomeScreen from "./screens/WelcomeScreen"; // Màn hình tiếp theo
import Authentication from "./screens/Authentication";
import HomeScreenOne from "./screens/HomeScreenOne";
import AddToBasket from "./screens/AddToBasket";
import OrderList from "./screens/OrderList";
import AccountScreen from "./screens/AccountScreen";
import InputCardDetails from "./screens/InputCardDetails";
import OrderComplete from "./screens/OrderComplete";
import CompleteDetails from "./screens/CompleteDetails";
import TrackOrder from "./screens/TrackOrder";
const Stack = createStackNavigator();
//TrackOrder
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Authentication" component={Authentication} options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreenOne" component={HomeScreenOne} options={{ headerShown: false }} />
        <Stack.Screen name="AddToBasket" component={AddToBasket} options={{ headerShown: false }} />
        <Stack.Screen name="OrderList" component={OrderList} options={{ headerShown: false }} />
        <Stack.Screen name="AccountScreen" component={AccountScreen} options={{ headerShown: false }} />
        <Stack.Screen name="InputCardDetails" component={InputCardDetails} options={{ headerShown: false }} />
        <Stack.Screen name="OrderComplete" component={OrderComplete} options={{ headerShown: false }} />
        <Stack.Screen name="CompleteDetails" component={CompleteDetails} options={{ headerShown: false }} />
        <Stack.Screen name="TrackOrder" component={TrackOrder} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}