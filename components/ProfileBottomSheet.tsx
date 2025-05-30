import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import AddProfileForm from './AddProfileForm';

interface Profile {
  id: string;
  name: string;
  color: string;
  selected: boolean;
  gender?: string;
  dateOfBirth?: string; 
}

interface ProfileBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  profiles: Profile[];
  onProfileToggle: (profileId: string) => void;
  onAddNewProfile: () => void;
}

const ProfileBottomSheet: React.FC<ProfileBottomSheetProps> = ({
  isVisible,
  onClose,
  profiles,
  onProfileToggle,
  onAddNewProfile,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [localProfiles, setLocalProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    setLocalProfiles(profiles);
  }, [profiles]);

  const getRandomColor = () => {
    const colors = ['#F08A9B', '#5B9BD5', '#70AD47', '#FFC000', '#ED7D31'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleProfileToggle = (profileId: string) => {
    onProfileToggle(profileId);
  };

  const handleAddProfile = (profile: { name: string; gender: string; dateOfBirth: string }) => {
    const newProfile: Profile = {
      id: Date.now().toString(),
      name: profile.name,
      color: getRandomColor(),
      selected: false,
      gender: profile.gender,
      dateOfBirth: profile.dateOfBirth,
    };

    setLocalProfiles([...localProfiles, newProfile]);
    setShowAddForm(false);
    onAddNewProfile();
  };

  return (
    <>
      <Modal
        visible={isVisible}
        transparent
        animationType="slide"
        onRequestClose={onClose}
      >
        <Pressable style={styles.overlay} onPress={onClose}>
          <View style={styles.sheet}>
            <View style={styles.handleContainer}>
              <View style={styles.handle} />
            </View>

            <View style={styles.content}>

              {localProfiles.map((profile) => (
                <TouchableOpacity
                  key={profile.id}
                  style={styles.profileItem}
                  onPress={() => handleProfileToggle(profile.id)}
                >
                  <View style={styles.profileInfo}>
                    <View style={[styles.avatar, { backgroundColor: profile.color }]}>
                      <Text style={styles.avatarText}>
                        {profile.name.split(' ').map(n => n[0]).join('')}
                      </Text>
                    </View>
                    
                    <View>
                      <Text style={styles.profileName}>{profile.name}</Text>
                      <View style={styles.profileDetails}>
                        {profile.gender && profile.dateOfBirth && (
                          <Text style={styles.profileInfoText}>
                            {profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1)} • {profile.dateOfBirth}
                          </Text>
                        )}
                      </View>
                    </View>
                  </View>

                  <View style={[
                    styles.checkbox,
                    profile.selected && styles.checkboxSelected
                  ]}>
                    {profile.selected && (
                      <AntDesign name="check" size={16} color="white" />
                    )}
                  </View>
                </TouchableOpacity>
              ))}

              <TouchableOpacity
                style={styles.addButton}
                onPress={() => setShowAddForm(true)}
              >
                <Feather name="plus" size={20} color="#009999" style={styles.plusIcon} />
                <Text style={styles.addButtonText}>Add New Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>
      
      <AddProfileForm
        isVisible={showAddForm}
        onClose={() => setShowAddForm(false)}
        onSave={handleAddProfile}
      />
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
  },
  content: {
    paddingHorizontal: 16,
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#009999',
    borderColor: '#009999',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    paddingVertical: 16,
    borderWidth: 2,
    borderColor: '#009999',
    borderRadius: 12,
  },
  plusIcon: {
    marginRight: 8,
  },
  addButtonText: {
    color: '#009999',
    fontSize: 16,
    fontWeight: '600',
  },
  profileDetails: {
    flexDirection: 'column',
    gap: 4,
  },
  profileInfoText: {
    fontSize: 12,
    color: '#6B7280',
  },
  emptyState: {
    alignItems: 'center',
    padding: 24,
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
    marginBottom: 16,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#6B7280',
  },
  myProfileSection: {
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 8,
  },
});

export default ProfileBottomSheet;