import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Linking,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import InfoCard from "../components/InfoCard";
import Accordion from "../components/Accordion";
import Divider from "../components/Divider";
import TabBar from "../components/TabBar";
import PrimaryButton from "../components/PrimaryButton";

const icons = {
  car: require("../assets/icons/car.png"),
  star: require("../assets/icons/star.png"),
  location: require("../assets/icons/location-marker.png"),
  direction: require("../assets/icons/direction_.png"),
  clock: require("../assets/icons/clock.png"),
  globe: require("../assets/icons/globe.png"),
  chevron: require("../assets/icons/chevron_down.png"),
  user: require("../assets/icons/user.png"),
};

const vaccineList = [
  {
    id: "V001",
    title: "HPV Vaccine",
    description: [
      "HPV vaccine protects against the sexually transmitted human papillomavirus.",
      "Recommended for both genders, typically at ages 11-12 or as early as 9.",
      "Administered in a series of 2-3 doses.",
      "Highly effective in preventing certain cancers and genital warts.",
      "Generally safe with mild side effects such as pain, redness, or swelling at the injection site.",
    ],
  },
  {
    id: "V002",
    title: "Hepatitis B Vaccine",
    description: [
      "Hepatitis B vaccine protects against hepatitis B virus infection.",
      "Recommended for all ages, with the first dose typically given at birth.",
      "Usually administered in a series of 3-4 doses.",
      "Prevents liver disease, liver cancer, and chronic infection.",
      "Generally safe with minimal side effects.",
    ],
  },
];

const ClinicDetail = () => {
  const [activeTab, setActiveTab] = useState("information");
  const router = useRouter();

  const goToBookAppointment = () => {
    router.push("../set_appointment");
  };

  const renderInfoCards = () => (
    <>
      <InfoCard
        iconSource={icons.location}
        rightIconSource={icons.direction}
        title="Jl. Pulo Mas Bar. VI No.20"
        subtitle="Kec. Pulo Gadung, DKI Jakarta"
        titleColor="#4B5563"
        onPress={() =>
          Linking.openURL(
            "https://www.google.com/maps/dir//RS+EMC+Pulomas,+Jl.+Pulo+Mas+Bar.+VI+No.20,+RT.1%2FRW.11,+Kayu+Putih,+Pulo+Gadung,+East+Jakarta+City,+Jakarta+13210"
          )
        }
      />
      <InfoCard
        iconSource={icons.clock}
        title="Open"
        subtitle="24 Hours"
        titleColor="#008B8B"
      />
      <InfoCard
        iconSource={icons.globe}
        title="www.emc.id"
        rightIconSource={icons.chevron}
        onPress={() => Linking.openURL("https://www.emc.id/")}
      />
      <Text style={styles.sectionTitle}>List of Vaccines</Text>
      <Accordion vaccineList={vaccineList} />
    </>
  );

  const renderReviews = () => (
    <>
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <InfoCard
            key={i}
            iconSource={icons.user}
            title={`User Review ${i + 1}`}
            subtitle="This is a sample review to test scrolling functionality."
          />
        ))}
    </>
  );

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/image 1.png")}
        style={styles.headerImage}
      />
      <View style={styles.contentWrapper}>
        <Text style={styles.clinicTitle}>Example Clinic</Text>

        <View style={styles.statsRow}>
          <View style={styles.rowItem}>
            <Image source={icons.car} style={styles.icon} />
            <Text style={styles.statText}>1.2 km</Text>
          </View>

          <Divider />

          <View style={styles.rowItem}>
            <Image source={icons.star} style={[styles.icon, styles.starIcon]} />
            <Text style={styles.statText}>4.9</Text>
          </View>
        </View>

        <TabBar
          activeTab={activeTab}
          onChangeTab={setActiveTab}
          tabs={["information", "reviews"]}
        />

        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {activeTab === "information" ? renderInfoCards() : renderReviews()}
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <PrimaryButton
          title="Set Appointment"
          onPress={goToBookAppointment}
          style={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  headerImage: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },
  contentWrapper: {
    flex: 1,
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  clinicTitle: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#333",
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 8,
  },
  rowItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 20,
    height: 20,
  },
  starIcon: {
    marginRight: 4,
  },
  statText: {
    fontSize: 14,
    color: "#777",
    marginLeft: 4,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#333",
    paddingTop: 16,
  },
  scrollContainer: {
    flex: 1,
    paddingTop: 16,
  },
  footer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    alignItems: "center",
    width: "100%",
  },
  button: {
    width: "100%",
    marginTop: 36,
    bottom: 36,
  },
});

export default ClinicDetail;
