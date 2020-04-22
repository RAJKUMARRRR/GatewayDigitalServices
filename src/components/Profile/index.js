import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Avatar from '../Avatar';

const Profile = props => {
  const {profileImageUrl = '', username = '', mailBoxNumber = ''} = props;
  return (
    <View style={styles.container}>
      <Avatar style={styles.avatar} sourceUrl={profileImageUrl} />
      <View>
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.mailbox}>Mailbox No {mailBoxNumber}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  mailbox: {
    color: '#c1c1c1',
  },
  avatar: {
    margin: 5,
  },
  username: {
    fontWeight: 'bold',
  },
});

export default Profile;
