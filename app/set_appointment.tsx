import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";
import InfoCard from "../components/InfoCard";

const icons = {
  user: require("../assets/icons/user.png"),
  location: require("../assets/icons/location-marker.png"),
  calendar: require("../assets/icons/calendar.png"),
};
const set_appointment = () => {
  return (
    <View style={styles.container}>
      <View style={styles.mb16}>
        <Text style={styles.sectionTitle}>Parent/Guardian Information</Text>
        <Text style={styles.sectionSubtitle}>
          This information will be used to schedule and confirm the appointment.
        </Text>
        <InfoCard
          iconSource={icons.user}
          title="Dona Doe"
          subtitle="085714466433"
        />
      </View>
      
      <View style={styles.mb16}>
        <Text style={styles.sectionTitle}>Location</Text>
        <InfoCard
          iconSource={icons.location}
          title="Example Clinic"
          subtitle="Jl. Pulo Mas Bar. VI No.20"
        />
      </View>

      <View style={styles.mb16}>
        <Text style={styles.sectionTitle}>Date & Time</Text>
        <InfoCard
          iconSource={icons.calendar}
          title="Example Clinic"
          subtitle="Jl. Pulo Mas Bar. VI No.20"
        />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  mb16: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4B5563",
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#9E9E9E",
    marginTop: 4,
  },
});
export default set_appointment;
