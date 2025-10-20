import { Stack } from "expo-router";
import "./global.css";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";

export default function RootLayout() {
	return (
		<ClerkProvider tokenCache={tokenCache}>
			<SafeAreaProvider>
				<SafeAreaView className="flex-1 bg-black">
					<Stack screenOptions={{ headerShown: false }} />
				</SafeAreaView>
			</SafeAreaProvider>
		</ClerkProvider>
	);
}
