import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

interface SettingsModalProps {
  isVisible: boolean;
  onClose: () => void;
  onEditProfile: () => void;
  onLogout: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isVisible,
  onClose,
  onEditProfile,
  onLogout,
}) => {
  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.modalContent}>
          <TouchableOpacity 
            style={styles.option} 
            onPress={onEditProfile}
          >
            <Feather name="edit" size={20} color="#333" />
            <Text style={styles.optionText}>Edit Profile</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.option, styles.logoutOption]} 
            onPress={onLogout}
          >
            <Feather name="log-out" size={20} color="#FF4444" />
            <Text style={[styles.optionText, styles.logoutText]}>Logout</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
  },
  optionText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  logoutOption: {
    marginTop: 8,
  },
  logoutText: {
    color: '#FF4444',
  },
});

export default SettingsModal;