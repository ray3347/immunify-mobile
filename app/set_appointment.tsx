import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal, Alert, Dimensions } from "react-native";
import React, { useState, useRef } from "react";
import { Feather } from "@expo/vector-icons";

interface Profile {
  id: string;
  name: string;
  age: string;
  relationship: string;
  selected: boolean;
}

const SetAppointment = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState('');
  const [newRelationship, setNewRelationship] = useState('');
  
  const relationshipOptions = ['Son', 'Daughter', 'Spouse', 'Parent', 'Sibling', 'Friend', 'Other'];
  
  const [profiles, setProfiles] = useState<Profile[]>([
    { id: '1', name: 'Tommy Anderson', age: '12', relationship: 'Son', selected: true },
    { id: '2', name: 'Emma Anderson', age: '8', relationship: 'Daughter', selected: false },
    { id: '3', name: 'John Anderson', age: '42', relationship: 'Spouse', selected: false }
  ]);

  const toggleProfileSelection = (id: string) => {
    setProfiles(profiles.map(profile => 
      profile.id === id ? { ...profile, selected: !profile.selected } : profile
    ));
  };

  const openAddProfileModal = () => {
    setModalVisible(true);
    setNewName('');
    setNewAge('');
    setNewRelationship('');
  };

  const closeAddProfileModal = () => {
    setModalVisible(false);
  };

  const handleAddProfile = () => {
    // Validate required fields
    if (!newName.trim()) {
      Alert.alert('Required Field', 'Please enter a full name');
      return;
    }
    
    if (!newAge.trim()) {
      Alert.alert('Required Field', 'Please enter an age');
      return;
    }
    
    if (!newRelationship) {
      Alert.alert('Required Field', 'Please select a relationship');
      return;
    }
    
    // Add new profile
    const newProfile: Profile = {
      id: Date.now().toString(),
      name: newName,
      age: newAge,
      relationship: newRelationship,
      selected: false
    };
    
    setProfiles([...profiles, newProfile]);
    closeAddProfileModal();
  };

  const selectRelationship = (relationship: string) => {
    setNewRelationship(relationship);
  };

  const getSelectedCount = () => {
    return profiles.filter(profile => profile.selected).length;
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.container}>
        {/* Guardian Information Section */}
        {/* <View style={styles.section}>
          <Text style={styles.sectionTitle}>Guardian Information</Text>
          
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Full Name</Text>
            <Text style={styles.infoValue}>Sarah Anderson</Text>
          </View>
          
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Phone Number</Text>
            <Text style={styles.infoValue}>+1 (555) 123-4567</Text>
          </View>
          
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>sarah.anderson@email.com</Text>
          </View>
        </View> */}
        
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
                <Text style={styles.profileDetails}>{profile.relationship}</Text>
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
        
        {/* Add spacing at the bottom to accommodate fixed footer */}
        <View style={{ height: 130 }} />
      </ScrollView>

      {/* Footer with Booking Info and Primary Button */}
      <View style={styles.footer}>
        {/* Booking Information */}
        <Text style={styles.bookingInfo}>
          Booking for {getSelectedCount()} profile{getSelectedCount() !== 1 ? 's' : ''} on Apr 26, 2025 at 10:30 AM
        </Text>
        
        <TouchableOpacity 
          style={[
            styles.primaryBtn,
            getSelectedCount() === 0 && styles.disabledButton
          ]}
          disabled={getSelectedCount() === 0}
        >
          <Text style={styles.confirmButtonText}>Confirm Booking</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Sheet Modal for Add Profile */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeAddProfileModal}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={closeAddProfileModal}
        >
          <View style={styles.bottomSheetContainer}>
            <TouchableOpacity 
              activeOpacity={1} 
              onPress={e => e.stopPropagation()} 
              style={styles.bottomSheet}
            >
              {/* Bottom Sheet Handle */}
              <View style={styles.bottomSheetHandle}>
                <View style={styles.handle} />
              </View>
              
              {/* Bottom Sheet Header */}
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Add New Profile</Text>
                <TouchableOpacity onPress={closeAddProfileModal}>
                  <Feather name="x" size={24} color="#888" />
                </TouchableOpacity>
              </View>

              {/* Bottom Sheet Content */}
              <ScrollView style={styles.modalForm}>
                {/* Full Name Input */}
                <View style={styles.modalInputContainer}>
                  <Text style={styles.inputLabel}>Full Name</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter full name"
                    placeholderTextColor="#a0a0a0"
                    value={newName}
                    onChangeText={setNewName}
                  />
                </View>

                {/* Age Input */}
                <View style={styles.modalInputContainer}>
                  <Text style={styles.inputLabel}>Age</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter age"
                    placeholderTextColor="#a0a0a0"
                    keyboardType="numeric"
                    value={newAge}
                    onChangeText={setNewAge}
                  />
                </View>

                {/* Relationship Radio Selection */}
                <View style={styles.modalInputContainer}>
                  <Text style={styles.inputLabel}>Relationship</Text>
                  <View style={styles.radioContainer}>
                    {relationshipOptions.map((option) => (
                      <TouchableOpacity
                        key={option}
                        style={styles.radioOption}
                        onPress={() => selectRelationship(option)}
                      >
                        <View style={styles.radioButtonContainer}>
                          <View style={styles.radioOuterCircle}>
                            {newRelationship === option && <View style={styles.radioInnerCircle} />}
                          </View>
                          <Text style={styles.radioButtonText}>{option}</Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                {/* Modal Action Buttons */}
                <View style={styles.modalActions}>
                  <TouchableOpacity 
                    style={styles.cancelButton}
                    onPress={closeAddProfileModal}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.addButton}
                    onPress={handleAddProfile}
                  >
                    <Text style={styles.addButtonText}>Add Profile</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
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
  // New styles for guardian info text display
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
  // Original styles
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