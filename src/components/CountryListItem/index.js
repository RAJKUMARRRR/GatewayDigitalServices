import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import Avatar from '../Avatar';

const CountryListItem = props => {
  const {
    imageUrl = '',
    title = '',
    subTitle = '',
    id,
    onItemSelected,
    selected = false,
  } = props;
  return (
    <View style={styles.container} onTouchEnd={() => onItemSelected(id)}>
      <Image
        style={styles.image}
        source={{
          uri: imageUrl,
        }}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {/*<Text style={styles.subTitle}>{subTitle}</Text>*/}
      </View>
      <View style={styles.indicator}>
        {selected && <Text style={styles.circle} />}
      </View>
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
    fontSize: 15,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 15,
    color: '#c1c1c1',
    fontWeight: 'bold',
  },
  indicator: {
    marginRight: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#f7f7f7',
    padding: 10,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    backgroundColor: 'blue',
    width: 12,
    height: 12,
    borderRadius: 100,
  },
  image: {
    marginLeft: 10,
    height: 20,
    width: 20,
    padding: 15,
  },
});

export default CountryListItem;
