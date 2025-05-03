import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import React from 'react'
import { Ionicons} from '@expo/vector-icons';

type CardItemProps = {
  image: any; 
  title: string;
  location: string;
  distance: string;
  price: string;
  onPress?: ()=> void;
};

const VaccineCard: React.FC<CardItemProps> = ({ image, title, location, distance, price, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Image
      resizeMode="cover"
      style={styles.image}
      source={image}
    />
    <View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.statsRow}>
        <Text
          style={[styles.subtitle, styles.textbox]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {location}
        </Text>
        <View style={styles.distanceContainer}>
        <Ionicons name="send" style={styles.icon} />
          <Text style={styles.distance_label}>{distance}</Text>
        </View>
      </View>

      <View style={{ paddingTop: 12 }}>
        <Text style={styles.subtitle}>Start from</Text>
        <Text style={styles.title}>Rp.{price}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const { width } = Dimensions.get('window');
const cardWidthPercentage = 45; 
const cardWidth = width * (cardWidthPercentage / 100);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 16,
  },
  scrollContent: {
    paddingHorizontal: '4%',
    paddingBottom: 0,
  },
  content: {
    backgroundColor: "white",
    marginVertical: '2%',
    width: "100%",
    flexDirection: "row",
  },
  textContainer: {
    flex: 1,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: '2%',
    justifyContent: "space-between",
  },
  rowItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 12,
    height: 12,
    color: "#008B8B",
  },
  starIcon: {
    marginRight: '1%',
  },
  statText: {
    fontSize: 14,
    color: "#777",
    marginLeft: '1%',
  },
  image: {
    height: cardWidth * 0.8, 
    width: '100%',
    marginBottom: '4%'
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    flexShrink: 1,
    color: "#0A0A0A",
  },
  subtitle: {
    fontFamily: "pregular",
    fontSize: 14,
    color: "#404040",
    marginTop: 0,
    flexShrink: 1,
  },
  distance_label: {
    color: "#008B8B",
    paddingLeft: 4,
    fontSize: 12,
  },
  textbox: {
    width: '60%',
  },
  card: {
    width: cardWidth,
    // margin: '2%',
  },
  distanceContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEFBF8",
    padding: 4,
    alignSelf: "flex-start",
  }
});

export default VaccineCard