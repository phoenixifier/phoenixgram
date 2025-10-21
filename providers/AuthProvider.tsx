import { View, Text } from "react-native";
import React from "react";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { ClerkLoaded, ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";

interface AuthProviderProps {
	children: React.ReactNode;
}

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
	throw new Error("Missing Publishable Key");
}

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
	unsavedChangesWarning: false,
});

export default function AuthProvider({ children }: AuthProviderProps) {
	return (
		<ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
			<ConvexProviderWithClerk client={convex} useAuth={useAuth}>
				<ClerkLoaded>{children}</ClerkLoaded>
			</ConvexProviderWithClerk>
		</ClerkProvider>
	);
}
