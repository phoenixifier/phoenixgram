import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";

export default function AuthRoutesLayout() {
	const { isSignedIn } = useAuth();

	if (isSignedIn) {
		return <Redirect href={"/"} />;
	}

	return <Stack screenOptions={{ headerShown: false }} />;
}
