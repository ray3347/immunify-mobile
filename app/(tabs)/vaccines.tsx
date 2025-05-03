import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import VaccineCard from "../../components/VaccineCard";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import SearchInput from "../../components/SearchInput";
import HttpService from "../../constants/HttpService";

// Define the types for your data structures
type RelatedDisease = {
  id: string;
  name: string;
  relatedVaccines: any[];
  information: string;
};

type Vaccine = {
  id: string;
  vaccineName: string;
  vaccineInformation: string;
  doseInterval: number;
  doses: number;
  informationSummary: string[];
  relatedDiseases: RelatedDisease[];
};

// Fallback data to use when API fails
const fallbackVaccines: Vaccine[] = [
  {
    id: "1",
    vaccineName: "Hepatitis B Vaccine",
    vaccineInformation: "Protects against hepatitis B virus infection",
    doseInterval: 30,
    doses: 3,
    informationSummary: ["Recommended for all ages", "3 doses required"],
    relatedDiseases: [{ id: "1", name: "Hepatitis B", relatedVaccines: [], information: "" }]
  },
  {
    id: "2",
    vaccineName: "COVID-19 Vaccine",
    vaccineInformation: "Protects against COVID-19 infection",
    doseInterval: 21,
    doses: 2,
    informationSummary: ["Recommended for all adults", "2 doses required"],
    relatedDiseases: [{ id: "2", name: "COVID-19", relatedVaccines: [], information: "" }]
  },
  {
    id: "3",
    vaccineName: "Influenza Vaccine",
    vaccineInformation: "Annual protection against seasonal flu",
    doseInterval: 365,
    doses: 1,
    informationSummary: ["Recommended annually", "One dose per season"],
    relatedDiseases: [{ id: "3", name: "Influenza", relatedVaccines: [], information: "" }]
  },
  {
    id: "4",
    vaccineName: "MMR Vaccine",
    vaccineInformation: "Protects against measles, mumps, and rubella",
    doseInterval: 28,
    doses: 2,
    informationSummary: ["Recommended for children", "2 doses required"],
    relatedDiseases: [
      { id: "4", name: "Measles", relatedVaccines: [], information: "" },
      { id: "5", name: "Mumps", relatedVaccines: [], information: "" },
      { id: "6", name: "Rubella", relatedVaccines: [], information: "" }
    ]
  }
];

const Vaccines = () => {
  const router = useRouter();
  const [cardData, setCardData] = useState<Vaccine[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchVaccines = async () => {
      try {
        setLoading(true);
        const res = await HttpService.get<{ data: Vaccine[] }>("/wiki/vaccine");
        setCardData(res.data.data);
      } catch (error) {
        console.error("Failed to fetch vaccine data", error);
        // Use fallback data when API fails
        setCardData(fallbackVaccines);
        Alert.alert(
          "Connection Error",
          "Could not connect to server. Showing sample data instead.",
          [{ text: "OK" }]
        );
      } finally {
        setLoading(false);
      }
    };

    fetchVaccines();
  }, []);

  const handleVaccinePress = (vaccine: Vaccine) => {
    // Navigate with vaccine data
    router.push({
      pathname: "/vaccine_detail",
      params: { vaccineId: vaccine.id }
    });
  };

  const filteredVaccines = cardData.filter(vaccine => 
    vaccine.vaccineName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderHeader = () => (
    <View style={{ marginBottom: 16 }}>
      <SearchInput 
        placeholder="Search Vaccine" 
        onChangeText={text => setSearchQuery(text)}
        value={searchQuery}
      />
    </View>
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No vaccines found</Text>
    </View>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#008B8B" />
            <Text style={styles.loadingText}>Loading vaccines...</Text>
          </View>
        ) : (
          <FlatList
            data={filteredVaccines}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.scrollContent}
            ListHeaderComponent={renderHeader}
            ListEmptyComponent={renderEmptyList}
            renderItem={({ item }) => (
              <VaccineCard
                image={require("../../assets/images/vaccine.png")}
                title={item.vaccineName}
                location={item.relatedDiseases?.[0]?.name ?? "General Vaccine"}
                distance={"Available"}
                price={"Free"} 
                onPress={() => handleVaccinePress(item)}
              />
            )}
          />
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 16,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 24,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#555",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
  },
});

export default Vaccines;