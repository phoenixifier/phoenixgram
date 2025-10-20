import { Text, View, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function Index() {
	return (
		<View className="flex-1 items-center justify-center">
			<Link href="/(tabs)/notifications">Visit Notifications</Link>
		</View>
	);
}
