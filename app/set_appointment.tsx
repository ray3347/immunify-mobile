import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import AddProfileForm from "../components/AddProfileForm"; // Pastikan komponen ini sudah ada
import { useLocalSearchParams, useRouter } from "expo-router"; // Tambahkan import ini
import { useActiveSession, useVaccineList } from "../utilities/zustand";
import { IClinic } from "../interfaces/db/IClinic";
import { IVaccine } from "../interfaces/db/IVaccine";
import VaccineCard from "../components/VaccineCard";
import ListCard from "../components/ListCard";
import InfoCard from "../components/InfoCard";
import dayjs from "dayjs";
import { bookAppointment } from "../utilities/api/appointment";
import { IBookAppointmentRequestDTO } from "../interfaces/requests/IBookAppointmentRequestDTO";
import { addUser } from "../utilities/api/user";
import { IUser } from "../interfaces/db/IUser";

// interface Profile {
//   id: string;
//   name: string;
//   age: string;
//   selected: boolean;
// }

const SetAppointment = () => {
  const { vaccineId, clinicId, date, time } = useLocalSearchParams();
  const [modalVisible, setModalVisible] = useState(false);
  // const [profiles, setProfiles] = useState<Profile[]>([
  //   { id: '1', name: 'Tommy Anderson', age: '12', selected: true },
  //   { id: '2', name: 'Emma Anderson', age: '8', selected: false },
  //   { id: '3', name: 'John Anderson', age: '42', selected: false }
  // ]);
  const router = useRouter(); // Tambahkan ini
  const { activeAccount, activeUser, switchAccount, switchUser } =
    useActiveSession();
  const [selectedUser, setSelectedUser] = useState(activeUser);
  const { vaccineList } = useVaccineList();

  const [activeVaccine, setActiveVaccine] = useState<IVaccine>();
  const [activeClinic, setActiveClinic] = useState<IClinic>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const vaccine = vaccineList.find((v) => v.id == vaccineId);
    if (vaccine) {
      setActiveVaccine(vaccine);
      const clinic = vaccine.availableAt.find((c) => c.id == clinicId);
      if (clinic) {
        setActiveClinic(clinic);
      }
    }
  }, []);

  const toggleProfileSelection = (id: string) => {
    const profile = activeAccount?.userList.find((u) => u.id == id);
    if (profile) {
      setSelectedUser(profile);
    }
    // setProfiles(profiles.map(profile =>
    //   profile.id === id ? { ...profile, selected: !profile.selected } : profile
    // ));
  };

  const openAddProfileModal = () => {
    setModalVisible(true);
  };

  const closeAddProfileModal = () => {
    setModalVisible(false);
  };

  const handleAddProfile = (profile: {
    name: string;
    gender: string;
    dateOfBirth: string;
  }) => {
    // const newProfile: Profile = {
    //   id: Date.now().toString(),
    //   name: profile.name,
    //   age: profile.dateOfBirth
    //     ? (new Date().getFullYear() - Number(profile.dateOfBirth.split('-')[0])).toString()
    //     : '',
    //   selected: false,
    // };
    // setProfiles([...profiles, newProfile]);
    setLoading(true);
    const newProfile: IUser = {
      id: "",
      fullName: profile.name,
      // color: getRandomColor(),
      // selected: false,
      gender: profile.gender,
      dateOfBirth: new Date(profile.dateOfBirth),
      scheduledAppointments: [],
      vaccinationHistory: [],
    };

    addUser(activeAccount?.id ?? "", newProfile).then((res) => {
      console.log(res);

      switchAccount(res);
      switchUser(activeUser);
      setModalVisible(false);
    });
    setLoading(false);
  };

  // const getSelectedCount = () => {
  //   return profiles.filter(profile => profile.selected).length;
  // };

  const handleConfirmBooking = () => {
    if (activeVaccine && activeClinic) {
      const req: IBookAppointmentRequestDTO = {
        userId: selectedUser?.id ?? "",
        clinicId: activeClinic.id,
        selectedDate: typeof date === "string" ? new Date(date) : new Date(),
        selectedStartTime: typeof time === "string" ? time : "",
        vaccine: activeVaccine,
      };
      bookAppointment(activeAccount?.id ?? "", req).then((res) => {
        switchAccount(res.dto);
        const user = res.dto.userList.find((u) => u.id == activeUser?.id);
        if (user) {
          switchUser(user);
        }

        router.replace({
          pathname: "/booking_summary",
          params: {
            appointmentId: res.appointmentId,
            appointedUserId: activeUser?.id,
            isResultScreen: "true",
          },
        });
      });
    }
  };

  return (
    <>
      {loading ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            zIndex: 20,
          }}
        >
          <ActivityIndicator size="large" color="#008B8B" />
        </View>
      ) : (
        <View style={styles.mainContainer}>
          <ScrollView style={styles.container}>
            {/* Profile Selection Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Select Profiles to Book</Text>

              {activeAccount?.userList.map((profile) => (
                <TouchableOpacity
                  key={profile.id}
                  style={[
                    styles.profileCard,
                    profile.id == selectedUser?.id && styles.profileSelected,
                  ]}
                  onPress={() => toggleProfileSelection(profile.id)}
                >
                  <View style={styles.profileInfo}>
                    <Text style={styles.profileName}>{profile.fullName}</Text>
                    {/* <Text style={styles.profileDetails}>Age: {profile.age}</Text> */}
                  </View>
                  <View style={styles.checkboxContainer}>
                    <View
                      style={
                        profile.id == selectedUser?.id
                          ? styles.checkboxSelected
                          : styles.checkbox
                      }
                    >
                      {profile.id == selectedUser?.id && (
                        <Feather name="check" size={16} color="white" />
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              ))}

              {/* Add Another Profile Button */}
              <TouchableOpacity
                style={styles.addProfileButton}
                onPress={openAddProfileModal}
              >
                <Feather name="plus" size={16} color="#009688" />
                <Text style={styles.addProfileText}>Add Another Profile</Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.sectionTitle}>Appointment Details</Text>
              <InfoCard
                iconSource={
                  activeClinic?.image
                    ? { uri: activeClinic.image }
                    : require("../assets/images/vaccine.png")
                }
                title={activeClinic?.name ?? ""}
                subtitle={`${activeClinic?.address.slice(0, 45) + "..."}`}
                titleColor="#4B5563"
              />
              <InfoCard
                iconSource={
                  activeVaccine?.image
                    ? { uri: activeVaccine.image }
                    : require("../assets/images/vaccine.png")
                }
                title={activeVaccine?.vaccineName ?? ""}
                subtitle={`${activeVaccine?.price} - Pay during your visit`}
                titleColor="#4B5563"
              />
              {/* <VaccineCard
            title={activeVaccine?.vaccineName ?? ""}
            image={
              activeVaccine?.image
                ? { uri: activeVaccine.image }
                : require("../assets/images/vaccine.png")
            }
            location={""}
            distance={"Available"}
            price={activeVaccine?.price ?? ""}
          /> */}
            </View>
            <View style={{ height: 170 }} />
          </ScrollView>

          <View style={styles.footer}>
            <Text style={styles.bookingInfo}>
              Booking for {selectedUser?.fullName} on{" "}
              {dayjs(
                typeof date === "string" ? new Date(date) : new Date()
              ).format("dddd, DD MMMM YYYY")}{" "}
              at {typeof time === "string" ? time : ""}
            </Text>
            <TouchableOpacity
              style={[
                styles.primaryBtn,
                !selectedUser && styles.disabledButton,
              ]}
              disabled={!selectedUser}
              onPress={handleConfirmBooking} // Tambahkan ini
            >
              <Text style={styles.confirmButtonText}>Confirm Booking</Text>
            </TouchableOpacity>
          </View>

          <AddProfileForm
            isVisible={modalVisible}
            onClose={closeAddProfileModal}
            onSave={handleAddProfile}
          />
        </View>
      )}
    </>
  );
};

const { height: screenHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  section: {
    marginBottom: 16,
    backgroundColor: "white",
    borderRadius: 6,
    padding: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  infoContainer: {
    // marginTop: 12,
    paddingVertical: 6,
  },
  infoLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  inputContainer: {
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
  },
  profileCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  profileSelected: {
    borderColor: "#009688",
    borderWidth: 2,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  profileDetails: {
    fontSize: 14,
    color: "#666",
  },
  checkboxContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
  },
  checkboxSelected: {
    width: 24,
    height: 24,
    backgroundColor: "#009688",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  addProfileButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  addProfileText: {
    marginLeft: 8,
    color: "#009688",
    fontWeight: "500",
  },
  footer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    alignItems: "center",
    width: "100%",
    position: "absolute",
    bottom: 0,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: "#eeeeee",
  },
  bookingInfo: {
    textAlign: "center",
    width: "100%",
    marginTop: 16,
    marginBottom: 8,
    fontSize: 14,
    color: "#666",
  },
  primaryBtn: {
    width: "100%",
    marginTop: 8,
    marginBottom: 16,
    backgroundColor: "#009688",
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#cccccc",
  },
  confirmButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  bottomSheetContainer: {
    width: "100%",
    backgroundColor: "transparent",
  },
  bottomSheet: {
    backgroundColor: "white",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 24,
    maxHeight: screenHeight * 0.85,
  },
  bottomSheetHandle: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 12,
  },
  handle: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#e0e0e0",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  modalForm: {
    padding: 16,
  },
  modalInputContainer: {
    marginBottom: 16,
  },
  // New radio button styles
  radioContainer: {
    marginTop: 4,
  },
  radioOption: {
    marginBottom: 12,
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioOuterCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#009688",
    alignItems: "center",
    justifyContent: "center",
  },
  radioInnerCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#009688",
  },
  radioButtonText: {
    fontSize: 16,
    marginLeft: 10,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    marginBottom: 16,
  },
  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 12,
    alignItems: "center",
    marginRight: 8,
  },
  cancelButtonText: {
    color: "#333",
    fontWeight: "500",
  },
  addButton: {
    flex: 1,
    backgroundColor: "#009688",
    borderRadius: 4,
    padding: 12,
    alignItems: "center",
    marginLeft: 8,
  },
  addButtonText: {
    color: "white",
    fontWeight: "500",
  },
});

export default SetAppointment;
