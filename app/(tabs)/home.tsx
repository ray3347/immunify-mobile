import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  BackHandler,
  ActivityIndicator,
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
import {
  useActiveSession,
  useRecommendedVaccineList,
  useUserLocation,
  useVaccineList,
} from "../../utilities/zustand";
import { fetchVaccines } from "../../utilities/api/vaccines";
import { getRecommendedVaccines } from "../../utilities/api/user";

const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { activeAccount, activeUser, switchUser } = useActiveSession();
  const { vaccineList, setVaccineList } = useVaccineList();
  const { latitude, longtitude } = useUserLocation();
  const { recommendedList, setRecommendedList } = useRecommendedVaccineList();

  // useEffect(() => {
  //   // Disable Android back button
  //   const backHandler = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     () => true
  //   );

  //   return () => backHandler.remove();
  // }, []);

  useEffect(() => {
    if (vaccineList.length == 0) {
      fetchVaccines(latitude ?? "", longtitude ?? "").then((res) => {
        if (res) {
          setVaccineList(res);
        }
      });
    }

    if (recommendedList.length == 0) {
      getRecommendedVaccines(
        activeAccount?.id ?? "",
        activeUser?.id ?? ""
      ).then((res) => {
        setRecommendedList(res);
      });
    }
  }, []);

  // Handler untuk memilih profile
  const handleProfileToggle = (profileId: string) => {
    const newUser = activeAccount?.userList.find((p) => p.id == profileId);
    if (newUser) {
      switchUser(newUser);
      getRecommendedVaccines(activeAccount?.id ?? "", newUser.id).then(
        (res) => {
          setRecommendedList(res);
        }
      );
    }
    setModalVisible(false);
  };

  const handleAddNewProfile = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    console.log(activeUser);
  }, []);

  const router = useRouter();
  const handleNextArticle = () => router.push("../clinic_detail");
  const viewArticlePage = () => router.push("../article_detail");
  const viewAllVaccine = () => router.push("/(tabs)/vaccines");
  const viewVaccineDetail = (id: string) =>
    router.push({
      pathname: "/vaccine_detail",
      params: { vaccineId: id },
    });

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
                <Text style={styles.nameText}>{activeUser?.fullName}</Text>
                <Image
                  source={require("../../assets/icons/chevron_down.png")}
                  style={styles.chevronIcon}
                />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <UpcomingVaccineSection />
            <VaccinesSection
              onPress={viewAllVaccine}
              onViewDetail={viewVaccineDetail}
            />
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
        profiles={activeAccount?.userList ?? []}
        onProfileToggle={handleProfileToggle}
        onAddNewProfile={handleAddNewProfile}
      />
    </>
  );
};

const UpcomingVaccineSection = () => {
  const { recommendedList, setRecommendedList } = useRecommendedVaccineList();
  const router = useRouter();
  return (
    <>
      {recommendedList ? (
        <View style={styles.sectionSpacing}>
          <Text style={styles.sectionTitle}>Recommended Vaccines</Text>
          <Text style={styles.sectionSubtitle}>
            We think you might need these vaccines
          </Text>
          {recommendedList.map((v) => (
            <InfoCard
              onPress={() => {
                router.push({
                  pathname: "/vaccine_detail",
                  params: { vaccineId: v.vaccine.id },
                });
              }}
              key={v.vaccine.id}
              iconSource={require("../../assets/icons/injection_fill.png")}
              title={v.vaccine.vaccineName}
              subtitle={
                <View style={styles.subtitleRow}>
                  <Text style={styles.subtitleText}>
                    {/* {v.message.split(' ')[0] + " Vaccination"} */}
                    Vaccination Progress
                  </Text>
                  <Label
                    text={`Dose ${v.nextDose.toString()} of ${v.message.substring(
                      v.message.length - 2,
                      v.message.length - 1
                    )}`}
                    variant="orange"
                  />
                </View>
              }
              rightIconSource={require("../../assets/icons/chevron_down.png")}
            />
          ))}
          {/* <InfoCard
      iconSource={require("../../assets/icons/injection_fill.png")}
      title="HPV"
      subtitle={
        <View style={styles.subtitleRow}>
          <Text style={styles.subtitleText}>Next dose due in</Text>
          <Label text="3 Days" variant="orange" />
        </View>
      }
    /> */}
        </View>
      ) : (
        <ActivityIndicator size="large" color="#008B8B"/>
      )}
    </>
  );
};

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
        {/* <TextButton
          text="View All"
          onPress={() => console.log("Text button pressed")}
        /> */}
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

const VaccinesSection = ({
  onPress,
  onViewDetail,
}: {
  onPress: () => void;
  onViewDetail: (id: string) => void;
}) => {
  const { vaccineList, setVaccineList } = useVaccineList();
  return (
    <View style={styles.sectionSpacing}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.sectionTitle}>Vaccine Information</Text>
          <Text style={[styles.sectionSubtitle, styles.mb16]}>
            Know your vaccines!
          </Text>
        </View>
        <TextButton text="View All" onPress={onPress} />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.clinicsScrollContent}
      >
        {vaccineList.slice(0, 5).map((article, i) => (
          <CardNoBorder
            key={i}
            onPress={() => {
              onViewDetail(article.id);
            }}
            title={article.vaccineName}
            summary={article.informationSummary[0]}
            imageSource={
              article.image
                ? { uri: article.image }
                : require("../../assets/images/vaccine.png")
            }
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
