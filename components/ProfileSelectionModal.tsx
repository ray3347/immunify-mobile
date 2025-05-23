// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Modal,
//   StyleSheet,
//   SafeAreaView,
//   FlatList,
// } from 'react-native';
// import { Plus, Check } from 'lucide-react-native';
// import ProfileModal from './ProfileModal';

// interface ProfileSelectionModalProps {
//   visible: boolean;
//   onClose: () => void;
//   onSave: (profile: any) => void;
// }

// type Role = 'Child' | 'Spouse' | 'Parent' | 'Other';

// export interface Profile {
//   id: string;
//   fullName: string;
//   ktp: string;
//   dateOfBirth: {
//     day: string;
//     month: string;
//     year: string;
//   };
//   gender: 'Male' | 'Female' | null;
//   role: Role;
//   otherRole?: string;
//   avatar: string;
// }

// type NewProfile = Omit<Profile, 'id' | 'avatar'>;

// const ProfileSelectionModal: React.FC<ProfileSelectionModalProps> = ({
//   visible,
//   onClose,
//   onSave,
// }) => {
//   const [profileModalVisible, setProfileModalVisible] = useState(false);
//   const [selectedProfileId, setSelectedProfileId] = useState<string | null>('1');
//   const [profiles, setProfiles] = useState<Profile[]>([
//     {
//       id: '1',
//       fullName: 'Jane Doe',
//       ktp: '123456789',
//       dateOfBirth: { day: '15', month: '06', year: '2015' },
//       gender: 'Female',
//       role: 'Child',
//       avatar: '#f9aeae',
//     },
//     {
//       id: '2',
//       fullName: 'John Doe',
//       ktp: '987654321',
//       dateOfBirth: { day: '10', month: '03', year: '2018' },
//       gender: 'Male',
//       role: 'Child',
//       avatar: '#4a8ea5',
//     },
//   ]);

//   const handleProfileSelect = (profileId: string) => {
//     setSelectedProfileId(profileId);
//     onSave(profileId);
//   };

//   const handleAddProfile = () => {
//     setProfileModalVisible(true);
//   };

//   const generateRandomColor = () => {
//     const hue = Math.floor(Math.random() * 360);
//     return `hsl(${hue}, 60%, 75%)`;
//   };

//   const handleSaveProfile = (profileData: NewProfile) => {
//     const newProfile: Profile = {
//       ...profileData,
//       id: Date.now().toString(),
//       avatar: generateRandomColor(),
//     };

//     setProfiles([...profiles, newProfile]);
//     setProfileModalVisible(false);
//   };

//   const renderInitials = (name: string) => {
//     const parts = name.split(' ');
//     return parts[0].charAt(0) + (parts[1]?.charAt(0) || '');
//   };

//   const getProfileDisplayRole = (profile: Profile) =>
//     profile.role === 'Other' && profile.otherRole ? profile.otherRole : profile.role;

//   const renderProfile = ({ item, index }: { item: Profile; index: number }) => {
//     const isSelected = selectedProfileId === item.id;

//     return (
//       <TouchableOpacity
//         style={[styles.profileItem, { borderBottomWidth: index === profiles.length - 1 ? 0 : 1 }]}
//         onPress={() => handleProfileSelect(item.id)}
//       >
//         <View style={styles.profileInfo}>
//           <View style={[styles.avatar, { backgroundColor: item.avatar }]}>
//             <Text style={styles.avatarText}>{renderInitials(item.fullName)}</Text>
//           </View>
//           <View style={styles.profileText}>
//             <Text style={styles.profileName}>{item.fullName}</Text>
//             <Text style={styles.profileSubtitle}>{getProfileDisplayRole(item)}</Text>
//           </View>
//         </View>
//         <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
//           {isSelected && <Check color="#fff" size={20} />}
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <Modal transparent visible={visible} animationType="slide" onRequestClose={onClose}>
//       <SafeAreaView style={styles.modalContainer}>
//         <View style={styles.modalContent}>
//           <View style={styles.header}>
//             <View style={styles.headerLine} />
//           </View>

//           <FlatList
//             data={profiles}
//             renderItem={renderProfile}
//             keyExtractor={(item) => item.id}
//             contentContainerStyle={styles.profileList}
//           />

//           <TouchableOpacity style={styles.addButton} onPress={handleAddProfile}>
//             <Plus color="#008080" size={24} />
//             <Text style={styles.addButtonText}>Add New Profile</Text>
//           </TouchableOpacity>
//         </View>

//         <ProfileModal
//           visible={profileModalVisible}
//           onClose={() => setProfileModalVisible(false)}
//           onSave={handleSaveProfile}
//         />
//       </SafeAreaView>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     paddingBottom: 30,
//     maxHeight: '80%',
//   },
//   header: {
//     alignItems: 'center',
//     padding: 15,
//   },
//   headerLine: {
//     width: 40,
//     height: 5,
//     backgroundColor: '#e0e0e0',
//     borderRadius: 5,
//   },
//   profileList: {
//     paddingHorizontal: 20,
//   },
//   profileItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 15,
//     borderBottomColor: '#e0e0e0',
//   },
//   profileInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   avatar: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   avatarText: {
//     color: 'white',
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   profileText: {
//     marginLeft: 15,
//   },
//   profileName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   profileSubtitle: {
//     fontSize: 14,
//     color: '#666',
//     marginTop: 2,
//   },
//   checkbox: {
//     width: 24,
//     height: 24,
//     borderRadius: 2,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   checkboxSelected: {
//     backgroundColor: '#008080',
//     borderColor: '#008080',
//   },
//   addButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginHorizontal: 20,
//     marginTop: 20,
//     paddingVertical: 15,
//     borderWidth: 1,
//     borderColor: '#008080',
//     borderRadius: 8,
//   },
//   addButtonText: {
//     color: '#008080',
//     fontSize: 16,
//     fontWeight: '500',
//     marginLeft: 10,
//   },
// });

// export default ProfileSelectionModal;
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  ListRenderItemInfo,
} from "react-native";

// Define the Profile interface
interface Profile {
  id: string;
  name: string;
  gender: string;
  dateOfBirth: Date | null;
}

// Define the props for the component
interface ProfileSelectionModalProps {
  visible: boolean;
  onClose: () => void;
  profiles: Profile[];
  selectedProfile: Profile | null;
  onSelectProfile: (profile: Profile) => void;
  onAddNewProfile: () => void;
}

const ProfileSelectionModal: React.FC<ProfileSelectionModalProps> = ({
  visible,
  onClose,
  profiles,
  selectedProfile,
  onSelectProfile,
  onAddNewProfile,
}) => {
  const formatDate = (date: Date | null): string => {
    if (!date) return "";
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const getInitials = (name: string): string => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getAvatarColor = (id: string): string => {
    const colors = ["#10B981", "#3B82F6", "#F59E0B", "#EC4899", "#8B5CF6"];
    const index = parseInt(id, 10) % colors.length;
    return colors[index];
  };

  const renderItem = ({ item }: ListRenderItemInfo<Profile>) => (
    <TouchableOpacity
      style={[
        styles.profileItem,
        selectedProfile?.id === item.id && styles.selectedProfileItem,
      ]}
      onPress={() => onSelectProfile(item)}
    >
      <View
        style={[
          styles.avatar,
          { backgroundColor: getAvatarColor(item.id) },
        ]}
      >
        <Text style={styles.avatarText}>{getInitials(item.name)}</Text>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>{item.name}</Text>
        <Text style={styles.profileMeta}>
          {item.gender.charAt(0).toUpperCase() + item.gender.slice(1)} • {formatDate(item.dateOfBirth)}
        </Text>
      </View>
      {selectedProfile?.id === item.id && (
        <View style={styles.checkmark}>
          <Text style={styles.checkmarkText}>✓</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Profile</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={profiles}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ListFooterComponent={
              <TouchableOpacity
                style={styles.addProfileButton}
                onPress={onAddNewProfile}
              >
                <View style={styles.addIcon}>
                  <Text style={styles.addIconText}>+</Text>
                </View>
                <Text style={styles.addProfileText}>Add New Profile</Text>
              </TouchableOpacity>
            }
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4B5563",
  },
  closeButton: {
    fontSize: 22,
    color: "#9E9E9E",
  },
  profileItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 12,
  },
  selectedProfileItem: {
    backgroundColor: "#ECFDF5",
    borderWidth: 1,
    borderColor: "#10B981",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4B5563",
  },
  profileMeta: {
    fontSize: 14,
    color: "#9E9E9E",
    marginTop: 2,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#10B981",
    alignItems: "center",
    justifyContent: "center",
  },
  checkmarkText: {
    color: "white",
    fontWeight: "bold",
  },
  addProfileButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    marginTop: 8,
    marginBottom: 8,
  },
  addIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  addIconText: {
    fontSize: 24,
    color: "#6B7280",
  },
  addProfileText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6B7280",
  },
});

export default ProfileSelectionModal;