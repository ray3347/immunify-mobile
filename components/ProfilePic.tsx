import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ProfilePicProps {
  name: string;
  size?: number;
  color?: string; // Tambahkan prop color
}

const ProfilePic: React.FC<ProfilePicProps> = ({ name, size = 48, color = "#008B8B" }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <View
      style={[
        styles.avatar,
        { width: size, height: size, borderRadius: size / 2, backgroundColor: color },
      ]}
    >
      <Text style={[styles.initials, { fontSize: size / 3 }]}>{initials}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    alignItems: "center",
    justifyContent: "center",
  },
  initials: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ProfilePic;
