import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import TabBar from "../../components/TabBar";
import React, { useEffect, useState } from "react";
import ProfilePic from "../../components/ProfilePic";
import InfoCard from "../../components/InfoCard";
import Label from "../../components/Label";
import {
  useActiveSession,
  useRecommendedVaccineList,
  useUserLocation,
  useVaccineList,
} from "../../utilities/zustand";
import dayjs from "dayjs";
import { useRouter } from "expo-router";
import SettingsModal from "../../components/SettingsModal";
import LogoutConfirmationModal from "../../components/LogoutConfirmationModal";
import ProfileBottomSheet from "../../components/ProfileBottomSheet";
import { fetchVaccines } from "../../utilities/api/vaccines";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { X } from "react-native-feather";
import { AddRecordModal, ViewRecordModal } from "./tracker";
import { IVaccineRecommendation } from "../../interfaces/requests/IVaccineRecommendation";
import { getRecommendedVaccines } from "../../utilities/api/user";

const icons = {
  cake: require("../../assets/icons/cake.png"),
  female: require("../../assets/icons/female.png"),
  certif: require("../../assets/icons/certif.png"),
};
const Profile = () => {
  const { activeAccount, activeUser, switchUser, switchAccount } =
    useActiveSession();
  const { recommendedList, setRecommendedList } = useRecommendedVaccineList();
  const [activeTab, setActiveTab] = useState("completed vaccination");
  const router = useRouter();
  const [showSettings, setShowSettings] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const [showProfileSheet, setShowProfileSheet] = useState(false);
  const [viewRecordVisible, setViewRecordVisible] = useState(false);
  const [addRecordVisible, setAddRecordVisible] = useState(false);
  // const [recommendedVaccine, setRecommendedVaccine] = useState<
  //   IVaccineRecommendation[]
  // >([]);

  useEffect(() => {
    if (recommendedList.length == 0) {
      getRecommendedVaccines(
        activeAccount?.id ?? "",
        activeUser?.id ?? ""
      ).then((res) => {
        setRecommendedList(res);
      });
    }
  }, []);

  const handleProfileToggle = async (profileId: string) => {
    // setProfiles((prev) =>
    //   prev.map((p) => ({
    //     ...p,
    //     selected: p.id === profileId,
    //   }))
    // );
    setRecommendedList([]);
    const newUser = activeAccount?.userList.find((p) => p.id == profileId);
    if (newUser) {
      await AsyncStorage.setItem("activeUser", newUser.id);
      switchUser(newUser);
      const rv = await getRecommendedVaccines(
        activeAccount?.id ?? "",
        newUser.id
      );
      setRecommendedList(rv);
    }
    setShowProfileSheet(false);
  };

  const handleAddNewProfile = () => {
    setShowProfileSheet(false);
  };

  const handleLogout = () => {
    setShowSettings(false);
    setShowLogoutConfirmation(true);
  };

  const handleConfirmLogout = async () => {
    switchUser(null);
    switchAccount(null);
    setRecommendedList([]);
    await AsyncStorage.removeItem("accountId");
    await AsyncStorage.removeItem("activeUser");
    await AsyncStorage.removeItem("hasSeenOnboarding");
    // setActiveUser(null);
    // setActiveAccount(null);
    router.replace("/(auth)/log_in");
  };

  const handleEditProfile = () => {
    setShowSettings(false);
    router.push("/edit_profile");
  };

  const renderCompletedVac = () => (
    <View>
      {activeUser?.vaccinationHistory.map((hist) => (
        <View key={hist.id}>
          <InfoCard
            onPress={() => setViewRecordVisible(true)}
            key={hist.id}
            iconSource={require("../../assets/icons/certif.png")}
            title={hist.vaccine.vaccineName}
            subtitle={
              <View style={styles.subtitleRow}>
                <Text style={styles.subtitleText}>Completed in</Text>
                <Label
                  text={dayjs(hist.vaccinationDate).format("DD MMMM YYYY")}
                  variant="teal"
                />
              </View>
            }
            rightIconSource={require("../../assets/icons/chevron_down.png")}
          />

          <ViewRecordModal
            open={viewRecordVisible}
            setOpen={setViewRecordVisible}
            record={hist}
          />
        </View>
      ))}
    </View>
  );

  const renderRecommendedVac = () => (
    <View>
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
    </View>
  );

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={styles.container}>
        <View style={styles.stickyHeader}>
          <Text style={styles.headerText}>Profile</Text>
          <View style={styles.stickyHeaderSettings}>
            <TouchableOpacity onPress={() => setAddRecordVisible(true)}>
              <Image
                source={require("../../assets/icons/user.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowSettings(true)}>
              <Image
                source={require("../../assets/icons/settings.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.contentWrapper}>
          <View style={styles.rowItem}>
            <View style={styles.mb16}>
              <ProfilePic name={activeUser?.fullName ?? ""} />
            </View>

            <View>
              <View style={styles.nameRow}>
                <TouchableOpacity
                  style={{ flexDirection: "row", alignItems: "center" }}
                  onPress={() => setShowProfileSheet(true)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.title}>{activeUser?.fullName}</Text>
                  <Image
                    source={require("../../assets/icons/chevron_down.png")}
                    style={styles.chevronIcon}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.statsRow}>
                <View style={styles.rowItem}>
                  <Image source={icons.cake} style={styles.icon} />
                  <Text>
                    {dayjs(activeUser?.dateOfBirth).format("DD MMMM YYYY")}
                  </Text>
                </View>

                <View style={styles.rowItem}>
                  <Image source={icons.female} style={styles.icon} />
                  <Text>{activeUser?.gender == "M" ? "Male" : "Female"}</Text>
                </View>
              </View>
            </View>
          </View>

          <TabBar
            activeTab={activeTab}
            onChangeTab={setActiveTab}
            tabs={["recommended vaccination", "completed vaccination"]}
          />

          <ScrollView
            style={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40 }}
          >
            {activeTab === "completed vaccination"
              ? renderCompletedVac()
              : renderRecommendedVac()}
          </ScrollView>
        </View>

        <SettingsModal
          isVisible={showSettings}
          onClose={() => setShowSettings(false)}
          onEditProfile={handleEditProfile}
          onLogout={handleLogout}
        />

        <LogoutConfirmationModal
          isVisible={showLogoutConfirmation}
          onClose={() => setShowLogoutConfirmation(false)}
          onConfirm={handleConfirmLogout}
        />

        {/* Profile Bottom Sheet */}
        <ProfileBottomSheet
          isVisible={showProfileSheet}
          onClose={() => setShowProfileSheet(false)}
          profiles={activeAccount?.userList ?? []}
          onProfileToggle={handleProfileToggle}
          onAddNewProfile={handleAddNewProfile}
        />

        <AddRecordModal open={addRecordVisible} setOpen={setAddRecordVisible} />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  stickyHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 10,
    backgroundColor: "#ffffff",
    zIndex: 10,
  },
  stickyHeaderSettings: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    gap: 15,
    // paddingHorizontal: 16,
    // paddingTop: 16,
    // paddingBottom: 10,
    // backgroundColor: "#ffffff",
    // zIndex: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  icon: {
    width: 24,
    height: 24,
  },
  chevronIcon: {
    width: 20,
    height: 20,
  },
  contentWrapper: {
    flex: 1,
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  scrollContainer: {
    flex: 1,
    paddingTop: 16,
  },
  rowItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 8,
  },
  mb16: {
    marginRight: 12,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
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
});

export default Profile;
