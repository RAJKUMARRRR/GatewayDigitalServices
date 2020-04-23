import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Avatar from '../Avatar';

const AvatarListItem = props => {
  const {
    imageUrl = '',
    title = '',
    subTitle = '',
    id,
    onItemSelected,
    showIndicator = false,
    unreadCount = 0,
  } = props;
  return (
    <View style={styles.container} onTouchEnd={() => onItemSelected(id)}>
      <Avatar source={imageUrl} style={styles.avatar} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
      </View>
      {showIndicator && <Text style={styles.indicator}>{unreadCount}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 2,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 3,
  },
  content: {
    flex: 1,
    margin: 5,
    marginRight: 10,
    marginLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
  avatar: {
    marginLeft: 10,
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 15,
    color: '#c1c1c1',
    fontWeight: 'bold',
  },
  indicator: {
    backgroundColor: 'red',
    width: 20,
    height: 20,
    borderRadius: 100,
    textAlign: 'center',
    color: 'white',
    marginRight: 10,
  },
});

export default AvatarListItem;
