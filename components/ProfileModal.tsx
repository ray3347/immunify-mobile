import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Profile } from './ProfileSelectionModal';

type NewProfile = Omit<Profile, 'id' | 'avatar'>;

interface ProfileModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (profile: NewProfile) => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ visible, onClose, onSave }) => {
  const [fullName, setFullName] = useState('');
  const [ktp, setKtp] = useState('');
  const [role, setRole] = useState<'Child' | 'Spouse' | 'Parent' | 'Other'>('Child');
  const [otherRole, setOtherRole] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | null>(null);
  const [dateOfBirth, setDateOfBirth] = useState({
    day: '',
    month: '',
    year: '',
  });

  const handleSave = () => {
    onSave({
      fullName,
      ktp,
      role,
      otherRole,
      gender,
      dateOfBirth,
    });
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Add Profile</Text>
        <TextInput placeholder="Full Name" style={styles.input} onChangeText={setFullName} />
        <TextInput placeholder="KTP" style={styles.input} onChangeText={setKtp} />
        {/* More inputs like DOB, gender, role, etc. */}
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: '#008080',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  saveButtonText: { color: 'white', fontWeight: 'bold' },
  cancelButton: { alignItems: 'center' },
  cancelButtonText: { color: '#666' },
});

export default ProfileModal;
