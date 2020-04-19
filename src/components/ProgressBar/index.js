import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function ProgressBar() {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    position:'absolute',
    top:0,
    left:0,
    zIndex: 1000000,
    width:'100%',
    height:'100%'
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});
