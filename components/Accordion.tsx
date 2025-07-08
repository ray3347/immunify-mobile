import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; 

interface Vaccine {
  id: string;
  title: string;
  description: string[];
}

interface AccordionProps {
  vaccineList: Vaccine[];
}

const Accordion: React.FC<AccordionProps> = ({ vaccineList }) => {
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({});

  const toggleAccordion = (id: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <View style={styles.container}>
      {vaccineList.map((vaccine, index) => (
        <View key={vaccine.id} style={[styles.item, index > 0 && styles.borderTop]}>
          <TouchableOpacity onPress={() => toggleAccordion(vaccine.id)} style={styles.header}>
            <Text style={styles.title}>{vaccine.title}</Text>
            <Icon
              name={expandedItems[vaccine.id] ? "chevron-up" : "chevron-down"}
              size={20}
              color="#9E9E9E"
            />
          </TouchableOpacity>
          {expandedItems[vaccine.id] && (
            <View style={styles.content}>
              {vaccine.description.map((point, i) => (
                <View key={i} style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.description}>{point}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    width: "100%",
    overflow: "hidden",
  },
  item: {
    padding: 16,
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "medium",
    color: "#333",
  },
  content: {
    marginTop: 8,
  },
  bulletItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 4,
  },
  bullet: {
    fontSize: 14,
    marginRight: 8,
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#404040",
    flexShrink: 1,
  },
});

export default Accordion;
