import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
import {
  GestureHandlerRootView,
  // ScrollView,
} from "react-native-gesture-handler";
import { useRouter } from "expo-router";

import Divider from "../../components/Divider";
import BigCard from "../../components/BigCard";
import Label from "../../components/Label";
import InfoCard from "../../components/InfoCard";
import CardNoBorder from "../../components/CardNoBorder";
import TextButton from "../../components/TextButton";
import ProfileBottomSheet from "../../components/ProfileBottomSheet"; 
import { useActiveSession } from "../../utilities/zustand";

const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const {activeAccount, activeUser} = useActiveSession();

  const [profiles, setProfiles] = useState([
    {
      id: "1",
      name: "John Doe",
      color: "#5B9BD5",
      selected: true,
      gender: "male",
      dateOfBirth: "1990-01-01",
    },
    {
      id: "2",
      name: "Jane Smith",
      color: "#F08A9B",
      selected: false,
      gender: "female",
      dateOfBirth: "1992-05-15",
    },
  ]);

  // Handler untuk memilih profile
  const handleProfileToggle = (profileId: string) => {
    setProfiles((prev) =>
      prev.map((p) => ({
        ...p,
        selected: p.id === profileId,
      }))
    );
    setModalVisible(false);
  };

  const handleAddNewProfile = () => {
    setModalVisible(false);
  };

  useEffect(()=>{
    console.log(activeUser);
  },[])

  const router = useRouter();
  const handleNextArticle = () => router.push("../clinic_detail");
  const viewArticlePage = () => router.push("../article_detail");

  return (
    <>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.stickyHeader}>
            <View>
              <Text style={styles.greetingText}>Hello,</Text>
              <TouchableOpacity
                style={styles.nameRow}
                onPress={() => setModalVisible(true)} 
              >
                <Text style={styles.nameText}>
                  {activeUser?.fullName}
                </Text>
                <Image
                  source={require("../../assets/icons/chevron_down.png")}
                  style={styles.chevronIcon}
                />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <UpcomingVaccineSection />
            <ArticlesSection
              onPress={handleNextArticle}
              onViewDetail={viewArticlePage}
            />
          </ScrollView>
        </View>
      </ScrollView>

      {/* Profile Bottom Sheet */}
      <ProfileBottomSheet
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        profiles={profiles}
        onProfileToggle={handleProfileToggle}
        onAddNewProfile={handleAddNewProfile}
      />
    </>
  );
};

const UpcomingVaccineSection = () => (
  <View style={styles.sectionSpacing}>
    <Text style={styles.sectionTitle}>Upcoming Vaccine</Text>
    <Text style={styles.sectionSubtitle}>Here are your next appointments</Text>
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
      "Don’t let common misconceptions keep you from staying protected.",
    image: require("../../assets/images/article3.png"),
  },
];

const ArticlesSection = ({
  onPress,
  onViewDetail,
}: {
  onPress: () => void;
  onViewDetail: () => void;
}) => {
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
    marginTop: 30,
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
    // paddingHorizontal: 16,
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

export const options = { headerShown: false };