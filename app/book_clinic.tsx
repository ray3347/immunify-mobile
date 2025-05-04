import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import PrimaryButton from "../components/PrimaryButton";
import { useRouter } from "expo-router";

type TimeSlot = {
  time: string;
  status: string;
};

type SlotsData = {
  [key: string]: TimeSlot[];
};

// Dummy Data
const dummyClinicInfo = {
  name: "Downtown Medical Center",
  address: "123 Main St, Downtown",
  distance: "0.8",
  workingHours: {
    weekdays: "Mon-Fri: 8:00 AM - 6:00 PM",
    weekend: "Sat: 9:00 AM - 2:00 PM",
  },
  paymentMethods: ["Insurance", "Credit Card", "Cash"],
};

const dummyDays = ["Today", "Tomorrow", "Wed, Apr 25"];

const dummyTimeSlots: SlotsData = {
  Today: [
    { time: "9:00 AM", status: "Available" },
    { time: "10:30 AM", status: "Booked" },
    { time: "1:00 PM", status: "Available" },
  ],
  Tomorrow: [
    { time: "10:00 AM", status: "Available" },
    { time: "11:30 AM", status: "Available" },
    { time: "2:00 PM", status: "Available" },
    { time: "4:00 PM", status: "Available" },
  ],
  "Wed, Apr 25": [
    { time: "8:30 AM", status: "Available" },
    { time: "12:00 PM", status: "Available" },
    { time: "3:30 PM", status: "Available" },
  ],
};

const BookClinic = () => {
  const [selectedDay, setSelectedDay] = useState("Today");
  const [selectedTime, setSelectedTime] = useState("");
    const router = useRouter();
  const timeSlotsForSelectedDay = dummyTimeSlots[selectedDay] || [];

  const goToBookAppointment = () => router.push("/set_appointment");

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Clinic Info */}
        <View style={styles.card}>
          <Text style={styles.headingText}>{dummyClinicInfo.name}</Text>
          <Text style={styles.bodyText}>{dummyClinicInfo.address}</Text>

          <View style={[styles.centeredRow, styles.mt8]}>
            <Ionicons name="location-outline" size={16} color="#008B8B" />
            <Text style={[styles.smallText, styles.accentText]}>
              {dummyClinicInfo.distance} km
            </Text>
          </View>

          <View style={[styles.row, styles.mt16]}>
            <TouchableOpacity
              style={[styles.button, styles.outlineButton, styles.flex1, styles.mr8]}
            >
              <Ionicons name="call-outline" size={18} color="#008B8B" />
              <Text style={[styles.buttonText, styles.outlineButtonText]}>Call</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.outlineButton, styles.flex1]}
            >
              <Ionicons name="navigate-outline" size={18} color="#008B8B" />
              <Text style={[styles.buttonText, styles.outlineButtonText]}>Directions</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Time Slot Section */}
        <View style={styles.card}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Available Time Slots</Text>

            <View style={[styles.row, styles.mt12]}>
              {dummyDays.map((day) => (
                <TouchableOpacity
                  key={day}
                  style={[
                    styles.dayButton,
                    selectedDay === day && styles.selectedDayButton,
                  ]}
                  onPress={() => {
                    setSelectedDay(day);
                    setSelectedTime(""); // Reset selected time when day changes
                  }}
                >
                  <Text
                    style={[
                      styles.dayButtonText,
                      selectedDay === day && styles.selectedDayButtonText,
                    ]}
                  >
                    {day}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.timeSlotGrid}>
              {timeSlotsForSelectedDay.map((slot, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.timeSlot,
                    selectedTime === slot.time && styles.selectedTimeSlot,
                  ]}
                  onPress={() => setSelectedTime(slot.time)}
                >
                  <Text
                    style={[
                      styles.timeSlotText,
                      selectedTime === slot.time && styles.selectedTimeSlotText,
                    ]}
                  >
                    {slot.time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Clinic Details */}
        <View style={styles.card}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Clinic Details</Text>
            
            {/* Working Hours */}
            <View style={[styles.detailItem, styles.mt12]}>
              <Ionicons name="time-outline" size={20} color="#008B8B" style={styles.detailIcon} />
              <View>
                <Text style={styles.titleText}>Working Hours</Text>
                <Text style={styles.bodyText}>{dummyClinicInfo.workingHours.weekdays}</Text>
                <Text style={styles.bodyText}>{dummyClinicInfo.workingHours.weekend}</Text>
              </View>
            </View>

            {/* Payment Methods */}
            <View style={[styles.detailItem, styles.mt16]}>
              <MaterialCommunityIcons name="credit-card-outline" size={20} color="#008B8B" style={styles.detailIcon} />
              <View>
                <Text style={styles.titleText}>Payment Methods</Text>
                <Text style={styles.bodyText}>{dummyClinicInfo.paymentMethods.join(", ")}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <PrimaryButton
          title="Continue"
          onPress={goToBookAppointment}
          style={styles.primaryBtn}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    padding: 16,
  },

  // --- Typography ---
  headingText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  titleText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 4,
  },
  bodyText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  smallText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  labelText: {
    fontSize: 14,
    color: "#666",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  accentText: {
    color: "#008B8B",
  },
  successText: {
    color: "#10B981",
  },
  dotSeparator: {
    fontSize: 12,
    color: "#666",
    marginHorizontal: 6,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "500",
    marginLeft: 6,
  },
  outlineButtonText: {
    color: "#008B8B",
  },
  timeText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 4,
  },
  statusText: {
    fontSize: 14,
    color: "#666",
  },
  selectedTimeText: {
    color: "#008B8B",
  },
  selectedStatusText: {
    color: "#008B8B",
  },
  dayButtonText: {
    fontSize: 14,
    color: "#333",
  },
  selectedDayButtonText: {
    color: "#008B8B",
  },

  // --- Layout helpers ---
  row: {
    flexDirection: "row",
  },
  centeredRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  flex1: {
    flex: 1,
  },
  mt8: {
    marginTop: 8,
  },
  mt12: {
    marginTop: 12,
  },
  mt16: {
    marginTop: 16,
  },
  mr8: {
    marginRight: 8,
  },

  // --- Card style ---
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 16,
  },

  // --- Section containers ---
  sectionContainer: {
    marginBottom: 0,
  },

  // --- Buttons ---
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 6,
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: "#008B8B",
    backgroundColor: "transparent",
  },

  // --- Day selection ---
  dayButton: {
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#fff",
    width: "32%",
    marginRight: "2%",
    alignItems: "center",
  },
  selectedDayButton: {
    backgroundColor: "#E6F7F7",
    borderColor: "#008B8B",
  },

  // --- Time slots ---
  timeSlotGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 12,
  },
  timeSlot: {
    width: "48%",
    margin: "1%",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    borderColor: "#E5E7EB",
    borderWidth: 1,
  },
  selectedTimeSlot: {
    backgroundColor: "#E6F7F7",
    borderColor: "#008B8B",
  },

  // --- Detail items ---
  detailItem: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  detailIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  // selectedTimeSlot: {
  //     backgroundColor: "#008B8B",
  //   },
  timeSlotText: {
    fontSize: 14,
    color: "#333",
  },
  selectedTimeSlotText: {
    color: "#008B8B",
    fontWeight: "500",
  },
  footer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    alignItems: "center",
    width: "100%",
  },
  primaryBtn:{
    width: "100%",
    marginTop: 36,
    bottom: 36,
    fontWeight: "500",
  }
});

export default BookClinic;
