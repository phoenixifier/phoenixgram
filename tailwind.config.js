/** @type {import('tailwindcss').Config} */
module.exports = {
	// NOTE: Update this to include the paths to all files that contain Nativewind classes.
	content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
	presets: [require("nativewind/preset")],
	theme: {
		extend: {
			colors: {
				primary: "#FF4433",
			},
			fontFamily: {
				cinzel: ["Cinzel-Regular", "sans-serif"],
				"cinzel-medium": ["Cinzel-Medium", "sans-serif"],
				"cinzel-semibold": ["Cinzel-SemiBold", "sans-serif"],
				"cinzel-bold": ["Cinzel-Bold", "sans-serif"],
				"cinzel-extrabold": ["Cinzel-ExtraBold", "sans-serif"],
				"cinzel-black": ["Cinzel-Black", "sans-serif"],
			},
		},
	},
	plugins: [],
};
