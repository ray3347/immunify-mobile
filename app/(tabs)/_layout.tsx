import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { icons } from "../../constants";

interface TabIconProps {
  icon: any;
  color: string;
  name: string;
  focused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ icon, color, name, focused }) => {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 5 }}>
      <Image
        source={icon}
        resizeMode="contain"
        style={{ width: 24, height: 24,tintColor: color }}
      />
      <Text
        style={{ 
          color: color,
          fontSize: 12,
          marginTop: 2,
          fontFamily: focused ? 'pbold' : 'pregular',
          width: '100%',
          textAlign: 'center'
        }}
        numberOfLines={1}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout: React.FC = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#008B8B",
        tabBarInactiveTintColor: "#C2C2C2",
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 80,
          paddingHorizontal: 5,
        },
        tabBarItemStyle: {
          paddingVertical: 16,
        }
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.home}
              color={color}
              name="Home"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="clinics"
        options={{
          title: "Clinic",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.clinic}
              color={color}
              name="Clinic"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="tracker"
        options={{
          title: "Tracker",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.tracker}
              color={color}
              name="Tracker"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.profile}
              color={color}
              name="Profile"
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;