import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

interface SearchInputProps {
  placeholder?: string;
  onSearch?: (text: string) => void;
  style?: object;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Find Nearby Clinics',
  onSearch,
  style,
}) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (onSearch) {
      onSearch(text);
    }
  };

  return (
    <View style={[styles.container]}>
      <View style={styles.searchIconContainer}>
        <Ionicons name="search" size={20} color="#757575" />
      </View>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#757575"
        value={searchText}
        onChangeText={handleSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 4,
    // marginHorizontal: 16,
    // marginVertical: 8,
    width: '100%',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchIconContainer: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#424242',
    paddingVertical: 8,
    fontWeight: '400',
  },
});

export default SearchInput;