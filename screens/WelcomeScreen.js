import React from "react";
import { SafeAreaView, View, ScrollView, Text, Image, TouchableOpacity, StyleSheet, } from "react-native";
import { useNavigation } from '@react-navigation/native';
export default () => {
  const navigation = useNavigation();
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView  style={styles.scrollView}>
				<View style={styles.column}>
					<View style={styles.row}>
						<View style={styles.view}>
						</View>
						<View style={styles.box}>
						</View>
					</View>
					<View style={styles.column2}>
						<View style={styles.view2}>
							<Image
								source={require('../assets/icon1.png')} 
								resizeMode = {"stretch"}
								style={styles.image4}
							/>
						</View>
						<Image
							source={require('../assets/hoaqua1.png')}
							resizeMode = {"stretch"}
							style={styles.image5}
						/>
					</View>
					<Image
						source={require('../assets/Ellipse1.png')} 
						resizeMode = {"stretch"}
						style={styles.image6}
					/>
				</View>
				<View style={styles.column3}>
					<View style={styles.column4}>
						<Text style={styles.text2}>
							{"Get The Freshest Fruit Salad Combo"}
						</Text>
						<Text style={styles.text3}>
							{"We deliver the best and freshest fruit salad in town. Order for a combo today!!!"}
						</Text>
					</View>
					<TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Authentication')}>
						<Text style={styles.text4}>
							{"Let’s Continue"}
						</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	box: {
		flex: 1,
		alignSelf: "stretch",
	},
	button: {
		alignItems: "center",
		backgroundColor: "#FFA451",
		borderRadius: 10,
		paddingVertical: 18,
    width: '100%',
	},
	column: {
		backgroundColor: "#FFA451",
		paddingBottom: 34,
		marginBottom: 56,
	},
	column2: {
		marginBottom: 8,
		marginHorizontal: 35,
	},
	column3: {
		alignItems: "flex-start",
		marginBottom: 88,
		marginHorizontal: 24,
	},
	column4: {
		marginBottom: 58,
	},
	image: {
		width: 16,
		height: 10,
		marginRight: 6,
	},
	image2: {
		width: 15,
		height: 10,
		marginRight: 5,
	},
	image3: {
		width: 24,
		height: 11,
	},
	image4: {
		borderRadius: 32,
		width: 50,
		height: 37,
		marginRight: 4,
	},
	image5: {
		borderRadius: 32,
		height: 260,
    marginHorizontal: 30
	},
	image6: {
		borderRadius: 32,
		height: 13,
		marginHorizontal: 74,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 12,
		paddingHorizontal: 21,
		marginBottom: 88,
	},
	scrollView: {
		flex: 1,
		backgroundColor: "#FFFFFF",
		borderRadius: 32,
	},
	text: {
		color: "#FFFFFF",
		fontSize: 15,
		fontWeight: "bold",
	},
	text2: {
		color: "#27214D",
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 8,
		marginHorizontal: 1,
	},
	text3: {
		color: "#5C577E",
		fontSize: 14,
		width: 260,
	},
	text4: {
		color: "#FFFFFF",
		fontSize: 16,
		fontWeight: "bold",
	},
	view: {
		backgroundColor: "#FF3B30",
		borderRadius: 32,
		paddingVertical: 2,
	},
	view2: {
		alignItems: "flex-end",
	},
});