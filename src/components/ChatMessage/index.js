import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';

const ChatMessage = props => {
  const {message, from, onImageTapHandler} = props;
  const containerStyle = {
    ...styles.container,
    ...(from ? styles.containerFrom : styles.containerTo),
  };
  const textStyle = from ? styles.textFrom : styles.textTo;
  const timestampStype = from
    ? styles.timestamp
    : {...styles.timestamp, ...styles.timestampFrom};
  return (
    <>
      {message.messageType === 'MEDIA' && (
        <View
          style={{
            ...containerStyle,
            ...{
              flexDirection: 'column',
              padding: 2,
              paddingBottom: 2,
              paddingTop: 2,
            },
          }}>
          <TouchableOpacity>
            <Image
              source={{uri: message.media.sourceUrl}}
              style={styles.imageNormal}
            />
          </TouchableOpacity>
          <View
            onTouchEnd={() =>
              onImageTapHandler && onImageTapHandler(message.media.sourceUrl)
            }
            style={{
              backgroundColor: 'rgba(0,0,0,.1)',
              position: 'absolute',
              right: 2,
              bottom: 2,
              width: 200,
              height: '100%',
              borderRadius: 7,
            }}
          />
          <Text
            style={{
              ...textStyle,
              ...timestampStype,
              ...{color: 'white', position: 'absolute', right: 15, bottom: 15},
            }}>
            {message.messageStatus == 'PENDING' ? 'sending...' : message.time}
          </Text>
        </View>
      )}
      {message.messageType === 'TEXT' && (
        <View style={containerStyle}>
          <Text style={{...textStyle, ...styles.message}}>
            {message.message}
          </Text>
          <Text style={{...textStyle, ...timestampStype}}>
            {message.messageStatus == 'PENDING' ? 'sending...' : message.time}
          </Text>
        </View>
      )}
    </>
  );
};

export default ChatMessage;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 10,
    margin: 20,
    marginTop: 10,
    marginBottom: 0,
    flex: 1,
    flexDirection: 'row',
  },
  containerFrom: {
    backgroundColor: 'white',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 0,
    marginRight: 80,
  },
  containerTo: {
    backgroundColor: '#E0E0E0',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 0,
    marginLeft: 80,
  },
  textFrom: {
    color: 'black',
  },
  textTo: {
    color: 'black',
  },
  message: {
    alignSelf: 'flex-start',
    /*paddingBottom:10*/
  },
  timestamp: {
    color: '#c3c3c3',
    fontSize: 10,
    textAlign: 'right',
    alignSelf: 'flex-end',
    marginLeft: 5,
  },
  timestampFrom: {
    color: 'grey',
  },
  imageNormal: {
    width: 200,
    height: 200,
    borderRadius: 7,
  },
});
