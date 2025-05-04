import { StatusBar } from "expo-status-bar";
import React, { useState, useRef, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, Dimensions, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { images } from "../constants";
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HttpService from "@/constants/HttpService";

const { width } = Dimensions.get("window");

const onboardingData = [
  {
    image: images.ob1,
    title: "Immunization made easy",
    description: "Never miss an appointment again while eliminating the hassle of paper records"
  },
  {
    image: images.ob2, 
    title: "Expert vaccine care",
    description: "Expert care for necessary immunizations and disease protection, all-in-one app"
  },
  {
    image: images.ob3,
    title: "Invest in your child's health",
    description: "Secure your child's future with the gift of good health"
  }
];

export default function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const router = useRouter();

  const fetchVax = async () => {
    const res = await HttpService.get("/wiki/vaccine").then((res)=> {
      console.log(res)

      return res;
    });

    return res.data;
  }

  useEffect(()=>{
    // const ha = fetchVax();
    HttpService.get("/wiki/vaccine").then((res)=> {
      console.log("babi", res.data)

      return res;
    })
    .catch((err)=>{
      console.log("error", err)
    })
    ;
    // console.log("babi", ha)
  },[]);

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
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        
        <View style={styles.mainContainer}>
          <View style={styles.scrollViewContainer}>
            <ScrollView
              ref={scrollViewRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              scrollEnabled={false}
              contentContainerStyle={styles.scrollContent}
            >
              {onboardingData.map((item, index) => (
                <View key={index} style={styles.slideItem}>
                  <Image
                    source={item.image}
                    style={styles.slideImage}
                  />
                  <Text style={styles.slideTitle}>
                    {item.title}
                  </Text>
                  <Text style={styles.slideDescription}>
                    {item.description}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Container for bottom controls with padding */}
          <View style={styles.controlsContainer}>
            <View style={styles.paginationContainer}>
              {onboardingData.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.paginationDot,
                    currentIndex === index && styles.paginationDotActive
                  ]}
                />
              ))}
            </View>

            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleNext}
            >
              <Text style={styles.nextButtonText}>
                {currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  mainContainer: {
    flex: 1,
  },
  scrollViewContainer: {
    flex: 1,
  },
  scrollContent: {
    width: width * onboardingData.length,
  },
  slideItem: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  slideImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  slideTitle: {
    fontSize: 24,
    fontFamily: 'pbold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 16,
  },
  slideDescription: {
    fontSize: 16,
    fontFamily: 'pregular',
    color: '#666666',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  controlsContainer: {
    paddingHorizontal: 16,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 5,
  },
  paginationDotActive: {
    backgroundColor: '#008B8B',
  },
  nextButton: {
    backgroundColor: '#008B8B',
    paddingVertical: 15,
    width: '100%',
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 40,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontFamily: 'pbold',
    fontSize: 16,
    textAlign: 'center',
  },
});