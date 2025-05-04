import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'

import ListCard from '../../components/ListCard';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import SearchInput from '../../components/SearchInput';
const icons = {
  car: require("../../assets/icons/car.png"),
  star: require("../../assets/icons/star.png"),
  location: require("../../assets/icons/location-marker.png"),
}


const Clinics = () => {
  const router = useRouter();
  const handleNextClinic = () => {
    router.push("../clinic_detail");
  };
  return (
    <GestureHandlerRootView>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
        <SearchInput 
        placeholder="Find Nearby Clinics" 
      />
        <ListCard
          imageSource={require('../../assets/images/image 2.png')}
          title="RS EMC Pulomas"
          subtitle="Jl. Pulo Mas Bar. VI No.20, Kec. Pulo Gadung.."
          distance="1.2 km"
          rating="4.9"
          onPress={handleNextClinic}
        />

        <TouchableOpacity>
          <Text style={styles.title}>Hepatitits B Vaccine</Text>
          <Text style={styles.subtitle}>Protection against Hepatitis B virus</Text>
          <View style={styles.rowItem}>
             <Image source={icons.car} style={styles.icon} />
            <Text>RS EMC Pluit (1km away)</Text>
          </View>
        </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 16,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 0,
  },
  content: {
    backgroundColor: "white",
    // borderRadius: 8,
    // padding: 16,
    marginVertical: 8,
    // borderWidth: 1,
    // borderColor: "#E5E7EB",
    width: "100%",
    flexDirection: "row",
    // alignItems: "center",
  },
  textContainer: {
    flex: 1,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 8,
  },
  rowItem: {
    paddingTop: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 20,
    height: 20,
  },
  starIcon: {
    marginRight: 4,
  },
  statText: {
    fontSize: 14,
    color: "#777",
    marginLeft: 4,
  },
  image: {
    height: 80,
    width: 80,
    marginRight: 16
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    flexShrink: 1,
  },
  subtitle: {
    fontFamily: "pregular",
    fontSize: 14,
    color: "#404040",
    // marginTop: 4,
    flexShrink: 1,
  },
})

export default Clinics