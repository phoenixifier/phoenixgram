import React from "react";
import { useAuth } from "@clerk/clerk-expo";
import { Stack, useRouter, useSegments } from "expo-router";

export default function InitialLayout() {
	const { isLoaded, isSignedIn } = useAuth();

	const segments = useSegments();
	const router = useRouter();

	React.useEffect(() => {
		if (!isLoaded) return;
		const inAuthScreen = segments[0] === "(auth)";
		if (!isSignedIn && !inAuthScreen) {
			router.replace("/(auth)/sign-in");
		} else if (isSignedIn && inAuthScreen) {
			router.replace("/(tabs)");
		}
	}, [isLoaded, isSignedIn, segments]);

	if (!isLoaded) return null;

	return <Stack screenOptions={{ headerShown: false }} />;
}
