import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  GestureResponderEvent,
  StyleSheet,
} from 'react-native';
import Divider from './Divider';

type ListCardProps = {
  imageSource: any;
  title: string;
  subtitle: string;
  distance: string;
  rating: string;
  onPress?: (event: GestureResponderEvent) => void;
};

const icons = {
    car: require("../assets/icons/car.png"),
    star: require("../assets/icons/star.png"),
    location: require("../assets/icons/location-marker.png"),
  };
  
const ListCard: React.FC<ListCardProps> = ({
  imageSource,
  title,
  subtitle,
  distance,
  rating,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.content} onPress={onPress}>
      <Image source={imageSource} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1} ellipsizeMode="tail">
          {subtitle}
        </Text>
        <View style={styles.statsRow}>
          <View style={styles.rowItem}>
            <Image source={icons.car} style={styles.icon} />
            <Text style={styles.statText}>{distance}</Text>
          </View>

          <Divider/>

          <View style={styles.rowItem}>
            <Image source={icons.star} style={[styles.icon, styles.starIcon]} />
            <Text style={styles.statText}>{rating}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ffffff",
    },
    scrollContent: {
      paddingHorizontal: 16,
      paddingBottom: 0,
    },
    content: {
      backgroundColor: "white",
      borderRadius: 8,
    //   padding: 16,
      marginVertical: 16,
    //   borderWidth: 1,
    //   borderColor: "#E5E7EB",
      width: "100%",
      flexDirection: "row",
      // alignItems: "center",
    },
    textContainer: {
      flex: 1,
    },
    statsRow: {
      flexDirection: "row",
      alignItems: "center",
      paddingTop: 8,
    },
    rowItem: {
      flexDirection: "row",
      alignItems: "center",
    },
    icon: {
      width: 20,
      height: 20,
    },
    starIcon: {
      marginRight: 4,
    },
    statText: {
      fontSize: 14,
      color: "#777",
      marginLeft: 4,
    },
    image: {
      height: 80,
      width: 80,
      marginRight: 12,
      borderRadius: 4
    },
    title: {
      fontSize: 16,
      fontWeight: "500",
      flexShrink: 1,
    },
    subtitle: {
      fontFamily: "pregular",
      fontSize: 14,
      color: "#404040",
      marginTop: 4,
      flexShrink: 1,
    },
  });

  export default ListCard;

