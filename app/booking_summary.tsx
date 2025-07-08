import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Linking,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useActiveSession } from "../utilities/zustand";
import { IUserAppointment } from "../interfaces/db/IAppointment";
import dayjs from "dayjs";
import { IUser } from "../interfaces/db/IUser";
import { Ionicons } from "@expo/vector-icons";

const BookingSummary = () => {
  const router = useRouter();
  const { appointmentId, appointedUserId, isResultScreen } =
    useLocalSearchParams();
  const { activeAccount } = useActiveSession();
  const [appUser, setAppUser] = useState<IUser>();
  const [activeAppointment, setActiveAppointment] =
    useState<IUserAppointment>();

  useEffect(() => {
    if (
      typeof appointedUserId == "string" &&
      typeof appointmentId == "string"
    ) {
      const user = activeAccount?.userList.find((u) => u.id == appointedUserId);
      if (user) {
        setAppUser(user);
        const appointment = user.scheduledAppointments.find(
          (a) => a.id == appointmentId
        );
        if (appointment) {
          setActiveAppointment(appointment);
        }
      }
    }
  }, []);

  const handleBackToHome = () => {
    typeof isResultScreen == "string" && isResultScreen == "true"
      ? router.replace("/(tabs)/home")
      : router.replace("/(tabs)/tracker");
  };

  const handleOpenMaps = () => {
    Linking.openURL(activeAppointment?.clinic.googleMapsURL ?? "");
  };

  // const summary = {
  //   clinic: "Klinik Sehat Sentosa",
  //   date: "Apr 26, 2025",
  //   time: "10:30 AM",
  //   vaccine: "MMR Vaccine",
  //   profiles: [
  //     { id: "1", name: "Tommy Anderson", age: 12 },
  //     { id: "2", name: "Emma Anderson", age: 8 },
  //   ],
  // };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={
            typeof isResultScreen == "string" && isResultScreen == "true"
              ? require("../assets/icons/clock.png")
              : require("../assets/icons/hospital.png")
          }
          style={styles.icon}
        />
        <Text style={styles.title}>Booking Details</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Clinic</Text>
          <Text style={styles.summaryValue}>
            {activeAppointment?.clinic.name}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Date</Text>
          <Text style={styles.summaryValue}>
            {dayjs(activeAppointment?.scheduledDate ?? new Date()).format(
              "dddd, DD MMMM YYYY"
            )}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Time</Text>
          <Text style={styles.summaryValue}>
            {activeAppointment?.scheduledTime} -{" "}
            {activeAppointment?.scheduledEndTime}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Vaccine</Text>
          <Text style={styles.summaryValue}>
            {activeAppointment?.vaccine.vaccineName}
          </Text>
        </View>
        <View style={[styles.summaryRow, { alignItems: "flex-start" }]}>
          <Text style={styles.summaryLabel}>Profiles</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.profileListText}>
              {appUser?.fullName}{" "}
              {/* <Text style={styles.profileAgeText}>
                ({dayjs().diff(dayjs(appUser?.dateOfBirth), "year")} yrs)
              </Text> */}
            </Text>
            {/* {summary.profiles.map((profile) => (
              
            ))} */}
          </View>
        </View>
        {typeof isResultScreen == "string" && isResultScreen == "true" ? (
          <>
            <Text style={styles.infoText}>
              Please wait for verification from the clinic.
            </Text>
            <Text style={styles.detailText}>
              Your booking is being processed. You will receive a notification
              once your appointment is confirmed.
            </Text>
          </>
        ) : (
          <></>
        )}
      </View>
      {typeof isResultScreen == "string" && isResultScreen == "false" && (
        <TouchableOpacity
          style={{
            ...styles.primaryBtn,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 10,
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: "#008B8B"
          }}
          onPress={handleOpenMaps}
        >
          <Ionicons name="navigate-outline" size={18} color="#008B8B" />
          <Text style={{
            ...styles.primaryBtnText,
            color: "#008B8B"
          }}> Open in Google Maps</Text>
        </TouchableOpacity>

      )}
      
      <TouchableOpacity style={styles.primaryBtn} onPress={handleBackToHome}>
        <Text style={styles.primaryBtnText}>
          {" "}
          {typeof isResultScreen == "string" && isResultScreen == "true"
            ? "Back to Home"
            : "Back"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "100%",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    marginBottom: 32,
  },
  icon: {
    width: 48,
    height: 48,
    marginBottom: 16,
    tintColor: "#009688",
    resizeMode: "contain",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#009688",
    marginBottom: 18,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 6,
  },
  summaryLabel: {
    fontSize: 15,
    color: "#666",
    fontWeight: "500",
    flex: 1,
  },
  summaryValue: {
    fontSize: 15,
    color: "#222",
    fontWeight: "600",
    flex: 1,
    textAlign: "right",
  },
  profileListText: {
    fontSize: 15,
    color: "#222",
    fontWeight: "600",
    textAlign: "right",
  },
  profileAgeText: {
    fontWeight: "400",
    color: "#666",
    fontSize: 14,
  },
  infoText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginTop: 18,
    marginBottom: 8,
    fontWeight: "500",
  },
  detailText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 4,
  },
  primaryBtn: {
    width: "100%",
    backgroundColor: "#009688",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  primaryBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default BookingSummary;
