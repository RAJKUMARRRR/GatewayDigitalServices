import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Logo from '../Logo';

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.welcome}>
        <Text>Welcome!</Text>
      </View>
      <View style={styles.logo}>
        <Logo />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    alignItems: 'center',
  },
  welcome: {
    marginRight: 'auto',
    padding: 15,
    paddingBottom: 5,
    paddingTop: 5,
  },
  logo: {
    padding: 15,
    paddingBottom: 5,
    paddingTop: 5,
  }
});

export default Header;
