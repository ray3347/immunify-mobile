// VaccineTracker.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  FlatList,
  TextInput,
  SafeAreaView,
} from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { ChevronDown, Plus, X } from "react-native-feather";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Dropdown } from "react-native-element-dropdown";
import PrimaryButton from "../../components/PrimaryButton";
import dayjs from "dayjs";
import { useRouter } from "expo-router";
interface VaccineRecord {
  id: string;
  userId: string;
  userName: string;
  userColor: string;
  vaccineName: string;
  date: string;
  time: string;
  location: string;
  dose: string;
}

interface User {
  id: string;
  name: string;
  color: string;
}

const Tracker = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState<string>(dayjs().format("YYYY-MM-DD"));
  const [monthPickerVisible, setMonthPickerVisible] = useState(false);

  const [addRecordVisible, setAddRecordVisible] = useState(false);

  const [expandedRecordId, setExpandedRecordId] = useState<string | null>(null);
  const router = useRouter();
    // useEffect(()=>{
    //   setSelectedDate(dayjs(new Date()).format("DD MMMM YYYY"))
    // },[]);

  const toggleRecord = (id: string) => {
    if (expandedRecordId === id) {
      setExpandedRecordId(null);
    } else {
      setExpandedRecordId(id);
    }
  };

  const users = [
    { id: "1", name: "Jane Doe", color: "pink" },
    { id: "2", name: "John Doe", color: "blue" },
  ];

  const [vaccineRecords, setVaccineRecords] = useState<VaccineRecord[]>([
    {
      id: "1",
      userId: "1",
      userName: "Jane Doe",
      userColor: "pink",
      vaccineName: "COVID-19 Booster",
      date: "2025-01-15",
      time: "10:00 AM",
      location: "City Clinic",
      dose: "2nd dose",
    },
    {
      id: "2",
      userId: "2",
      userName: "John Doe",
      userColor: "blue",
      vaccineName: "Flu Shot",
      date: "2025-01-20",
      time: "2:30 PM",
      location: "Health Center",
      dose: "1st dose",
    },
  ]);

  const getMarkedDates = () => {
    const marked: any = {};

    vaccineRecords.forEach((record) => {
      const dateString = record.date;

      if (!marked[dateString]) {
        marked[dateString] = {
          dots: [],
        };
      }

      marked[dateString].dots.push({
        key: record.id,
        color: record.userColor,
        selectedDotColor: record.userColor,
        dotStyle: {
          width: 8,
          height: 8,
          borderRadius: 4,
          marginTop: 2,
        },
      });
    });

    if (selectedDate) {
      marked[selectedDate] = {
        ...(marked[selectedDate] || {}),
        selected: true,
        selectedColor: "#008B8B", 
      };
    }

    const today = dayjs().format("YYYY-MM-DD");
    if (today !== selectedDate) {
      marked[today] = {
        ...(marked[today] || {}),
        customStyles: {
          container: {
            borderWidth: 2,
            borderColor: "#FF9800",
            borderRadius: 20,
            backgroundColor: "#FFF8E1", 
          },
          text: {
            color: "#FF9800",
            fontWeight: "bold",
          },
        },
        today: true,
      };
    }

    return marked;
  };

  const currentCalendarDate = `${selectedYear}-${String(
    selectedMonth + 1
  ).padStart(2, "0")}-01`;

  const filteredRecords = selectedDate
    ? vaccineRecords.filter((record) => record.date === selectedDate)
    : vaccineRecords;

  const handleDateSelect = (day: DateData) => {
    setSelectedDate(day.dateString);
  };

  const handleMonthChange = (monthData: { year: number; month: number }) => {
    setSelectedMonth(monthData.month - 1); 
    setSelectedYear(monthData.year);
  };
  const [newRecord, setNewRecord] = useState<{
    userId: string;
    vaccineName: string;
    date: string;
    time: string;
    location: string;
    dose: string;
  }>({
    userId: "1",
    vaccineName: "",
    date: new Date().toISOString().split("T")[0],
    time: "12:00 PM",
    location: "",
    dose: "1st dose",
  });

  const addVaccineRecord = () => {
    const selectedUser = users.find((user) => user.id === newRecord.userId);

    if (selectedUser) {
      const newVaccineRecord: VaccineRecord = {
        id: Date.now().toString(),
        userId: selectedUser.id,
        userName: selectedUser.name,
        userColor: selectedUser.color,
        vaccineName: newRecord.vaccineName,
        date: newRecord.date,
        time: newRecord.time,
        location: newRecord.location,
        dose: newRecord.dose,
      };

      setVaccineRecords([...vaccineRecords, newVaccineRecord]);
      setAddRecordVisible(false);

      // Reset new record form
      setNewRecord({
        userId: "1",
        vaccineName: "",
        date: new Date().toISOString().split("T")[0],
        time: "12:00 PM",
        location: "",
        dose: "1st dose",
      });
    }
  };

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  // const navigation = useNavigation();

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Tracker</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setAddRecordVisible(true)}
            >
              <Plus width={24} height={24} stroke="#fff" />
            </TouchableOpacity>
          </View>

          <Calendar
            current={currentCalendarDate}
            markedDates={getMarkedDates()}
            markingType="multi-dot" 
            onDayPress={handleDateSelect}
            onMonthChange={handleMonthChange}
            renderHeader={(date: string) => {
              const months = [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
              ];
              const d = new Date(date);
              return (
                <Text style={{ fontSize: 18, fontWeight: "bold", color: "#008B8B" }}>
                  {months[d.getMonth()]} {d.getFullYear()}
                </Text>
              );
            }}
            theme={{
              arrowColor: "#008B8B",
              dotColor: "#008B8B", 
              todayDotColor: "#FF9800",
            }}
          />

          {/* Records List */}
          <View style={styles.recordsContainer}>
            <Text style={styles.recordsTitle}>
              {`Records for ${dayjs(selectedDate || dayjs().format("YYYY-MM-DD")).format("DD MMMM YYYY")}`}
            </Text>

            <FlatList
              data={filteredRecords}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.recordCard}
                  onPress={() => router.push("/detail_records")}
                >
                  {/* Baris 1: Profile & Nama */}
                  <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
                    <View
                      style={[
                        styles.userIndicator,
                        { backgroundColor: item.userColor },
                      ]}
                    />
                    <Text style={styles.recordTitle}>{item.userName}</Text>
                  </View>
                  {/* Baris 2: Nama Vaksin */}
                  <Text style={styles.recordUser}>{item.vaccineName}</Text>
                  {/* Baris 3: Tanggal & waktu, lokasi */}
                  <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
                    <Text style={styles.cardInfoText}>
                      {dayjs(item.date).format("DD MMM YYYY")} • {item.time}
                    </Text>
                    <Text style={[styles.cardInfoText, { color: "#008B8B", marginLeft: 8 }]}>
                      {item.location}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>

          {/* Month Picker Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={monthPickerVisible}
            onRequestClose={() => setMonthPickerVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Select Month & Year</Text>
                  <TouchableOpacity
                    onPress={() => setMonthPickerVisible(false)}
                  >
                    <X width={24} height={24} stroke="#000" />
                  </TouchableOpacity>
                </View>

                <ScrollView>
                  {/* Year selection */}
                  <Text style={styles.sectionTitle}>Year</Text>
                  <View style={styles.yearPicker}>
                    {[2024, 2025, 2026].map((year) => (
                      <TouchableOpacity
                        key={year}
                        style={[
                          styles.yearOption,
                          selectedYear === year && styles.selectedOption,
                        ]}
                        onPress={() => setSelectedYear(year)}
                      >
                        <Text
                          style={
                            selectedYear === year
                              ? styles.selectedOptionText
                              : styles.optionText
                          }
                        >
                          {year}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  {/* Month selection */}
                  <Text style={styles.sectionTitle}>Month</Text>
                  <View style={styles.monthPicker}>
                    {[
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec",
                    ].map((month, index) => (
                      <TouchableOpacity
                        key={month}
                        style={[
                          styles.monthOption,
                          selectedMonth === index && styles.selectedOption,
                        ]}
                        onPress={() => setSelectedMonth(index)}
                      >
                        <Text
                          style={
                            selectedMonth === index
                              ? styles.selectedOptionText
                              : styles.optionText
                          }
                        >
                          {month}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <PrimaryButton
                    onPress={() => setMonthPickerVisible(false)}
                    title="Apply"
                    style={styles.applyButton}
                  />
                </ScrollView>
              </View>
            </View>
          </Modal>

          {/* Add Record Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={addRecordVisible}
            onRequestClose={() => setAddRecordVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Add Vaccine Record</Text>
                  <TouchableOpacity onPress={() => setAddRecordVisible(false)}>
                    <X width={24} height={24} stroke="#000" />
                  </TouchableOpacity>
                </View>

                <ScrollView style={styles.formContainer}>
                  <Text style={styles.formLabel}>Vaccinant</Text>
                  <View>
                    <Dropdown
                      data={users}
                      labelField="name"
                      valueField="id"
                      value={value}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={(item) => {
                        setValue(item.id);
                        setIsFocus(false);
                      }}
                      placeholder={!isFocus ? "Choose vaccinant" : "..."}
                      style={styles.dropdown}
                    />
                  </View>

                  {/* Vaccine Name */}
                  <Text style={styles.formLabel}>Vaccine Name</Text>
                  <TextInput
                    style={styles.textInput}
                    value={newRecord.vaccineName}
                    onChangeText={(text) =>
                      setNewRecord({ ...newRecord, vaccineName: text })
                    }
                    placeholder="Enter vaccine name"
                  />

                  {/* Date */}
                  <Text style={styles.formLabel}>Date</Text>
                  <TextInput
                    style={styles.textInput}
                    value={newRecord.date}
                    onChangeText={(text) =>
                      setNewRecord({ ...newRecord, date: text })
                    }
                    placeholder="YYYY-MM-DD"
                  />

                  {/* Time */}
                  <Text style={styles.formLabel}>Time</Text>
                  <TextInput
                    style={styles.textInput}
                    value={newRecord.time}
                    onChangeText={(text) =>
                      setNewRecord({ ...newRecord, time: text })
                    }
                    placeholder="Enter time"
                  />

                  {/* Location */}
                  <Text style={styles.formLabel}>Location</Text>
                  <TextInput
                    style={styles.textInput}
                    value={newRecord.location}
                    onChangeText={(text) =>
                      setNewRecord({ ...newRecord, location: text })
                    }
                    placeholder="Enter location"
                  />

                  {/* Dose */}
                  <Text style={styles.formLabel}>Dose</Text>
                  <View style={styles.dosePicker}>
                    {["1st dose", "2nd dose", "3rd dose", "Booster"].map(
                      (dose) => (
                        <TouchableOpacity
                          key={dose}
                          style={[
                            styles.doseOption,
                            newRecord.dose === dose && styles.selectedOption,
                          ]}
                          onPress={() => setNewRecord({ ...newRecord, dose })}
                        >
                          <Text
                            style={
                              newRecord.dose === dose
                                ? styles.selectedOptionText
                                : styles.optionText
                            }
                          >
                            {dose}
                          </Text>
                        </TouchableOpacity>
                      )
                    )}
                  </View>

                  <TouchableOpacity
                    style={styles.saveButton}
                    onPress={addVaccineRecord}
                  >
                    <Text style={styles.saveButtonText}>Save Record</Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    // backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    backgroundColor: "#fff",
  },
  monthSelector: {
    flexDirection: "row",
    alignItems: "center",
  },
  monthText: {
    fontSize: 24,
    fontWeight: "bold",
    marginRight: 8,
  },
  addButton: {
    backgroundColor: "#008B8B",
    width: 40,
    height: 40,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  recordsContainer: {
    flex: 1,
    paddingVertical: 16,
    backgroundColor: "#fff",
    marginTop: 8,
  },
  recordsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  recordCard: {
    backgroundColor: "#fff",
    borderRadius: 6,
    padding: 16,
    marginBottom: 12,
    borderColor: "#EDEDED",
    borderWidth: 1,
  },
  recordHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  userRecordHeader:{
    flexDirection: "row",
    
  }
  ,
  userIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  recordTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  recordUser: {
    fontSize: 14,
    color: "#666",
    marginRight: 8,
  },
  recordDate: {
    fontSize: 14,
    color: "#888",
  },
  recordDetails: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  yearPicker: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  yearOption: {
    padding: 12,
    margin: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    minWidth: 80,
    alignItems: "center",
  },
  monthPicker: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  monthOption: {
    padding: 12,
    margin: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    width: "30%",
    alignItems: "center",
  },
  selectedOption: {
    backgroundColor: "#008B8B",
    borderColor: "#008B8B",
  },
  optionText: {
    color: "#333",
  },
  selectedOptionText: {
    color: "#fff",
    fontWeight: "bold",
  },
  applyButton: {
    backgroundColor: "#008B8B",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 24,
    marginBottom: 16,
  },
  applyButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  formContainer: {
    paddingBottom: 16,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  userPicker: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userOption: {
    flex: 1,
    padding: 12,
    margin: 4,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: "center",
  },
  userOptionText: {
    color: "#333",
  },
  selectedUserText: {
    color: "#fff",
    fontWeight: "bold",
  },
  dosePicker: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  doseOption: {
    padding: 12,
    margin: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    width: "48%",
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: "#008B8B",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 24,
    marginBottom: 16,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  dropdown: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardContent: {
    marginLeft: 12,
    flex: 1,
  },
  cardInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    marginBottom: 2,
  },
  cardInfoText: {
    color: "#888",
    fontSize: 13,
    marginRight: 8,
  },
  cardLocation: {
    color: "#008B8B",
    fontSize: 13,
    marginTop: 2,
  },
});

export default Tracker;
