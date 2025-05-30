import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import TabBar from "../../components/TabBar";
import React, { useState } from "react";
import ProfilePic from "../../components/ProfilePic";
import InfoCard from "../../components/InfoCard";
import Label from "../../components/Label";
import { useActiveSession } from "../../utilities/zustand";
import dayjs from "dayjs";
import { useRouter } from 'expo-router';
import SettingsModal from '../../components/SettingsModal';
import LogoutConfirmationModal from '../../components/LogoutConfirmationModal';
import ProfileBottomSheet from "../../components/ProfileBottomSheet"; 

const icons = {
  cake: require("../../assets/icons/cake.png"),
  female: require("../../assets/icons/female.png"),
  certif: require("../../assets/icons/certif.png"),

};
const Profile = () => {
  const {activeUser, setActiveUser, setActiveAccount} = useActiveSession();
  const [activeTab, setActiveTab] = useState("completed vaccination");
  const router = useRouter();
  const [showSettings, setShowSettings] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const [showProfileSheet, setShowProfileSheet] = useState(false);
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

  const handleProfileToggle = (profileId: string) => {
    setProfiles((prev) =>
      prev.map((p) => ({
        ...p,
        selected: p.id === profileId,
      }))
    );
    setShowProfileSheet(false);
  };

  const handleAddNewProfile = () => {
    setShowProfileSheet(false);
  };

  const handleLogout = () => {
    setShowSettings(false);
    setShowLogoutConfirmation(true);
  };

  const handleConfirmLogout = () => {
    setActiveUser(null);
    setActiveAccount(null);
    router.replace('/(auth)/log_in'); 
  };

  const handleEditProfile = () => {
    setShowSettings(false);
    router.push('/edit_profile');
  };

  const renderCompletedVac = () => (
    <View>
      {activeUser?.vaccinationHistory.map((hist) => (
        <InfoCard
          key={hist.id}  
          iconSource={require("../../assets/icons/certif.png")}
          title={hist.vaccine.vaccineName}
          subtitle={
            <View style={styles.subtitleRow}>
              <Text style={styles.subtitleText}>Completed in</Text>
              <Label text={dayjs(hist.vaccinationDate).format("DD MMMM YYYY")} variant="teal" />
            </View>
          }
        />
      ))}
      
    </View>
  );

  const renderRecommendedVac = () =>(
    <View>
      <InfoCard
        iconSource={require("../../assets/icons/injection_fill.png")}
        title="HPV"
        subtitle={
          <View style={styles.subtitleRow}>
            <Text style={styles.subtitleText}>Recommended in</Text>
            <Label text="3 Days" variant="orange" />
          </View>
        }
    />
    </View>
  );

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={styles.container}>
        <View style={styles.stickyHeader}>
          <Text style={styles.headerText}>Profile</Text>
          <TouchableOpacity onPress={() => setShowSettings(true)}>
            <Image
              source={require("../../assets/icons/settings.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.contentWrapper}>
          <View style={styles.rowItem}>
            <View style={styles.mb16}>
              <ProfilePic name={activeUser?.fullName ?? ""} size={64} />
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
                  <Text>{dayjs(activeUser?.dateOfBirth).format("DD MMMM YYYY")}</Text>
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
          profiles={profiles}
          onProfileToggle={handleProfileToggle}
          onAddNewProfile={handleAddNewProfile}
        />
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
