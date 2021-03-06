import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const InputMask = props => {
  const {style = {}, value = ''} = props;
  return (
    <View style={{...styles.container, ...style}}>
      <View style={styles.numberWrapper}>
        <Text style={styles.number}>{value.length >= 1 ? value[0] : ''}</Text>
      </View>
      <View style={styles.numberWrapper}>
        <Text style={styles.number}>{value.length >= 2 ? value[1] : ''}</Text>
      </View>
      <View style={styles.numberWrapper}>
        <Text style={styles.number}>{value.length >= 3 ? value[2] : ''}</Text>
      </View>
      <View style={styles.numberWrapper}>
        <Text style={styles.number}>{value.length >= 4 ? value[3] : ''}</Text>
      </View>
      <View style={styles.numberWrapper}>
        <Text style={styles.number}>{value.length >= 5 ? value[4] : ''}</Text>
      </View>
      <View style={styles.numberWrapper}>
        <Text style={styles.number}>{value.length >= 6 ? value[5] : ''}</Text>
      </View>
    </View>
  );
};

export default InputMask;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  numberWrapper: {
    borderBottomColor: '#c3c3c3',
    borderBottomWidth: 1,
    marginRight: 10,
  },
  number: {
    color: '#c3c3c3',
    fontSize: 20,
    fontWeight: 'bold',
    borderBottomColor: '#c3c3c3',
    borderBottomWidth: 1,
    paddingRight: 5,
    paddingLeft: 5,
  },
});
