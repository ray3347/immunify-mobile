import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type LabelVariant = 'orange' | 'teal';

interface LabelProps {
  text: string;
  variant?: LabelVariant;
}

const Label: React.FC<LabelProps> = ({ text, variant = 'orange' }) => {
  const isOrange = variant === 'orange';

  const backgroundColor = isOrange ? '#FFF9F2' : '#EEFBF8';
  const borderColor = isOrange ? '#CD7B2E' : '#B1D8D8';
  const textColor = isOrange ? '#CD7B2E' : '#1E5A5A';

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
          borderColor,
        },
      ]}
    >
      <Text style={[styles.labelText, { color: textColor }]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    paddingVertical: 2,
    paddingHorizontal: 10,
    marginLeft: 8,
    borderWidth: 1,
  },
  labelText: {
    fontSize: 14,
  },
});

export default Label;
