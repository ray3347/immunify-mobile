import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { act, useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import InfoCard from "../components/InfoCard";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useVaccineList } from "../utilities/zustand";
import { IVaccine } from "../interfaces/db/IVaccine";

const VaccineDetail = () => {
  const router = useRouter();
  const { vaccineId } = useLocalSearchParams();
  const { vaccineList } = useVaccineList();
  const [activeVaccine, setActiveVaccine] = useState<IVaccine>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(vaccineId);
    setLoading(true);
    if (vaccineId && vaccineList.length > 0) {
      const active = vaccineList.find((x) => x.id === vaccineId);
      if (active) {
        setActiveVaccine(active);
      }
    }
    setLoading(false);
  }, []);

  const goToBookAppointment = (clinicId: string) => {
    router.push({
      pathname: "/book_clinic",
      params: { clinicId: clinicId, vaccineId: vaccineId },
    });
    // router.push("/book_clinic");
    // router.push({
    //   pathname: "/vaccine_detail",
    //   params: { vaccineId: vaccine.id }
    // });
  };
  return (
    <ScrollView style={styles.scrollContainer}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#008B8B" />
          <Text style={styles.loadingText}>Loading vaccines...</Text>
        </View>
      ) : (
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.card}>
            <View style={styles.centeredRow}>
              <Image
                source={
                  activeVaccine?.image != ""
                    ? { uri: activeVaccine?.image }
                    : require("../assets/images/vaccine.png")
                }
                style={styles.vaccineImage}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.headingText}>
                  {activeVaccine?.vaccineName}
                </Text>
                <View style={styles.mt8}>
                  <Text style={styles.labelText}>Start from</Text>
                  <Text style={styles.titleText}>
                    {activeVaccine?.price} / dose
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Info Icons */}
          <View style={styles.card}>
            <View style={styles.infoIconsContainer}>
              <View style={styles.infoItem}>
                <Image
                  source={require("../assets/icons/injection_icon.png")}
                  style={styles.iconMedium}
                />
                <Text style={styles.labelText}>
                  {activeVaccine?.doses.toString()} Doses
                </Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.infoItem}>
                <Image
                  source={require("../assets/icons/clock.png")}
                  style={styles.iconMedium}
                />
                <Text style={styles.labelText}>
                  {activeVaccine?.doseInterval.toString()} Days Apart
                </Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.infoItem}>
                <Image
                  source={require("../assets/icons/user-check.png")}
                  style={styles.iconMedium}
                />
                <Text style={styles.labelText}>
                  {activeVaccine?.minimumAge.toString()} and older
                </Text>
              </View>
            </View>
          </View>

          {/* About Section */}
          <View style={styles.card}>
            <Text style={styles.headingText}>About This Vaccine</Text>
            <Text style={styles.bodyText}>
              {activeVaccine?.vaccineInformation}
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.headingText}>Possible Side Effects</Text>
            <View style={styles.sideEffectsContainer}>
              {activeVaccine?.sideEffects.map((effect, index) => (
                <View key={index} style={styles.sideEffectItem}>
                  <View style={styles.dotIcon} />
                  <Text style={styles.bodyText}>{effect}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.locationsContainer}>
            <Text style={styles.headingText}>Available to Book at</Text>
            {activeVaccine?.availableAt.length == 0 ? (
              <>
                <Text style={styles.bodyText}>
                  No clinic provides this type of vaccine yet, sorry :(
                </Text>
              </>
            ) : (
              <>
                {activeVaccine?.availableAt.map((location, index) => (
                  <InfoCard
                    key={index}
                    iconSource={require("../assets/icons/hospital.png")}
                    rightIconSource={require("../assets/icons/chevron_down.png")}
                    title={location.name}
                    // subtitle={`${location.distance} km away`}
                    onPress={() => {
                      goToBookAppointment(location.id);
                    }}
                  />
                ))}
              </>
            )}

            {/* Tambahkan tombol Book Appointment di bawah daftar lokasi */}
            {/* <TouchableOpacity
              // style={styles.bookButton}
              onPress={goToBookAppointment}
            >
              <Text >Book Appointment</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    padding: 16,
  },

  // --- Typography ---
  headingText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
  },
  titleText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  bodyText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  smallText: {
    fontSize: 12,
    color: "#666",
  },
  labelText: {
    fontSize: 14,
    color: "#666",
  },

  // --- Layout helpers ---
  row: {
    flexDirection: "row",
  },
  centeredRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  mt8: {
    marginTop: 8,
  },

  // --- Card style ---
  card: {
    backgroundColor: "#fff",
    borderRadius: 6,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 12,
  },

  // --- Image styles ---
  vaccineImage: {
    width: 70,
    height: 70,
    marginRight: 16,
    borderRadius: 4,
  },
  iconMedium: {
    width: 28,
    height: 28,
    tintColor: "#008B8B",
    marginBottom: 10,
  },
  iconSmall: {
    width: 24,
    height: 24,
    tintColor: "#008B8B",
    marginRight: 12,
  },

  // --- Info block ---
  infoIconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  infoItem: {
    alignItems: "center",
    flex: 1,
    paddingVertical: 8,
  },
  divider: {
    width: 1,
    height: "80%",
    backgroundColor: "#E5E7EB",
    marginHorizontal: 10,
  },

  // --- Side Effects ---
  sideEffectsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  sideEffectItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
    marginBottom: 12,
  },
  dotIcon: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#008B8B",
    marginRight: 10,
  },
  sideEffectText: {
    fontSize: 14,
    color: "#666",
  },

  // --- Locations ---
  locationsContainer: {
    marginBottom: 20,
  },
  locationsSectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 14,
  },
  locationCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 10,
  },
  locationContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationTextContainer: {
    flex: 1,
  },
  locationName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
  },
  locationDistance: {
    fontSize: 14,
    color: "#666",
  },

  // --- Button ---
  selectButtonContainer: {
    marginLeft: 10,
  },
  selectButton: {
    backgroundColor: "#f0f8f8",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#008B8B",
  },
  selectButtonText: {
    fontSize: 14,
    color: "#008B8B",
    fontWeight: "600",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#555",
  },
});

export default VaccineDetail;
