import React from 'react';
import { View, TextInput, StyleSheet, Image, NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';

interface SearchInputProps {
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
}

const SearchInput = ({ placeholder, value, onChangeText, onBlur }: SearchInputProps) => {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/icons/search.png')} 
        style={styles.icon}
      />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 44,
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 8,
    tintColor: '#9CA3AF',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
});

export default SearchInput;