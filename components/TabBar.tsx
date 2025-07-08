import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

interface TabBarProps {
  activeTab: string;
  onChangeTab: (tab: string) => void;
  tabs: string[];
}

const TabBar: React.FC<TabBarProps> = ({ activeTab, onChangeTab, tabs }) => {
  return (
    <View style={styles.tabBar}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[styles.tab, activeTab === tab && styles.activeTab]}
          onPress={() => onChangeTab(tab)}
        >
          <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
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
    color: "#333",
    fontWeight: "600",
  },
});

export default TabBar;
