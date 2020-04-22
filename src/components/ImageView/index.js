import React, {Component} from 'react';
import {Image, StyleSheet, View, TouchableOpacity, Text} from 'react-native';

const ImageView = props => {
  const {source, onCloseHandler} = props;
  return (
    <View style={styles.main}>
      <TouchableOpacity
        onPress={onCloseHandler}
        style={{position: 'absolute', top: 10, left: 0}}>
        <Text
          style={{
            fontFamily: 'GDSfont',
            fontSize: 20,
            padding: 10,
            color: 'white',
          }}>
          A
        </Text>
      </TouchableOpacity>
      <Image source={{uri: source}} style={styles.image} />
    </View>
  );
};

export default ImageView;

const styles = StyleSheet.create({
  main: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,1)',
    zIndex: 100,
  },
  image: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
  },
});
