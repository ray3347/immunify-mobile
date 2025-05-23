import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Platform,
  TouchableWithoutFeedback
} from "react-native";

// Define interfaces for props and data
interface ProfileData {
  name: string;
  gender: string;
  dateOfBirth: Date;
}

interface AddProfileModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (profile: ProfileData) => void;
}

const AddProfileModal: React.FC<AddProfileModalProps> = ({ visible, onClose, onSave }) => {
  // Form state
  const [name, setName] = useState<string>("");
  const [gender, setGender] = useState<string>("male");
  const [date, setDate] = useState<Date>(new Date());
  
  // Date selection state
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [day, setDay] = useState<number>(new Date().getDate());

  // Handler functions
  const handleSave = (): void => {
    const birthDate = new Date(year, month - 1, day);
    onSave({ name, gender, dateOfBirth: birthDate });
    resetForm();
    onClose();
  };

  const resetForm = (): void => {
    setName("");
    setGender("male");
    const currentDate = new Date();
    setDate(currentDate);
    setYear(currentDate.getFullYear());
    setMonth(currentDate.getMonth() + 1);
    setDay(currentDate.getDate());
  };

  // Date adjustment with validation
  const adjustDate = (field: 'day' | 'month' | 'year', increment: number): void => {
    if (field === 'day') {
      const newDay = day + increment;
      const maxDays = new Date(year, month, 0).getDate();
      if (newDay >= 1 && newDay <= maxDays) {
        setDay(newDay);
        updateDate(year, month, newDay);
      }
    } else if (field === 'month') {
      const newMonth = month + increment;
      if (newMonth >= 1 && newMonth <= 12) {
        // Adjust day if it exceeds the max days in the new month
        const maxDays = new Date(year, newMonth, 0).getDate();
        const newDay = day > maxDays ? maxDays : day;
        setMonth(newMonth);
        setDay(newDay);
        updateDate(year, newMonth, newDay);
      }
    } else if (field === 'year') {
      const newYear = year + increment;
      const currentYear = new Date().getFullYear();
      if (newYear >= 1900 && newYear <= currentYear) {
        setYear(newYear);
        updateDate(newYear, month, day);
      }
    }
  };

  const updateDate = (y: number, m: number, d: number): void => {
    setDate(new Date(y, m - 1, d));
  };

  const formatDate = (date: Date): string => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  // UI Components
  const renderGenderOptions = () => (
    <View style={styles.radioGroup}>
      {['male', 'female'].map((option) => (
        <TouchableOpacity
          key={option}
          style={styles.radioOption}
          onPress={() => setGender(option)}
        >
          <View style={[styles.radioButton, gender === option && styles.radioSelected]} />
          <Text style={styles.radioLabel}>{option.charAt(0).toUpperCase() + option.slice(1)}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderDatePicker = () => (
    <View style={styles.datePickerContainer}>
      {/* Day selector */}
      <DateField 
        label="Day" 
        value={day} 
        onDecrement={() => adjustDate('day', -1)} 
        onIncrement={() => adjustDate('day', 1)} 
      />
      
      {/* Month selector */}
      <DateField 
        label="Month" 
        value={month} 
        onDecrement={() => adjustDate('month', -1)} 
        onIncrement={() => adjustDate('month', 1)} 
      />
      
      {/* Year selector */}
      <DateField 
        label="Year" 
        value={year} 
        onDecrement={() => adjustDate('year', -1)} 
        onIncrement={() => adjustDate('year', 1)} 
      />
    </View>
  );

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Add New Profile</Text>
                <TouchableOpacity onPress={onClose}>
                  <Text style={styles.closeButton}>×</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Name</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter full name"
                  value={name}
                  onChangeText={setName}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Gender</Text>
                {renderGenderOptions()}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Date of Birth</Text>
                {renderDatePicker()}
                <Text style={styles.datePreview}>
                  Selected: {formatDate(date)}
                </Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => {
                    resetForm();
                    onClose();
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.saveButton} 
                  onPress={handleSave}
                  activeOpacity={0.7}
                >
                  <Text style={styles.saveButtonText}>Save Profile</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

interface DateFieldProps {
  label: string;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const DateField: React.FC<DateFieldProps> = ({ label, value, onIncrement, onDecrement }) => (
  <View style={styles.dateField}>
    <Text style={styles.dateLabel}>{label}</Text>
    <View style={styles.dateButtonGroup}>
      <TouchableOpacity 
        style={styles.dateAdjustButton} 
        onPress={onDecrement}
      >
        <Text style={styles.dateAdjustText}>−</Text>
      </TouchableOpacity>
      <Text style={styles.dateValue}>{value}</Text>
      <TouchableOpacity 
        style={styles.dateAdjustButton} 
        onPress={onIncrement}
      >
        <Text style={styles.dateAdjustText}>+</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 24,
    width: "100%",
    maxWidth: 400,
    maxHeight: "80%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingBottom: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
  },
  closeButton: {
    fontSize: 20,
    color: "#6B7280",
    width: 28,
    height: 28,
    textAlign: "center",
    lineHeight: 28,
    borderRadius: 14,
    backgroundColor: "#F3F4F6",
  },
  inputContainer: {
    marginBottom: 20,
    position: "relative",
    zIndex: 1,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#4B5563",
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "white", 
    zIndex: 10, 
    elevation: 3, 
  },
  radioGroup: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 24,
    marginBottom: 8,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#6B7280",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  radioSelected: {
    borderColor: "#008B8B",
    backgroundColor: "#008B8B",
  },
  radioLabel: {
    fontSize: 16,
    color: "#4B5563",
  },
  datePickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    gap: 4,
  },
  dateField: {
    flex: 1,
    alignItems: "center",
  },
  dateLabel: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 4,
  },
  dateButtonGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 2,
    width: "100%",
  },
  dateAdjustButton: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
  },
  dateAdjustText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4B5563",
    textAlign: "center",
  },
  dateValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#4B5563",
    minWidth: 24,
    textAlign: "center",
  },
  datePreview: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 8,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 24,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingTop: 16,
    zIndex: 10, 
  },
  saveButton: {
    backgroundColor: "#008B8B",
    borderRadius: 6,
    padding: 10,
    paddingHorizontal: 16,
    alignItems: "center",
    marginLeft: 10,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  cancelButton: {
    backgroundColor: "#F3F4F6",
    borderRadius: 6,
    padding: 10,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#4B5563",
    fontWeight: "600",
    fontSize: 14,
  },
});

export default AddProfileModal;