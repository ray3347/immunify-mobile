import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

const set_appointment = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#ffffff",
        paddingHorizontal: 16,
        paddingVertical: 16,
      }}
    >
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 18,
          color: "#333",
        }}
      >
        Parent/Guardian Information
      </Text>
      <Text style={{ fontSize: 12, color: "#777", paddingTop: 8 }}>
        This information will be used to schedule and confirm the appointment.
      </Text>
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
                            source={require("../assets/icons/user.png")}
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
                              Dona Doe
                            </Text>
                            <Text
                              style={{
                                fontSize: 14,
                                fontWeight: "400",
                                color: "#404040",
                                marginTop: 4,
                              }}
                            >
                              085714466433
                            </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
    </View>
  );
};

export default set_appointment;
