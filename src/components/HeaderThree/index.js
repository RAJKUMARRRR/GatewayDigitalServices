import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Avatar from '../Avatar';

const Header = props => {
  const {profileImageUrl = '', username = ''} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome!</Text>
      <Avatar style={styles.avatar} sourceUrl={profileImageUrl} />
      <Text style={styles.username}>{username}</Text>
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
  avatar: {
    margin: 5,
  },
  username: {
    marginRight: 15,
  },
});

export default Header;
