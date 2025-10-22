import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/theme";
import { SvgXml } from "react-native-svg";
import { user } from "@/assets/vectors";

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarShowLabel: false,
				headerShown: false,
				tabBarActiveTintColor: COLORS.primary,
				tabBarInactiveTintColor: COLORS.grey,
				tabBarStyle: {
					backgroundColor: "",
					borderTopWidth: 0.5,
					borderColor: COLORS.surface,
					position: "absolute",
					elevation: 0,
					height: 45,
					paddingTop: 4,
					paddingBottom: 8,
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					tabBarIcon: ({ size, color }) => (
						<Ionicons name="home" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="bookmarks"
				options={{
					tabBarIcon: ({ size, color }) => (
						<Ionicons name="search" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="create"
				options={{
					tabBarIcon: ({ size, color }) => (
						<Ionicons name="add-circle" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="notifications"
				options={{
					tabBarIcon: ({ size, color }) => (
						<Ionicons name="heart" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					tabBarIcon: ({ size, color }) => (
						<Ionicons name="person-circle" size={size} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
