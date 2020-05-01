import React, {Component} from 'react';
import {TextInput, StyleSheet, View, Text} from 'react-native';

const SearchBar = props => {
  const {style = {}, onSearch, ...restProps} = props;
  return (
    <View style={{...styles.inputWrapper, ...style}}>
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="Search mailbox number..."
        placeholderTextColor="#c3c3c3"
        autoCapitalize="none"
        onChangeText={onSearch}
        {...restProps}
      />
      <Text style={styles.searchIcon}>C</Text>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  inputWrapper: {
    height: 45,
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: 'transparent',
    borderRadius: 100,
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    fontSize: 15,
    padding: 10,
  },
  searchIcon: {
    fontFamily: 'GDSfont',
    fontSize: 20,
    padding: 10,
    color: '#c3c3c3',
  },
});
