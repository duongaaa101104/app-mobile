import React from "react";
import { SafeAreaView, View, ScrollView, Text, Image, TouchableOpacity, } from "react-native";
import { useNavigation } from '@react-navigation/native';
export default (props) => {
	const navigation = useNavigation();
	return (
		<SafeAreaView 
			style={{
				flex: 1,
				backgroundColor: "#FFFFFF",
			}}>
			<ScrollView  
				style={{
					flex: 1,
					backgroundColor: "#FFA451",
					borderRadius: 32,
				}}>
				<View 
					style={{
						flexDirection: "row",
						alignItems: "center",
						paddingVertical: 12,
						paddingHorizontal: 21,
						marginBottom: 40,
					}}>
					<View 
						style={{
							backgroundColor: "#FF3B30",
							borderRadius: 32,
							paddingVertical: 2,
						}}>
					</View>
					<View 
						style={{
							flex: 1,
							alignSelf: "stretch",
						}}>
					</View>
				</View>
				<View 
					style={{
						flexDirection: "row",
						alignItems: "flex-start",
						marginBottom: 40,
						marginLeft: 24,
					}}>
					<TouchableOpacity
						style={{
							flexDirection: "row",
							alignItems: "center",
							backgroundColor: "#FFFFFF",
							borderRadius: 100,
							paddingVertical: 6,
							paddingLeft: 8,
							paddingRight: 10,
							marginRight: 14,
						}}onPress={() => navigation.goBack()}>
						<Image
							source={require("../assets/Vector.png")} 
							resizeMode = {"stretch"}
							style={{
								width: 10,
								height: 20,
								marginRight: 4,
							}}
						/>
						<Text 
							style={{
								color: "#27214D",
								fontSize: 16,
							}}>
							{"Go back"}
						</Text>
					</TouchableOpacity>
					<Text 
						style={{
							color: "#FFFFFF",
							fontSize: 24,
							fontWeight: "bold",
						}}>
						{"Delivery Status"}
					</Text>
				</View>
				<View 
					style={{
						alignItems: "flex-start",
						backgroundColor: "#FFFFFF",
						paddingTop: 40,
						paddingBottom: 130,
					}}>
					<View 
						style={{
							flexDirection: "row",
							alignItems: "center",
							marginBottom: 4,
							marginHorizontal: 24,
						}}>
						<TouchableOpacity 
							style={{
								backgroundColor: "#FFFAEB",
								borderRadius: 10,
								paddingVertical: 10,
								paddingHorizontal: 9,
								marginRight: 16,
							}} onPress={()=>alert('Pressed!')}>
							<Image
								source={require("../assets/icon2.png")}
								resizeMode = {"stretch"}
								style={{
									width: 48,
									height: 43,
								}}
							/>
						</TouchableOpacity>
						<Text 
							style={{
								color: "#000000",
								fontSize: 16,
								fontWeight: "bold",
								flex: 1,
							}}>
							{"Order Taken"}
						</Text>
						<TouchableOpacity 
							style={{
								backgroundColor: "#4CD964",
								borderRadius: 100,
								padding: 6,
							}} onPress={()=>alert('Pressed!')}>
							<Image
								source={require("../assets/icontich.png")} 
								resizeMode = {"stretch"}
								style={{
									width: 10,
									height: 10,
								}}
							/>
						</TouchableOpacity>
					</View>
					<View 
						style={{
							width: 1,
							height: 40,
							backgroundColor: "#FFA451",
							marginBottom: 4,
							marginLeft: 55,
						}}>
					</View>
					<View 
						style={{
							flexDirection: "row",
							alignItems: "center",
							marginBottom: 4,
							marginHorizontal: 24,
						}}>
						<TouchableOpacity 
							style={{
								backgroundColor: "#F1EFF6",
								borderRadius: 10,
								paddingVertical: 4,
								paddingHorizontal: 5,
								marginRight: 16,
							}} onPress={()=>alert('Pressed!')}>
							<Image
								source={require("../assets/icon3.png")} 
								resizeMode = {"stretch"}
								style={{
									width: 56,
									height: 56,
								}}
							/>
						</TouchableOpacity>
						<Text 
							style={{
								color: "#000000",
								fontSize: 16,
								fontWeight: "bold",
								flex: 1,
							}}>
							{"Order Is Being Prepared"}
						</Text>
						<TouchableOpacity 
							style={{
								backgroundColor: "#4CD964",
								borderRadius: 100,
								padding: 6,
							}} onPress={()=>alert('Pressed!')}>
							<Image
								source={require("../assets/icontich.png")} 
								resizeMode = {"stretch"}
								style={{
									width: 10,
									height: 10,
								}}
							/>
						</TouchableOpacity>
					</View>
					<View 
						style={{
							width: 1,
							height: 40,
							backgroundColor: "#FFA451",
							marginBottom: 4,
							marginLeft: 55,
						}}>
					</View>
					<View 
						style={{
							flexDirection: "row",
							alignItems: "center",
							marginBottom: 4,
							marginHorizontal: 24,
						}}>
						<TouchableOpacity 
							style={{
								backgroundColor: "#FEF0F0",
								borderRadius: 10,
								paddingVertical: 4,
								paddingHorizontal: 5,
								marginRight: 16,
							}} onPress={()=>alert('Pressed!')}>
							<Image
								source={require("../assets/icon4.png")} 
								resizeMode = {"stretch"}
								style={{
									width: 56,
									height: 56,
								}}
							/>
						</TouchableOpacity>
						<View 
							style={{
								flex: 1,
								marginRight: 12,
							}}>
							<Text 
								style={{
									color: "#000000",
									fontSize: 16,
									fontWeight: "bold",
									marginBottom: 4,
								}}>
								{"Order Is Being Delivered"}
							</Text>
							<Text 
								style={{
									color: "#000000",
									fontSize: 14,
								}}>
								{"Your delivery agent is coming"}
							</Text>
						</View>
						<TouchableOpacity 
							style={{
								backgroundColor: "#FFA451",
								borderRadius: 100,
								padding: 8,
							}} onPress={()=>alert('Pressed!')}>
							<Image
								source={require("../assets/iconphone.png")}
								resizeMode = {"stretch"}
								style={{
									width: 24,
									height: 24,
								}}
							/>
						</TouchableOpacity>
					</View>
					<View 
						style={{
							width: 1,
							height: 20,
							backgroundColor: "#FFA451",
							marginBottom: 3,
							marginLeft: 55,
						}}>
					</View>
					<Image
						source={require("../assets/bando.png")} 
						resizeMode = {"stretch"}
						style={{
							borderRadius: 15,
							height: 145,
							marginBottom: 4,
							marginHorizontal: 24,
							width: '88%',
						}}
					/>
					<View 
						style={{
							width: 1,
							height: 40,
							backgroundColor: "#FFA451",
							marginBottom: 4,
							marginLeft: 55,
						}}>
					</View>
					<View 
						style={{
							flexDirection: "row",
							alignItems: "center",
							marginHorizontal: 24,
						}}>
						<TouchableOpacity 
							style={{
								alignItems: "flex-start",
								backgroundColor: "#F0FEF8",
								borderRadius: 10,
								paddingVertical: 12,
								paddingHorizontal: 13,
								marginRight: 16,
							}} onPress={()=>alert('Pressed!')}>
							<View 
								style={{
									backgroundColor: "#4CD964",
									borderRadius: 100,
									padding: 11,
								}}>
								<Image
									source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/z1ap0dVQwN/9hhjrsc5_expires_30_days.png"}} 
									resizeMode = {"stretch"}
									style={{
										width: 16,
										height: 16,
									}}
								/>
							</View>
						</TouchableOpacity>
						<Text 
							style={{
								color: "#000000",
								fontSize: 16,
								fontWeight: "bold",
								flex: 1,
							}}>
							{"Order Received"}
						</Text>
						<Image
							source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/z1ap0dVQwN/2dmyyj1h_expires_30_days.png"}} 
							resizeMode = {"stretch"}
							style={{
								width: 40,
								height: 8,
							}}
						/>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}