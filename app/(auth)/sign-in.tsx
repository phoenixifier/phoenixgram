import { View, Text } from "react-native";
import React from "react";
import { styles } from "@/styles/auth.style";
import { COLORS } from "@/constants/theme";
import { Image } from "expo-image";
import { Asset } from "expo-asset";

const logo = require("../../assets/images/phoenix-logo.png");

export default function SignIn() {
	return (
		<View className="flex-1 justify-center items-center">
			<View className="items-center" style={styles.brandSection}>
				<View className="size-[60px] bg-primary/15 rounded-2xl items-center justify-center mb-5">
					<Image
						source={require("../../assets/images/phoenix-logo.png")}
						className="w-10 h-10 object-cover"
					/>
				</View>
			</View>
		</View>
	);
}
