import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "@/styles/auth.style";
import { COLORS } from "@/constants/theme";
import { Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSSO } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

export default function SignIn() {
	const { startSSOFlow } = useSSO();
	const router = useRouter();
	const handleGoogleSignIn = async () => {
		try {
			const { createdSessionId, setActive } = await startSSOFlow({
				strategy: "oauth_google",
			});

			if (createdSessionId && setActive) {
				await setActive({ session: createdSessionId });
				router.replace("/(tabs)");
			}
		} catch (error) {
			console.error("OAuth error: ", error);
		}
	};

	return (
		<View className="flex-1 justify-center items-center bg-black">
			<View className="items-center" style={styles.brandSection}>
				<View className="w-[60px] h-[60px] bg-primary/15 rounded-2xl items-center justify-center mb-5">
					<Image
						source={require("../../assets/images/phoenix-logo.png")}
						className="w-10 h-12"
					/>
				</View>
				<Text className="text-2xl mb-2 text-primary font-cinzel-extrabold">
					Phoenixgram
				</Text>
				<Text style={styles.tagline}>Don't miss anything</Text>

				<View className="flex-1 justify-center items-center px-10">
					<Image
						source={require("../../assets/images/flying-phoenix.png")}
						style={styles.illustration}
						resizeMode="cover"
					/>
				</View>

				<View className="w-full items-center px-6 pb-10">
					<TouchableOpacity
						onPress={handleGoogleSignIn}
						className="flex flex-row items-center justify-center w-full max-w-[300px] rounded-[14px] bg-white py-4 px-6 mb-5 elevation-[6px] shadow-black shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
						activeOpacity={0.9}
					>
						<View className="size-6 items-center justify-center mr-3">
							<Ionicons name="logo-google" size={20} color={COLORS.primary} />
						</View>
						<Text className="text-[#1A1A1A] font-semibold">
							Continue with Google
						</Text>
					</TouchableOpacity>
					<Text className="text-center max-w-[280px] text-xs text-[#9CA3AF]">
						By continuing, you agree to our Terms and Privacy Policy
					</Text>
				</View>
			</View>
		</View>
	);
}
