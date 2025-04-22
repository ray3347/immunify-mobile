import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";

interface DividerProps {
  style?: ViewStyle;
}

const Divider: React.FC<DividerProps> = ({ style }) => {
  return <View style={[styles.divider, style]} />;
};

const styles = StyleSheet.create({
  divider: {
    height: 14,
    width: 1,
    backgroundColor: "#DDDDDD",
    marginHorizontal: 10,
    alignSelf: "center",
  },
});

export default Divider;
