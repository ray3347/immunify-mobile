import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { Plus, Check } from 'lucide-react-native';
import ProfileModal from './ProfileModal';

interface ProfileSelectionModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (profile: any) => void;
}

type Role = 'Child' | 'Spouse' | 'Parent' | 'Other';

export interface Profile {
  id: string;
  fullName: string;
  ktp: string;
  dateOfBirth: {
    day: string;
    month: string;
    year: string;
  };
  gender: 'Male' | 'Female' | null;
  role: Role;
  otherRole?: string;
  avatar: string;
}

type NewProfile = Omit<Profile, 'id' | 'avatar'>;

const ProfileSelectionModal: React.FC<ProfileSelectionModalProps> = ({
  visible,
  onClose,
  onSave,
}) => {
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>('1');
  const [profiles, setProfiles] = useState<Profile[]>([
    {
      id: '1',
      fullName: 'Jane Doe',
      ktp: '123456789',
      dateOfBirth: { day: '15', month: '06', year: '2015' },
      gender: 'Female',
      role: 'Child',
      avatar: '#f9aeae',
    },
    {
      id: '2',
      fullName: 'John Doe',
      ktp: '987654321',
      dateOfBirth: { day: '10', month: '03', year: '2018' },
      gender: 'Male',
      role: 'Child',
      avatar: '#4a8ea5',
    },
  ]);

  const handleProfileSelect = (profileId: string) => {
    setSelectedProfileId(profileId);
    onSave(profileId);
  };

  const handleAddProfile = () => {
    setProfileModalVisible(true);
  };

  const generateRandomColor = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 60%, 75%)`;
  };

  const handleSaveProfile = (profileData: NewProfile) => {
    const newProfile: Profile = {
      ...profileData,
      id: Date.now().toString(),
      avatar: generateRandomColor(),
    };

    setProfiles([...profiles, newProfile]);
    setProfileModalVisible(false);
  };

  const renderInitials = (name: string) => {
    const parts = name.split(' ');
    return parts[0].charAt(0) + (parts[1]?.charAt(0) || '');
  };

  const getProfileDisplayRole = (profile: Profile) =>
    profile.role === 'Other' && profile.otherRole ? profile.otherRole : profile.role;

  const renderProfile = ({ item, index }: { item: Profile; index: number }) => {
    const isSelected = selectedProfileId === item.id;

    return (
      <TouchableOpacity
        style={[styles.profileItem, { borderBottomWidth: index === profiles.length - 1 ? 0 : 1 }]}
        onPress={() => handleProfileSelect(item.id)}
      >
        <View style={styles.profileInfo}>
          <View style={[styles.avatar, { backgroundColor: item.avatar }]}>
            <Text style={styles.avatarText}>{renderInitials(item.fullName)}</Text>
          </View>
          <View style={styles.profileText}>
            <Text style={styles.profileName}>{item.fullName}</Text>
            <Text style={styles.profileSubtitle}>{getProfileDisplayRole(item)}</Text>
          </View>
        </View>
        <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
          {isSelected && <Check color="#fff" size={20} />}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Modal transparent visible={visible} animationType="slide" onRequestClose={onClose}>
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <View style={styles.headerLine} />
          </View>

          <FlatList
            data={profiles}
            renderItem={renderProfile}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.profileList}
          />

          <TouchableOpacity style={styles.addButton} onPress={handleAddProfile}>
            <Plus color="#008080" size={24} />
            <Text style={styles.addButtonText}>Add New Profile</Text>
          </TouchableOpacity>
        </View>

        <ProfileModal
          visible={profileModalVisible}
          onClose={() => setProfileModalVisible(false)}
          onSave={handleSaveProfile}
        />
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 30,
    maxHeight: '80%',
  },
  header: {
    alignItems: 'center',
    padding: 15,
  },
  headerLine: {
    width: 40,
    height: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  profileList: {
    paddingHorizontal: 20,
  },
  profileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomColor: '#e0e0e0',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileText: {
    marginLeft: 15,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#008080',
    borderColor: '#008080',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: '#008080',
    borderRadius: 8,
  },
  addButtonText: {
    color: '#008080',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10,
  },
});

export default ProfileSelectionModal;
