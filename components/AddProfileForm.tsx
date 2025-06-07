import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

interface AddProfileFormProps {
  isVisible: boolean;
  onClose: () => void;
  onSave: (profile: { 
    name: string; 
    gender: string; 
    dateOfBirth: string;  // Changed from dob to dateOfBirth
  }) => void;
}

const AddProfileForm: React.FC<AddProfileFormProps> = ({
  isVisible,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [dobDay, setDobDay] = useState('');
  const [dobMonth, setDobMonth] = useState('');
  const [dobYear, setDobYear] = useState('');

  const handleSubmit = () => {
    const formattedDate = `${dobYear}-${dobMonth.padStart(2, '0')}-${dobDay.padStart(2, '0')}`;
    onSave({
      name,
      gender,
      dateOfBirth: formattedDate 
    });
    
    // Reset form
    setName('');
    setGender('');
    setDobDay('');
    setDobMonth('');
    setDobYear('');
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Add New Profile</Text>
            <TouchableOpacity onPress={onClose}>
              <AntDesign name="close" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            {/* Name Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter full name"
              />
            </View>

            {/* Gender Selection */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Gender</Text>
              <View style={styles.genderContainer}>
                <TouchableOpacity
                  style={[
                    styles.genderButton,
                    gender === 'male' && styles.genderButtonActive,
                  ]}
                  onPress={() => setGender('male')}
                >
                  <Text style={[
                    styles.genderButtonText,
                    gender === 'male' && styles.genderButtonTextActive,
                  ]}>Male</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.genderButton,
                    gender === 'female' && styles.genderButtonActive,
                  ]}
                  onPress={() => setGender('female')}
                >
                  <Text style={[
                    styles.genderButtonText,
                    gender === 'female' && styles.genderButtonTextActive,
                  ]}>Female</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Date of Birth */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Date of Birth</Text>
              <View style={styles.dobContainer}>
                <TextInput
                  style={styles.dobInput}
                  value={dobDay}
                  onChangeText={text => setDobDay(text.replace(/[^0-9]/g, '').slice(0, 2))}
                  placeholder="DD"
                  keyboardType="numeric"
                  maxLength={2}
                />
                <TextInput
                  style={styles.dobInput}
                  value={dobMonth}
                  onChangeText={text => setDobMonth(text.replace(/[^0-9]/g, '').slice(0, 2))}
                  placeholder="MM"
                  keyboardType="numeric"
                  maxLength={2}
                />
                <TextInput
                  style={[styles.dobInput, styles.dobYearInput]}
                  value={dobYear}
                  onChangeText={text => setDobYear(text.replace(/[^0-9]/g, '').slice(0, 4))}
                  placeholder="YYYY"
                  keyboardType="numeric"
                  maxLength={4}
                />
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.submitButton,
              (!name || !gender || !dobDay || !dobMonth || !dobYear) && styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={!name || !gender || !dobDay || !dobMonth || !dobYear}
          >
            <Text style={styles.submitButtonText}>Add Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  form: {
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
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
  dobYearInput: {
    flex: 2,
  },
  submitButton: {
    backgroundColor: '#009999',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AddProfileForm;