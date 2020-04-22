import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const ChatSection = props => {
  const {title = ''} = props;
  return (
    <View style={styles.main}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default ChatSection;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
  },
  title: {
    backgroundColor: 'white',
    textAlign: 'center',
    color: 'red',
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 100,
    padding: 10,
    paddingTop: 3,
    paddingBottom: 3,
  },
});
