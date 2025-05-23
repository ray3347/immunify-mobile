import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import BigCard from "../../components/BigCard";
import Label from "../../components/Label";
import InfoCard from "../../components/InfoCard";
import CardNoBorder from "../../components/CardNoBorder";
import TextButton from "../../components/TextButton";
import ProfileSelectionModal from "../../components/ProfileSelectionModal";
import AddProfileModal from "../../components/AddProfileModal";

// Define TypeScript interfaces
interface Profile {
  id: string;
  name: string;
  gender: string;
  dateOfBirth: Date | null;
}

interface ProfileData {
  name: string;
  gender: string;
  dateOfBirth: Date | null;
}

interface ClinicProps {
  onPress: () => void;
  onViewAll: () => void;
}

interface ArticleProps {
  onPress: () => void;
  onViewDetail: () => void;
}

const Home: React.FC = () => {
  const router = useRouter();

  const handleNextClinic = () => router.push("../clinic_detail");
  const viewAllClinic = () => router.push("/(tabs)/vaccines");
  const handleNextArticle = () => router.push("../clinic_detail");
  const viewArticlePage = () => router.push("../article_detail");

  const [profileSelectionVisible, setProfileSelectionVisible] = useState(false);
  const [addProfileVisible, setAddProfileVisible] = useState(false);
  const [expandedModal, setExpandedModal] = useState<string | null>(null);
  const [profiles, setProfiles] = useState<Profile[]>([
    { id: "1", name: "Jane Doe", gender: "female", dateOfBirth: new Date(1990, 0, 1) }
  ]);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(profiles[0]);

  const handleAddNewProfile = (profileData: ProfileData) => {
    const newProfile: Profile = {
      id: Date.now().toString(),
      ...profileData
    };
    setProfiles([...profiles, newProfile]);
  };
  
  return (
    <>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.stickyHeader}>
            <View>
              <Text style={styles.greetingText}>Hello,</Text>
              <TouchableOpacity
                style={styles.nameRow}
                onPress={() => setProfileSelectionVisible(true)}
              >
                <Text style={styles.nameText}>{selectedProfile?.name || "Select Profile"}</Text>
                <Image
                  source={require("../../assets/icons/chevron_down.png")}
                  style={styles.chevronIcon}
                />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <UpcomingVaccineSection />
            {/* <ClinicsNearbySection
              onPress={handleNextClinic}
              onViewAll={viewAllClinic}
            /> */}
            <ArticlesSection
              onPress={handleNextArticle}
              onViewDetail={viewArticlePage}
            />
          </ScrollView>
        </View>
      </ScrollView>

      <ProfileSelectionModal
        visible={profileSelectionVisible}
        onClose={() => setProfileSelectionVisible(false)}
        profiles={profiles}
        selectedProfile={selectedProfile}
        onSelectProfile={(profile: Profile) => {
          setSelectedProfile(profile);
          setProfileSelectionVisible(false);
        }}
        onAddNewProfile={() => {
          setProfileSelectionVisible(false);
          setAddProfileVisible(true);
        }}
      />
      
      {/* Add Profile Modal */}
      <AddProfileModal
        visible={addProfileVisible}
        onClose={() => setAddProfileVisible(false)}
        onSave={handleAddNewProfile}
      />
    </>
  );
};

const UpcomingVaccineSection: React.FC = () => (
  <View style={styles.sectionSpacing}>
    <Text style={styles.sectionTitle}>Upcoming Vaccine</Text>
    <Text style={styles.sectionSubtitle}>lorem ipsum dolor sit amet</Text>
    <InfoCard
      iconSource={require("../../assets/icons/injection_fill.png")}
      title="HPV"
      subtitle={
        <View style={styles.subtitleRow}>
          <Text style={styles.subtitleText}>Next dose due in</Text>
          <Label text="3 Days" variant="orange" />
        </View>
      }
    />
  </View>
);

const clinicData = [
  {
    title: "Example Clinic 1",
    address: "123 Main St, City, Country",
    distance: "1.2 km",
    rating: "4.9",
    imageSource: require("../../assets/images/image 1.png"),
  },
  {
    title: "Example Clinic 2",
    address: "123 Main St, City, Country",
    distance: "2.5 km",
    rating: "4.7",
    imageSource: require("../../assets/images/image 2.png"),
  },
  {
    title: "Example Clinic 3",
    address: "456 Elm St, City, Country",
    distance: "3.1 km",
    rating: "4.6",
    imageSource: require("../../assets/images/image 3.png"),
  },
];

const ClinicsNearbySection: React.FC<ClinicProps> = ({
  onPress,
  onViewAll,
}) => (
  <View style={styles.sectionSpacing}>
    <View style={styles.headerRow}>
      <View>
        <Text style={styles.sectionTitle}>Clinics Nearby</Text>
        <Text style={[styles.sectionSubtitle, styles.mb16]}>
          Find the closest clinic to your location
        </Text>
      </View>
      <TextButton text="View All" onPress={onViewAll} />
    </View>

    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.clinicsScrollContent}
    >
      {clinicData.map((clinic, index) => (
        <BigCard
          key={index}
          onPress={onPress}
          title={clinic.title}
          address={clinic.address}
          distance={clinic.distance}
          rating={clinic.rating}
          imageSource={clinic.imageSource}
        />
      ))}
    </ScrollView>
  </View>
);

const vaccineArticles = [
  {
    title: "Polio: Key Facts and Global Impact",
    subtitle:
      "Understanding the risks, symptoms, and the ongoing global effort to eradicate polio.",
    image: require("../../assets/images/article2.png"),
  },
  {
    title: "What You Need to Know About the Varicella Vaccine",
    subtitle:
      "A quick guide to chickenpox prevention and how the vaccine works.",
    image: require("../../assets/images/article1.png"),
  },
  {
    title: "Flu Vaccine Myths Busted",
    subtitle:
      "Don't let common misconceptions keep you from staying protected.",
    image: require("../../assets/images/article3.png"),
  },
];

const ArticlesSection: React.FC<ArticleProps> = ({ onPress, onViewDetail }) => {
  return (
    <View style={styles.sectionSpacing}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.sectionTitle}>Featured Reads</Text>
          <Text style={[styles.sectionSubtitle, styles.mb16]}>
            Get insights about vaccination
          </Text>
        </View>
        <TextButton
          text="View All"
          onPress={() => console.log("Text button pressed")}
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.clinicsScrollContent}
      >
        {vaccineArticles.map((article, i) => (
          <CardNoBorder
            key={i}
            onPress={onViewDetail}
            title={article.title}
            summary={article.subtitle}
            imageSource={article.image}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    marginTop: 56,
    paddingHorizontal: 16,
  },
  innerContainer: {
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  greetingText: {
    fontSize: 12,
    color: "#6B7280",
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  nameText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4B5563",
  },
  chevronIcon: {
    width: 20,
    height: 20,
  },
  sectionSpacing: {
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4B5563",
    flexShrink: 1,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#9E9E9E",
    marginTop: 0,
    flexShrink: 1,
  },
  mb16: {
    marginBottom: 16,
  },
  subtitleRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  subtitleText: {
    color: "#9E9E9E",
    marginRight: 4,
  },
  clinicsScrollContent: {
    paddingRight: 0,
  },
  stickyHeader: {
    paddingTop: 16,
    paddingBottom: 10,
    backgroundColor: "#ffffff",
    zIndex: 10,
  },
  scrollContent: {
    paddingHorizontal: 0,
    paddingBottom: 0,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Home;