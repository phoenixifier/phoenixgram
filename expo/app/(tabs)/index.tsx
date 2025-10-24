import { Text, View, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function Index() {
	const { signOut } = useAuth();
	return (
		<View className="flex-1 items-center justify-center">
			<TouchableOpacity onPress={() => signOut()}>
				<Text className="">Sign Out</Text>
			</TouchableOpacity>
		</View>
	);
}
