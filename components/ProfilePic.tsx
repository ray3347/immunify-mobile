import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const getRandomColor = () => {
  const colors = [
    '#FFB6C1', '#FFD700', '#87CEEB', '#98FB98',
    '#FF69B4', '#FF7F50', '#20B2AA', '#DDA0DD',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const getInitials = (name: string) => {
  const names = name.trim().split(' ');
  const firstInitial = names[0][0].toUpperCase();
  const lastInitial = names.length > 1 ? names[names.length - 1][0].toUpperCase() : '';
  return firstInitial + lastInitial;
};

const ProfilePic = ({ name, size = 48 }: { name: string; size?: number }) => {
  const initials = getInitials(name);
  const backgroundColor = getRandomColor();

  return (
    <View
      style={[
        styles.avatar,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
        },
      ]}
    >
      <Text style={[styles.text, { fontSize: size / 2 }]}>{initials}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProfilePic;
