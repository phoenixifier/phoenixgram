import {
	View,
	Text,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform,
	ActivityIndicator,
	Animated,
	TextInput,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/theme";
import * as ImagePicker from "expo-image-picker";
import ScrollView = Animated.ScrollView;
import { styles } from "@/styles/create.styles";
import { Image } from "expo-image";

export default function CreateScreen() {
	const router = useRouter();
	const { user } = useUser();
	const [caption, setCaption] = React.useState("");
	const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
	const [isSharing, setIsSharing] = React.useState(false);

	const pickImage = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["images", "videos"],
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});

		if (!result.canceled) setSelectedImage(result.assets[0].uri);
	};

	const handleShare = () => {};

	if (!selectedImage) {
		return (
			<View className="flex-1 bg-black">
				<View className="flex flex-row justify-between items-center px-4 py-3 border-b-[0.5px] border-surface">
					<TouchableOpacity onPress={() => router.back()}>
						<Ionicons name="arrow-back" size={28} color={COLORS.primary} />
					</TouchableOpacity>
					<Text className="text-white text-lg font-semibold">New Post</Text>
					<View style={{ width: 28 }} />
				</View>

				<TouchableOpacity
					onPress={() => pickImage()}
					className="flex-1 justify-center items-center gap-3"
					activeOpacity={0.6}
				>
					<Ionicons name="image-outline" size={48} color={COLORS.grey} />
					<Text className="text-grey">Tap to select an image</Text>
				</TouchableOpacity>
			</View>
		);
	}

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
			className="flex-1 bg-black"
		>
			<View className="flex-1">
				<View className="flex flex-row justify-between items-center px-4 py-3 border-b-[0.5px] border-surface">
					<TouchableOpacity
						onPress={() => {
							setSelectedImage(null);
							setCaption("");
						}}
						disabled={isSharing}
					>
						<Ionicons
							name="close-outline"
							size={28}
							color={isSharing ? COLORS.grey : COLORS.white}
						/>
					</TouchableOpacity>
					<Text className="text-white text-lg font-semibold">New Post</Text>
					<TouchableOpacity
						onPress={handleShare}
						disabled={isSharing || !selectedImage}
						className={`items-center justify-center px-3 py-1.5 min-w-[60px] ${isSharing && "opacity-50"}`}
					>
						{isSharing ? (
							<ActivityIndicator size="small" color={COLORS.primary} />
						) : (
							<Text className="text-primary font-semibold">Share</Text>
						)}
					</TouchableOpacity>
				</View>

				<ScrollView
					contentContainerStyle={styles.scrollContent}
					bounces={false}
					keyboardShouldPersistTaps="handled"
					contentOffset={{ x: 0, y: 100 }}
				>
					<View className={`flex-1 ${isSharing && "opacity-70"}`}>
						<View style={styles.imageSection}>
							<Image
								source={selectedImage}
								contentFit="cover"
								transition={200}
								style={styles.previewImage}
							/>
							<TouchableOpacity
								onPress={pickImage}
								disabled={isSharing}
								className="flex flex-row absolute items-center bottom-4 right-4 bg-black/75 p-2 gap-1.5 rounded-lg"
							>
								<Ionicons name="image-outline" size={20} color={COLORS.white} />
								<Text className="text-sm font-medium text-white">Change</Text>
							</TouchableOpacity>
						</View>

						<View className="flex-1 p-4">
							<View className="flex flex-row items-start">
								<Image
									source={user?.imageUrl}
									style={styles.userAvatar}
									contentFit="cover"
									transition={200}
								/>
								<TextInput
									value={caption}
									onChangeText={setCaption}
									editable={!isSharing}
									placeholder="Write a caption..."
									placeholderTextColor={COLORS.grey}
									multiline
									className="flex-1 text-white min-h-10 pt-2"
								/>
							</View>
						</View>
					</View>
				</ScrollView>
			</View>
		</KeyboardAvoidingView>
	);
}
