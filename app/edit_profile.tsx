import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const dummyProfiles = [
  {
    id: 1,
    fullName: 'John Doe',
    gender: 'M',
    dateOfBirth: '1990-01-01',
  },
  {
    id: 2,
    fullName: 'Jane Smith',
    gender: 'F',
    dateOfBirth: '1992-05-15',
  },
];

const EditProfile = () => {
  const [selectedProfile, setSelectedProfile] = useState(dummyProfiles[0]);

  const [formData, setFormData] = useState({
    fullName: selectedProfile.fullName,
    gender: selectedProfile.gender,
    dateOfBirth: selectedProfile.dateOfBirth,
  });

  const [dobInputs, setDobInputs] = useState({
    day: selectedProfile.dateOfBirth.split('-')[2],
    month: selectedProfile.dateOfBirth.split('-')[1],
    year: selectedProfile.dateOfBirth.split('-')[0],
  });

  React.useEffect(() => {
    setFormData({
      fullName: selectedProfile.fullName,
      gender: selectedProfile.gender,
      dateOfBirth: selectedProfile.dateOfBirth,
    });
    setDobInputs({
      day: selectedProfile.dateOfBirth.split('-')[2],
      month: selectedProfile.dateOfBirth.split('-')[1],
      year: selectedProfile.dateOfBirth.split('-')[0],
    });
  }, [selectedProfile]);

  const handleSave = () => {
    alert('Profile saved!');
  };

  const otherProfiles = dummyProfiles.filter((u) => u.id !== selectedProfile.id);

  return (
    <SafeAreaView style={styles.container}>
      {otherProfiles.length > 0 && (
        <View style={styles.profileSelector}>
          <Text style={styles.profileSelectorLabel}>Select Profile to Edit:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {dummyProfiles.map((profile) => (
              <TouchableOpacity
                key={profile.id}
                style={[
                  styles.profileChip,
                  selectedProfile.id === profile.id && styles.profileChipActive,
                ]}
                onPress={() => setSelectedProfile(profile)}
              >
                <Text
                  style={[
                    styles.profileChipText,
                    selectedProfile.id === profile.id && styles.profileChipTextActive,
                  ]}
                >
                  {profile.fullName}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      <ScrollView style={styles.content}>
        {/* Full Name Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={formData.fullName}
            onChangeText={(text) => setFormData({ ...formData, fullName: text })}
            placeholder="Enter your full name"
          />
        </View>

        {/* Gender Selection */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Gender</Text>
          <View style={styles.genderContainer}>
            <TouchableOpacity
              style={[
                styles.genderButton,
                formData.gender === 'M' && styles.genderButtonActive,
              ]}
              onPress={() => setFormData({ ...formData, gender: 'M' })}
            >
              <Text style={[
                styles.genderButtonText,
                formData.gender === 'M' && styles.genderButtonTextActive,
              ]}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.genderButton,
                formData.gender === 'F' && styles.genderButtonActive,
              ]}
              onPress={() => setFormData({ ...formData, gender: 'F' })}
            >
              <Text style={[
                styles.genderButtonText,
                formData.gender === 'F' && styles.genderButtonTextActive,
              ]}>Female</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Date of Birth Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date of Birth</Text>
          <View style={styles.dobContainer}>
            <TextInput
              style={styles.dobInput}
              value={dobInputs.day}
              onChangeText={(text) => setDobInputs({ ...dobInputs, day: text.replace(/[^0-9]/g, '').slice(0, 2) })}
              placeholder="DD"
              keyboardType="numeric"
              maxLength={2}
            />
            <TextInput
              style={styles.dobInput}
              value={dobInputs.month}
              onChangeText={(text) => setDobInputs({ ...dobInputs, month: text.replace(/[^0-9]/g, '').slice(0, 2) })}
              placeholder="MM"
              keyboardType="numeric"
              maxLength={2}
            />
            <TextInput
              style={[styles.dobInput, styles.yearInput]}
              value={dobInputs.year}
              onChangeText={(text) => setDobInputs({ ...dobInputs, year: text.replace(/[^0-9]/g, '').slice(0, 4) })}
              placeholder="YYYY"
              keyboardType="numeric"
              maxLength={4}
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.saveButtonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  profileSelector: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: '#F9FAFB',
  },
  profileSelectorLabel: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 8,
    fontWeight: '600',
  },
  profileChip: {
    backgroundColor: '#E5E7EB',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  profileChipActive: {
    backgroundColor: '#009999',
  },
  profileChipText: {
    color: '#374151',
    fontWeight: '500',
  },
  profileChipTextActive: {
    color: '#fff',
    fontWeight: '700',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  genderContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  genderButton: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    alignItems: 'center',
  },
  genderButtonActive: {
    borderColor: '#009999',
    backgroundColor: '#E6FFFF',
  },
  genderButtonText: {
    fontSize: 16,
    color: '#6B7280',
  },
  genderButtonTextActive: {
    color: '#009999',
    fontWeight: '600',
  },
  dobContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  dobInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    textAlign: 'center',
  },
  yearInput: {
    flex: 2,
  },
  saveButtonContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  saveButton: {
    backgroundColor: '#009999',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EditProfile;
