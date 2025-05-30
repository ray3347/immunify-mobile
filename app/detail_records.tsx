import React from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Linking, Alert } from "react-native";

const DUMMY_RECORD = {
  id: "1",
  userId: "1",
  userName: "Jane Doe",
  userColor: "pink",
  vaccineName: "COVID-19 Booster",
  date: "2025-01-15",
  time: "10:00 AM",
  location: "City Clinic, Jakarta",
  dose: "2nd dose",
};

const openMaps = (address: string) => {
  if (!address) {
    Alert.alert("Location not found");
    return;
  }
  const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
  Linking.openURL(url).catch(() => {
    Alert.alert("Failed to open Google Maps");
  });
};

const DetailRecords = () => {
  const record = DUMMY_RECORD;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
          <View style={[styles.userIndicator, { backgroundColor: record.userColor, width: 32, height: 32, borderRadius: 16, marginRight: 14, marginBottom: 0 }]} />
          <View>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>{record.userName}</Text>
            <Text style={{ fontSize: 15, color: "#555", fontWeight: "400", marginTop: 2 }}>{record.vaccineName}</Text>
          </View>
        </View>
        <View style={styles.infoBox}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Date</Text>
            <Text style={styles.value}>{record.date}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Time</Text>
            <Text style={styles.value}>{record.time}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Dose</Text>
            <Text style={styles.value}>{record.dose}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Location</Text>
            <Text style={styles.value}>{record.location}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.mapsButton}
          onPress={() => openMaps(record.location)}
        >
          <Text style={styles.mapsButtonText}>Open in Google Maps</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 24 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 24 },
  userIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 10,
  },
  title: { fontSize: 22, fontWeight: "bold" },
  detailBox: { marginTop: 8 },
  infoBox: {
    borderWidth: 1,
    borderColor: "#EDEDED",
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    backgroundColor: "#fff",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    color: "#888",
    fontSize: 14,
    flex: 1,
  },
  value: {
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
    flex: 1,
    textAlign: "right",
  },
  mapsButton: {
    marginTop: 20,
    backgroundColor: "#008B8B",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  mapsButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default DetailRecords;