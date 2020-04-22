import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Logo from '../Logo';
import Profile from '../Profile';

const Header = props => {
  const {
    profileImageUrl = '',
    username = '',
    mailBoxNumber = '',
    enableBack = false,
    onBack,
  } = props;
  return (
    <View style={styles.container}>
      <View style={styles.welcome}>
        {enableBack && (
          <TouchableOpacity onPress={onBack}>
            <Text style={styles.back}>A</Text>
          </TouchableOpacity>
        )}
        <Profile
          username={username}
          profileImageUrl={profileImageUrl}
          mailBoxNumber={mailBoxNumber}
        />
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
    alignItems: 'center',
    marginRight: 'auto',
    padding: 15,
    paddingBottom: 5,
    paddingTop: 5,
  },
  back: {
    fontFamily: 'GDSfont',
    fontSize: 20,
    color: 'red',
  },
  logo: {
    padding: 15,
    paddingBottom: 5,
    paddingTop: 5,
  },
});

export default Header;
