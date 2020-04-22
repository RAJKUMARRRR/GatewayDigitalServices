import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Suggession = props => {
  const {title, onPress} = props;
  return (
    <View style={styles.main}>
      <View style={styles.wrapper}>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    padding: 5,
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
  },
  button: {
    width: '100%',
    height: 40,
    padding: 5,
    borderRadius: 10,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 15,
    borderColor: 'transparent',
    borderRadius: 15,
    width: '100%',
    padding: 10,
    color: 'white',
  },
});

export default Suggession;
