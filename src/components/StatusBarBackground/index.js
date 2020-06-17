import React from 'react';
import {StyleSheet, Platform, View} from 'react-native';

const StatusBarBackground = props => {
  return (
    <View style={styles.statusBarBackground}>
    </View>
  );
};

export default StatusBarBackground;

const styles = StyleSheet.create({
    statusBarBackground:{
        height: (Platform.OS === 'ios') ? 25 : 0,
        backgroundColor: '#f1f1f1'
    }
});
