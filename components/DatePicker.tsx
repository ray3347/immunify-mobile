// DatePicker component to replace the TextInput for date selection
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Modal,
  Platform
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { ChevronDown } from 'react-native-feather';

interface DatePickerProps {
  label: string;
  value: string;
  onChange: (date: string) => void;
  style?: object;
}

// Add this interface for the Calendar day press event
interface CalendarDayInfo {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
}

const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value,
  onChange,
  style
}) => {
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  // Format the date for display (YYYY-MM-DD to more readable format)
  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch (e) {
      return dateString; // Fallback to original string if parsing fails
    }
  };

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <TouchableOpacity 
        style={styles.dateInput}
        onPress={() => setDatePickerVisible(true)}
      >
        <Text style={value ? styles.dateText : styles.placeholderText}>
          {value ? formatDisplayDate(value) : 'Select a date'}
        </Text>
        <ChevronDown width={20} height={20} stroke="#666" />
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={isDatePickerVisible}
        animationType="fade"
        onRequestClose={() => setDatePickerVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setDatePickerVisible(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.calendarHeader}>
              <Text style={styles.calendarTitle}>Select Date</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setDatePickerVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
            
            <Calendar
              current={value || new Date().toISOString().split('T')[0]}
              onDayPress={(day: CalendarDayInfo) => {
                onChange(day.dateString);
                setDatePickerVisible(false);
              }}
              markedDates={{
                [value]: { selected: true, selectedColor: '#008B8B' }
              }}
              theme={{
                selectedDayBackgroundColor: '#008B8B',
                todayTextColor: '#008B8B',
                arrowColor: '#008B8B',
              }}
            />
            
            <TouchableOpacity 
              style={styles.applyButton}
              onPress={() => setDatePickerVisible(false)}
            >
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  dateText: {
    fontSize: 16,
    color: '#000',
  },
  placeholderText: {
    fontSize: 16,
    color: '#9E9E9E',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    maxHeight: '80%',
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  calendarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    color: '#008B8B',
    fontSize: 16,
  },
  applyButton: {
    backgroundColor: '#008B8B',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default DatePicker;