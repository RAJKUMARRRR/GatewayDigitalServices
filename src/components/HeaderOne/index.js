import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Logo from '../Logo';

const Header = ({title = 'Welcome!', enableBack=false, onBack}) => {
  return (
    <View style={styles.container}>
      <View style={styles.welcome}>
        {enableBack && (
          <TouchableOpacity onPress={onBack}>
            <Text style={styles.back}>A</Text>
          </TouchableOpacity>
        )}
        <Text>{title}</Text>
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 'auto',
    padding: 15,
    paddingBottom: 5,
    paddingTop: 5,
  },
  logo: {
    padding: 15,
    paddingBottom: 5,
    paddingTop: 5,
  },
  back: {
    fontFamily: 'GDSfont',
    fontSize: 15,
    color: '#000',
  },
});

export default Header;
