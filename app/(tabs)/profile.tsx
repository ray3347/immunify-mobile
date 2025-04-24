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

const icons = {
  cake: require("../../assets/icons/cake.png"),
  female: require("../../assets/icons/female.png"),
  certif: require("../../assets/icons/certif.png"),

};
const Profile = () => {
  const [activeTab, setActiveTab] = useState("completed vaccination");

  const renderCompletedVac = () => (
    <View>
      <InfoCard
        iconSource={require("../../assets/icons/certif.png")}
        title= "MMR"
        subtitle={
          <View style={styles.subtitleRow}>
            <Text style={styles.subtitleText}>Completed in</Text>
            <Label text="May 10, 2023" variant="teal" />
          </View>
        }
      />
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
          <Image
            source={require("../../assets/icons/settings.png")}
            style={styles.icon}
          />
        </View>

        <View style={styles.contentWrapper}>
          <View style={styles.rowItem}>
            <View style={styles.mb16}>
              <ProfilePic name="Jane Doe" size={64} />
            </View>

            <View>
              <View style={styles.nameRow}>
                <Text style={styles.title}>Jane Doe</Text>
                <Image
                  source={require("../../assets/icons/chevron_down.png")}
                  style={styles.chevronIcon}
                />
              </View>
              <View style={styles.statsRow}>
                <View style={styles.rowItem}>
                  <Image source={icons.cake} style={styles.icon} />
                  <Text>June 20, 2008</Text>
                </View>

                <View style={styles.rowItem}>
                  <Image source={icons.female} style={styles.icon} />
                  <Text>Female</Text>
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
