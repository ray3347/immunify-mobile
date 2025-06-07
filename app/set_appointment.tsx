import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import AddProfileForm from "../components/AddProfileForm"; // Pastikan komponen ini sudah ada
import { useRouter } from "expo-router"; // Tambahkan import ini

interface Profile {
  id: string;
  name: string;
  age: string;
  selected: boolean;
}

const SetAppointment = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [profiles, setProfiles] = useState<Profile[]>([
    { id: '1', name: 'Tommy Anderson', age: '12', selected: true },
    { id: '2', name: 'Emma Anderson', age: '8', selected: false },
    { id: '3', name: 'John Anderson', age: '42', selected: false }
  ]);
  const router = useRouter(); // Tambahkan ini

  const toggleProfileSelection = (id: string) => {
    setProfiles(profiles.map(profile => 
      profile.id === id ? { ...profile, selected: !profile.selected } : profile
    ));
  };

  const openAddProfileModal = () => {
    setModalVisible(true);
  };

  const closeAddProfileModal = () => {
    setModalVisible(false);
  };

  const handleAddProfile = (profile: { name: string; dateOfBirth?: string }) => {
    const newProfile: Profile = {
      id: Date.now().toString(),
      name: profile.name,
      age: profile.dateOfBirth
        ? (new Date().getFullYear() - Number(profile.dateOfBirth.split('-')[0])).toString()
        : '',
      selected: false,
    };
    setProfiles([...profiles, newProfile]);
    setModalVisible(false);
  };

  const getSelectedCount = () => {
    return profiles.filter(profile => profile.selected).length;
  };

  const handleConfirmBooking = () => {
    router.replace("/booking_summary");
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.container}>
        {/* Profile Selection Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Profiles to Book</Text>

          {profiles.map(profile => (
            <TouchableOpacity
              key={profile.id}
              style={[styles.profileCard, profile.selected && styles.profileSelected]}
              onPress={() => toggleProfileSelection(profile.id)}
            >
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{profile.name}</Text>
                <Text style={styles.profileDetails}>Age: {profile.age}</Text>
              </View>
              <View style={styles.checkboxContainer}>
                <View style={profile.selected ? styles.checkboxSelected : styles.checkbox}>
                  {profile.selected && <Feather name="check" size={16} color="white" />}
                </View>
              </View>
            </TouchableOpacity>
          ))}

          {/* Add Another Profile Button */}
          <TouchableOpacity style={styles.addProfileButton} onPress={openAddProfileModal}>
            <Feather name="plus" size={16} color="#009688" />
            <Text style={styles.addProfileText}>Add Another Profile</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 130 }} />
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.bookingInfo}>
          Booking for {getSelectedCount()} profile{getSelectedCount() !== 1 ? 's' : ''} on Apr 26, 2025 at 10:30 AM
        </Text>
        <TouchableOpacity
          style={[
            styles.primaryBtn,
            getSelectedCount() === 0 && styles.disabledButton
          ]}
          disabled={getSelectedCount() === 0}
          onPress={handleConfirmBooking} // Tambahkan ini
        >
          <Text style={styles.confirmButtonText}>Confirm Booking</Text>
        </TouchableOpacity>
      </View>

      <AddProfileForm
        isVisible={modalVisible}
        onClose={closeAddProfileModal}
        onSave={handleAddProfile}
      />
    </View>
  );
};

const { height: screenHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  section: {
    marginBottom: 16,
    backgroundColor: "white",
    borderRadius: 6,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  infoContainer: {
    // marginTop: 12,
    paddingVertical: 6,
  },
  infoLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  inputContainer: {
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
  },
  profileCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  profileSelected: {
    borderColor: "#009688",
    borderWidth: 2,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  profileDetails: {
    fontSize: 14,
    color: "#666",
  },
  checkboxContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
  },
  checkboxSelected: {
    width: 24,
    height: 24,
    backgroundColor: "#009688",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  addProfileButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  addProfileText: {
    marginLeft: 8,
    color: "#009688",
    fontWeight: "500",
  },
  footer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    alignItems: "center",
    width: "100%",
    position: "absolute", 
    bottom: 0,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: "#eeeeee",
  },
  bookingInfo: {
    textAlign: "center",
    width: "100%",
    marginTop: 16,
    marginBottom: 8,
    fontSize: 14,
    color: "#666",
  },
  primaryBtn: {
    width: "100%",
    marginTop: 8,
    marginBottom: 16,
    backgroundColor: "#009688",
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#cccccc",
  },
  confirmButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  bottomSheetContainer: {
    width: "100%",
    backgroundColor: "transparent",
  },
  bottomSheet: {
    backgroundColor: "white",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 24,
    maxHeight: screenHeight * 0.85,
  },
  bottomSheetHandle: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 12,
  },
  handle: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#e0e0e0",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  modalForm: {
    padding: 16,
  },
  modalInputContainer: {
    marginBottom: 16,
  },
  // New radio button styles
  radioContainer: {
    marginTop: 4,
  },
  radioOption: {
    marginBottom: 12,
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioOuterCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#009688",
    alignItems: "center",
    justifyContent: "center",
  },
  radioInnerCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#009688",
  },
  radioButtonText: {
    fontSize: 16,
    marginLeft: 10,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    marginBottom: 16,
  },
  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 12,
    alignItems: "center",
    marginRight: 8,
  },
  cancelButtonText: {
    color: "#333",
    fontWeight: "500",
  },
  addButton: {
    flex: 1,
    backgroundColor: "#009688",
    borderRadius: 4,
    padding: 12,
    alignItems: "center",
    marginLeft: 8,
  },
  addButtonText: {
    color: "white",
    fontWeight: "500",
  },
});

export default SetAppointment;