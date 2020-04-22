import React from 'react';
import {Image, StyleSheet} from 'react-native';

const Logo = () => {
  return (
    <Image
      style={styles.logo}
      source={require('../../../assets/images/logo.png')}
    />
  );
};

const styles = StyleSheet.create({
  logo: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
  },
});

export default Logo;
