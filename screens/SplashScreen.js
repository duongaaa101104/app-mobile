import React, { useEffect } from "react";
import { SafeAreaView, View, ScrollView, Text, Image } from "react-native";

export default ({ navigation }) => {
	useEffect(() => {
		const timeout = setTimeout(() => {
			navigation.replace("WelcomeScreen"); // Thay bằng tên màn hình tiếp theo
		}, 300); // 300ms = 0.3s

		return () => clearTimeout(timeout);
	}, [navigation]);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
			<ScrollView
				style={{
					flex: 1,
					backgroundColor: "#FFFFFF",
					borderRadius: 32,
				}}>
				<View
					style={{
						alignItems: "center",
						backgroundColor: "#FFFFFF",
						paddingBottom: 303,
					}}>
					<View
						style={{
							alignSelf: "stretch",
							flexDirection: "row",
							alignItems: "center",
							paddingVertical: 12,
							paddingHorizontal: 21,
							marginBottom: 260,
						}}>
						<View
							style={{
								backgroundColor: "#FF3B30",
								borderRadius: 32,
								paddingVertical: 2,
							}}></View>
						<View
							style={{
								flex: 1,
								alignSelf: "stretch",
							}}></View>
					</View>
					<Image
						source={require("../assets/Group58.png")}
						resizeMode={"stretch"}
						style={{
							width: 113,
							height: 164,
							marginBottom: -12,
						}}
					/>
					<View style={{ alignItems: "center" ,marginTop: 16}}>
						<View
							style={{
								width: 184,
								height: 40,
								backgroundColor: "#FFA451",
								borderTopLeftRadius: 16,
								borderBottomRightRadius: 16,
								shadowColor: "#2020200D",
								shadowOpacity: 0.1,
								shadowOffset: {
									width: 0,
									height: -30,
								},
								shadowRadius: 60,
								elevation: 60,
								justifyContent: "center",
								alignItems: "center",
							}}>
							<Text
								style={{
									color: "#FFFFFF",
									fontSize: 24,
									fontStyle: "italic",
									fontFamily: "cursive",
								}}>
								Fruit Hub
							</Text>
						</View>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};
