import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
  StyleSheet,
} from "react-native";

interface InfoCardProps {
  iconSource: ImageSourcePropType;
  rightIconSource?: ImageSourcePropType;
  title?: string;
  subtitle?: React.ReactNode;
  titleColor?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const InfoCard: React.FC<InfoCardProps> = ({
  iconSource,
  rightIconSource,
  title,
  subtitle,
  titleColor = "#4B5563",
  onPress,
  style,
}) => {
  const Wrapper = onPress ? TouchableOpacity : View;

  return (
    <Wrapper style={[styles.container, style]} {...(onPress ? { onPress } : {})}>
      <View style={styles.content}>
        <View style={styles.leftSection}>
          <Image source={iconSource} style={styles.icon} />
          <View style={styles.textContainer}>
            {title && <Text style={[styles.title, { color: titleColor }]}>{title}</Text>}
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>
        </View>
        {rightIconSource && <Image source={rightIconSource} style={styles.icon} />}
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    width: "100%",
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 24,
    height: 24,
  },
  textContainer: {
    marginLeft: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  subtitle: {
    fontFamily: "400",
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
});

export default InfoCard;
