import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  loading: boolean;
  style?: object;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  style,
  loading,
}) => {
  return (
    <TouchableOpacity
      style={[loading ? styles.disabledButton : styles.button, style]}
      onPress={() => {
        if (!loading) {
          onPress();
        }
      }}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#008B8B" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
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
  disabledButton: {
    backgroundColor: "#c5d8d8",
    paddingVertical: 16,
    borderRadius: 6,
    width: "100%",
    alignItems: "center",
  },
});

export default PrimaryButton;
