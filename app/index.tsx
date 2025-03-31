import { StatusBar } from "expo-status-bar";
import React, { useState, useRef, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { images } from "../constants";
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width } = Dimensions.get("window");

const onboardingData = [
  {
    image: images.ob1,
    title: "Immunization made easy",
    description: "Never miss an appointment again while eliminating the hassle of paper records"
  },
  {
    image: images.ob2, // Assuming you have ob2 in your images
    title: "Expert vaccine care",
    description: "Expert care for necessary immunizations and disease protection, all-in-one app"
  },
  {
    image: images.ob3, // Assuming you have ob3 in your images
    title: "Invest in your child's health",
    description: "Secure your child's future with the gift of good health"
  }
];

export default function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const router = useRouter();

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: currentIndex * width, animated: true });
    }
  }, [currentIndex]);

  const handleNext = async() => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      await AsyncStorage.setItem('hasSeenOnboarding', 'true');
      router.replace('/(auth)/sign_up');
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
        <StatusBar style="dark" />

        <View style={{ flex: 1 }}>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
            contentContainerStyle={{ width: width * onboardingData.length }}
          >
            {onboardingData.map((item, index) => (
              <View 
                key={index} 
                style={{ 
                  width, 
                  paddingHorizontal: 20,
                  alignItems: 'center',
                  justifyContent: 'center' 
                }}
              >
                <Image
                  source={item.image}
                  style={{ 
                    width: 300, 
                    height: 300, 
                    resizeMode: 'contain',
                    marginBottom: 30
                  }}
                />
                <Text
                  style={{
                    fontSize: 24,
                    fontFamily: 'pbold',
                    color: '#333333',
                    textAlign: 'center',
                    marginBottom: 16
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'pregular',
                    color: '#666666',
                    textAlign: 'center',
                    paddingHorizontal: 20,
                    lineHeight: 24
                  }}
                >
                  {item.description}
                </Text>
              </View>
            ))}
          </ScrollView>

          {/* Pagination Dots */}
          <View 
            style={{ 
              flexDirection: 'row', 
              justifyContent: 'center',
              marginVertical: 30
            }}
          >
            {onboardingData.map((_, index) => (
              <View
                key={index}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: currentIndex === index ? '#008B8B' : '#E0E0E0',
                  marginHorizontal: 5
                }}
              />
            ))}
          </View>

          {/* Next Button */}
          <TouchableOpacity
            style={{
              backgroundColor: '#008B8B',
              paddingVertical: 15,
              width: 320, 
              borderRadius: 10,
              alignSelf: 'center',
              marginBottom: 40,
              
            }}
            onPress={handleNext}
          >
            <Text 
              style={{ 
                color: '#FFFFFF', 
                fontFamily: 'pbold', 
                fontSize: 16,
                textAlign: 'center',
              }}
            >
              {currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}