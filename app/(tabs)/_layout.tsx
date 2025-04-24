import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import { icons } from "../../constants";

interface TabIconProps {
  icon: any;
  color: string;
  name: string;
  focused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ icon, color, name, focused }) => (
  <View style={styles.iconContainer}>
    <Image source={icon} resizeMode="contain" style={[styles.icon, { tintColor: color }]} />
    <Text
      style={[
        styles.iconLabel,
        {
          color,
          fontWeight: focused ? "700" : "400", 
        },
      ]}
      numberOfLines={1}
    >
      {name}
    </Text>
  </View>
);

const TabsLayout: React.FC = () => {
  const renderTab = (name: string, title: string, icon: any) => ({
    name,
    options: {
      title,
      headerShown: false,
      tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
        <TabIcon icon={icon} color={color} name={title} focused={focused} />
      ),
    },
  });

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#008B8B",
        tabBarInactiveTintColor: "#C2C2C2",
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
      }}
    >
      {[
        renderTab("home", "Home", icons.home),
        renderTab("clinics", "Clinic", icons.clinic),
        renderTab("tracker", "Tracker", icons.tracker),
        renderTab("profile", "Profile", icons.profile),
      ].map((tab) => (
        <Tabs.Screen key={tab.name} {...tab} />
      ))}
    </Tabs>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
  },
  icon: {
    width: 24,
    height: 24,
  },
  iconLabel: {
    fontSize: 12,
    marginTop: 2,
    width: "100%",
    textAlign: "center",
  },
  tabBar: {
    height: 80,
    paddingHorizontal: 5,
  },
  tabBarItem: {
    paddingVertical: 16,
  },
});

export default TabsLayout;
