import { SplashScreen, Stack } from "expo-router";
import "./global.css";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { useFonts } from "expo-font";
import InitialLayout from "@/components/InitialLayout";

export default function RootLayout() {
	const [fontsLoaded, error] = useFonts({
		"Cinzel-Regular": require("../assets/fonts/Cinzel-Regular.ttf"),
		"Cinzel-Medium": require("../assets/fonts/Cinzel-Medium.ttf"),
		"Cinzel-SemiBold": require("../assets/fonts/Cinzel-SemiBold.ttf"),
		"Cinzel-Bold": require("../assets/fonts/Cinzel-Bold.ttf"),
		"Cinzel-ExtraBold": require("../assets/fonts/Cinzel-ExtraBold.ttf"),
		"Cinzel-Black": require("../assets/fonts/Cinzel-Black.ttf"),
	});

	React.useEffect(() => {
		if (error) throw error;
		if (fontsLoaded) SplashScreen.hideAsync();
	}, [fontsLoaded, error]);

	return (
		<ClerkProvider tokenCache={tokenCache}>
			<SafeAreaProvider>
				<SafeAreaView className="flex-1 bg-black">
					<InitialLayout />
				</SafeAreaView>
			</SafeAreaProvider>
		</ClerkProvider>
	);
}
