import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import React from "react";
import { useState } from "react";
import { ListItem } from "@rneui/themed";
import { useRouter } from "expo-router";

interface VaccineItem {
  id: string;
  title: string;
  description: string;
}

interface ExpandedItemsState {
  [key: string]: boolean;
}

const ClinicDetail = () => {
  const [activeTab, setActiveTab] = useState("information");
  const [expandedItems, setExpandedItems] = useState<ExpandedItemsState>({});
  const router = useRouter();

  const vaccineList: VaccineItem[] = [
    {
      id: "V001",
      title: "HPV Vaccine",
      description: `HPV vaccine protects against the sexually transmitted human papillomavirus.
  Recommended for both genders, typically at ages 11-12 or as early as 9.
  Administered in a series of 2-3 doses.
  Highly effective in preventing certain cancers and genital warts.
  Generally safe with mild side effects such as pain, redness, or swelling at the injection site.`,
    },
    {
      id: "V002",
      title: "Hepatitis B Vaccine",
      description: `Hepatitis B vaccine protects against hepatitis B virus infection.
  Recommended for all ages, with first dose typically given at birth.
  Usually administered in a series of 3-4 doses.
  Prevents liver disease, liver cancer, and chronic infection.
  Generally safe with minimal side effects.`,
    },
  ];

  const toggleAccordion = (id: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const goToBookAppointment = async() => {
    router.push("../set_appointment");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <Image
        source={require("../assets/images/image 1.png")}
        style={{ width: "100%", height: 180, resizeMode: "cover" }}
      />
      <View style={{ flex: 1, marginVertical: 16, paddingHorizontal: 16 }}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 18,
            color: "#333",
          }}
        >
          Example Clinic
        </Text>
        <Text style={{ fontSize: 14, color: "#777", paddingTop: 8 }}>
          1.2 km
        </Text>
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === "information" && styles.activeTab,
            ]}
            onPress={() => setActiveTab("information")}
          >
            <Text>Information</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "reviews" && styles.activeTab]}
            onPress={() => setActiveTab("reviews")}
          >
            <Text>Reviews</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={[styles.content]}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {activeTab === "information" ? (
            <View>
              <TouchableOpacity
                style={{
                  backgroundColor: "white",
                  borderRadius: 8,
                  padding: 16,
                  marginVertical: 8,
                  borderWidth: 1,
                  borderColor: "#E5E7EB",
                  width: "100%",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      source={require("../assets/icons/location-marker.png")}
                      style={{ width: 24, height: 24 }}
                    />
                    <View style={{ marginLeft: 8 }}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "500",
                          color: "#4B5563",
                        }}
                      >
                        Jl. Pulo Mas Bar. VI No.20
                      </Text>

                      <Text
                        style={{
                          fontFamily: "pregular",
                          fontSize: 14,
                          color: "#404040",
                          marginTop: 4,
                        }}
                      >
                        Kec. Pulo Gadung, DKI Jakarta
                      </Text>
                    </View>
                  </View>
                  <Image
                    source={require("../assets/icons/direction_.png")}
                    style={{ width: 28, height: 28 }}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "white",
                  borderRadius: 8,
                  padding: 16,
                  marginVertical: 8,
                  borderWidth: 1,
                  borderColor: "#E5E7EB",
                  width: "100%",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      source={require("../assets/icons/clock.png")}
                      style={{ width: 24, height: 24 }}
                    />
                    <View style={{ marginLeft: 8 }}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "500",
                          color: "#008B8B",
                        }}
                      >
                        Open
                      </Text>
                      <Text
                        style={{
                          fontFamily: "pregular",
                          fontSize: 14,
                          color: "#404040",
                          marginTop: 4,
                        }}
                      >
                        24 Hours
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "white",
                  borderRadius: 8,
                  padding: 16,
                  marginVertical: 8,
                  borderWidth: 1,
                  borderColor: "#E5E7EB",
                  width: "100%",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      source={require("../assets/icons/globe.png")}
                      style={{ width: 24, height: 24 }}
                    />
                    <View style={{ marginLeft: 8 }}>
                      <Text style={{ fontSize: 14, color: "#4B5563" }}>
                        www.emc.id
                      </Text>
                    </View>
                  </View>
                  <Image
                    source={require("../assets/icons/chevron_down.png")}
                    style={{ width: 28, height: 28 }}
                  />
                </View>
              </TouchableOpacity>

              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 18,
                  color: "#333",
                  paddingTop: 16,
                }}
              >
                List of Vaccines
              </Text>

              {/* Single card containing all vaccine accordions */}
              <View style={styles.container}>
                {vaccineList.map((vaccine, index) => (
                  <React.Fragment key={vaccine.id}>
                    <ListItem.Accordion
                      content={
                        <ListItem.Content>
                          <ListItem.Title>{vaccine.title}</ListItem.Title>
                        </ListItem.Content>
                      }
                      isExpanded={expandedItems[vaccine.id] || false}
                      onPress={() => toggleAccordion(vaccine.id)}
                      containerStyle={
                        index > 0
                          ? { borderTopWidth: 1, borderTopColor: "#E5E7EB" }
                          : {}
                      }
                    >
                      <ListItem>
                        <ListItem.Content>
                          <ListItem.Subtitle>
                            {vaccine.description}
                          </ListItem.Subtitle>
                        </ListItem.Content>
                      </ListItem>
                    </ListItem.Accordion>
                    {/* Don't add bottom divider on the last item */}
                  </React.Fragment>
                ))}
              </View>
            </View>
          ) : (
            <View>
              <Text>Reviews content here</Text>
              {/* Add dummy content for testing scrolling */}
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <View
                    key={i}
                    style={{
                      backgroundColor: "white",
                      borderRadius: 8,
                      padding: 16,
                      marginVertical: 8,
                      borderWidth: 1,
                      borderColor: "#E5E7EB",
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>
                      User Review {i + 1}
                    </Text>
                    <Text style={{ marginTop: 8 }}>
                      This is a sample review to test scrolling functionality.
                    </Text>
                  </View>
                ))}
            </View>
          )}
        </ScrollView>
      </View>
      <View
        style={{
          backgroundColor: "#FFFFFF",
          paddingHorizontal: 16,
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#008B8B",
            paddingVertical: 15,
            borderRadius: 6,
            marginTop: 20,
            width: "100%",
            bottom: 20,
          }}
          onPress={goToBookAppointment}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Set Appointment
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    // borderBottomWidth: 1,
    // borderBottomColor: '#e0e0e0',
    // paddingHorizontal: 16,
  },
  tab: {
    paddingVertical: 12,
    marginRight: 24,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: "#008B8B",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#888888",
  },
  activeTabText: {
    color: "#0066cc",
    fontWeight: "600",
  },
  content: {
    flex: 1,
    paddingTop: 16,
  },
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    width: "100%",
    overflow: "hidden",
  },
  button: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "#008B8B",
    padding: 12,
    borderRadius: 8,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ClinicDetail;
