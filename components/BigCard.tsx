import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet, GestureResponderEvent } from 'react-native';

interface BigCardProps {
  onPress: (event: GestureResponderEvent) => void;
  title: string;
  address: string;
  distance: string;
  rating: string;
  imageSource: any;
}

const BigCard: React.FC<BigCardProps> = ({
  onPress,
  title,
  address,
  distance,
  rating,
  imageSource,
}) => {
  return (
    <TouchableOpacity style={[styles.cardContainer, styles.horizontalCardSpacing]} onPress={onPress}>
      <Image source={imageSource} style={styles.cardImage} />

      <View style={styles.cardContent}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>{title}</Text>
        </View>

        <Text style={styles.address}>{address}</Text>

        <View style={styles.infoRow}>
          <View style={styles.iconRow}>
            <Image
              source={require('../assets/icons/car.png')}
              style={styles.icon}
            />
            <Text style={styles.infoText}>{distance}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.iconRow}>
            <Image
              source={require('../assets/icons/star.png')}
              style={[styles.icon, { marginRight: 4 }]}
            />
            <Text style={styles.infoText}>{rating}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    width: 240,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
  },
  cardImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: '500',
    fontSize: 16,
    color: '#333',
  },
  address: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
  },
  infoText: {
    fontSize: 14,
    color: '#777',
    marginLeft: 4,
  },
  divider: {
    height: 20,
    width: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 12,
  },
  horizontalCardSpacing: {
    marginRight: 16,
  }
});

export default BigCard;
