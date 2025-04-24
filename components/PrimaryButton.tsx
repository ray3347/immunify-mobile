import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  style?: object;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#008B8B",
    paddingVertical: 16,
    borderRadius: 6,
    width: "100%", 
    alignItems: "center",
  },
  text: {
    color: "white",
    fontWeight: "medium",
    textAlign: "center",
    fontSize: 16,
  },
});

export default PrimaryButton;
