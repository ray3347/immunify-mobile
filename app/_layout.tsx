import { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";

import { useColorScheme } from '@/hooks/useColorScheme';
import React from 'react';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const fontMap = {
  "PlusJakartaSans-Regular": require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
  "PlusJakartaSans-ExtraBold": require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
  "PlusJakartaSans-Bold": require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
  "PlusJakartaSans-ExtraBoldItalic": require("../assets/fonts/PlusJakartaSans-ExtraBoldItalic.ttf"),
  "PlusJakartaSans-ExtraLight": require("../assets/fonts/PlusJakartaSans-ExtraLight.ttf"),
  "PlusJakartaSans-ExtraLightItalic": require("../assets/fonts/PlusJakartaSans-ExtraLightItalic.ttf"),
  "PlusJakartaSans-Light": require("../assets/fonts/PlusJakartaSans-Light.ttf"),
  "PlusJakartaSans-LightItalic": require("../assets/fonts/PlusJakartaSans-LightItalic.ttf"),
  "PlusJakartaSans-Italic": require("../assets/fonts/PlusJakartaSans-Italic.ttf"),
  "PlusJakartaSans-Medium": require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
  "PlusJakartaSans-MediumItalic": require("../assets/fonts/PlusJakartaSans-MediumItalic.ttf"),
  "PlusJakartaSans-SemiBold": require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
  "PlusJakartaSans-SemiBoldItalic": require("../assets/fonts/PlusJakartaSans-SemiBoldItalic.ttf"),
};

const BackButton = ({ color = "#676767", marginLeft = 0 }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => {
        if (router.canGoBack()) {
          router.back();
        } else {
          router.replace("/"); // or router.push("/(tabs)") or any safe fallback
        }
      }}
      style={{ marginRight: 12 }}
    >
      <Ionicons name="arrow-back" size={24} color={color} />
    </TouchableOpacity>
  );
};


export default function RootLayout() {
  const [fontsLoaded] = useFonts(fontMap);

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <Stack>
      <Stack.Screen
        name="set_appointment"
        options={{
          headerShown: true,
          title: "Booking Profiles",
          headerLeft: () => <BackButton />,
        }}
      />
      <Stack.Screen
        name="book_clinic"
        options={{
          headerShown: true,
          title: "Book Clinic",
          headerLeft: () => <BackButton />,
        }}
      />
      <Stack.Screen
        name="article_detail"
        options={{
          headerShown: true,
          title: "Article",
          headerLeft: () => <BackButton />,
        }}
      />
      
      <Stack.Screen
        name="vaccine_detail"
        options={{
          headerShown: true,
          title: "Vaccine Details",
          headerLeft: () => <BackButton />,
        }}
      />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
