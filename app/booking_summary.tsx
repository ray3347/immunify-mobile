import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";

const BookingSummary = () => {
  const router = useRouter();

  const handleBackToHome = () => {
    router.replace("/(tabs)/home");
  };

  const summary = {
    clinic: "Klinik Sehat Sentosa",
    date: "Apr 26, 2025",
    time: "10:30 AM",
    vaccine: "MMR Vaccine",
    profiles: [
      { id: "1", name: "Tommy Anderson", age: 12 },
      { id: "2", name: "Emma Anderson", age: 8 },
    ],
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={require("../assets/icons/clock.png")}
          style={styles.icon}
        />
        <Text style={styles.title}>Booking Details</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Clinic</Text>
          <Text style={styles.summaryValue}>{summary.clinic}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Date</Text>
          <Text style={styles.summaryValue}>{summary.date}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Time</Text>
          <Text style={styles.summaryValue}>{summary.time}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Vaccine</Text>
          <Text style={styles.summaryValue}>{summary.vaccine}</Text>
        </View>
        <View style={[styles.summaryRow, { alignItems: "flex-start" }]}>
          <Text style={styles.summaryLabel}>Profiles</Text>
          <View style={{ flex: 1 }}>
            {summary.profiles.map((profile) => (
              <Text key={profile.id} style={styles.profileListText}>
                {profile.name}{" "}
                <Text style={styles.profileAgeText}>
                  ({profile.age} yrs)
                </Text>
              </Text>
            ))}
          </View>
        </View>
        <Text style={styles.infoText}>
          Please wait for verification from the clinic.
        </Text>
        <Text style={styles.detailText}>
          Your booking is being processed. You will receive a notification once
          your appointment is confirmed.
        </Text>
      </View>
      <TouchableOpacity style={styles.primaryBtn} onPress={handleBackToHome}>
        <Text style={styles.primaryBtnText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "100%",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    marginBottom: 32,
  },
  icon: {
    width: 48,
    height: 48,
    marginBottom: 16,
    tintColor: "#009688",
    resizeMode: "contain",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#009688",
    marginBottom: 18,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 6,
  },
  summaryLabel: {
    fontSize: 15,
    color: "#666",
    fontWeight: "500",
    flex: 1,
  },
  summaryValue: {
    fontSize: 15,
    color: "#222",
    fontWeight: "600",
    flex: 1,
    textAlign: "right",
  },
  profileListText: {
    fontSize: 15,
    color: "#222",
    fontWeight: "600",
    textAlign: "right",
  },
  profileAgeText: {
    fontWeight: "400",
    color: "#666",
    fontSize: 14,
  },
  infoText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginTop: 18,
    marginBottom: 8,
    fontWeight: "500",
  },
  detailText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 4,
  },
  primaryBtn: {
    width: "100%",
    backgroundColor: "#009688",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  primaryBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default BookingSummary;