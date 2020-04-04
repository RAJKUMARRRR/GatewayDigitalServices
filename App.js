/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import { StyleSheet,Text, View, StatusBar, ScrollView, Image} from 'react-native';
import { withTheme } from 'styled-components';
import TextBox from './src/components/TextBox';
import ChatMessage from './src/components/ChatMessage';
import ChatSection from './src/components/ChatSection';
import Avatar from './src/components/Avatar'
import Chat from './src/pages/Chat';
import Login from './src/pages/Login';
import OTP from './src/pages/OTP'

const styles = StyleSheet.create({
  main:{
    flex:1,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width:'100%',
    backgroundColor: '#f1f1f1',
  },
  text:{
    color: 'black',
    fontSize: 30,
    fontWeight: "bold"
  },
  scroll:{
    flex:1,
    width:'100%',
  }
});

export default class App extends Component {
  render(){
    return <Chat/>
  }
  /*render() {
    return (
      <>
      <View style={styles.main}>
        <View style={{flexDirection:'row',justifyContent:'flex-start',width:'100%',alignItems:'center'}}>
          <Text style={{marginRight:'auto',padding:15,paddingBottom:5,paddingTop:5}}>Welcome!</Text>
          <Avatar style={{margin:5}}/>
          <Text style={{marginRight:15}}>Arthur Mack</Text>
        </View>
        <View style={{flexDirection:'row',justifyContent:'center',width:'100%',alignItems:'center',height:100}}>          
        <Text style={{ fontFamily: 'GDSfont', fontSize: 20,padding:10,color:'red',position:'absolute',left:10 }}>A</Text>
        <Image style={{height:80,resizeMode:'contain'}} source={require('./assets/images/logon.jpeg')}/>
        </View>
        <View style={styles.scroll}>
        <ScrollView>
          <ChatSection title="Wednesday,March 25"/>
          <ChatMessage message="Hey Arthus, how are you?" timestamp="10:30AM" from/>
          <ChatMessage message="Hey Arthus, how are you?" timestamp="10:30AM" from/>
          <ChatMessage message="Hey Arthus, how are you?" timestamp="10:30AM" from/>
          <ChatMessage message="Hey Arthus, how are you?" timestamp="10:30AM"/>
          <ChatMessage message="Hey Arthus, how are you?" timestamp="10:30AM" from/>
          <ChatMessage message="Hey Arthus, how are you?" timestamp="10:30AM" from/>
          <ChatSection title="Wednesday,March 25"/>
          <ChatMessage message="Hey Arthus, how are you?" timestamp="10:30AM"/>
          <ChatMessage message="Hey Arthus, how are you?" timestamp="10:30AM"/>
          <ChatMessage message="Hey Arthus, how are you?" timestamp="10:30AM" from/>
          <ChatMessage message="Hey Arthus, how are you?" timestamp="10:30AM" from/>
          <ChatMessage message="Hey Arthus, how are you?" timestamp="10:30AM" from/>
          <ChatMessage message="Hey Arthus, how are you?" timestamp="10:30AM"/>
          <ChatMessage message="Hey Arthus, how are you?" timestamp="10:30AM" from/>
          <ChatMessage message="Hey Arthus, how are you?" timestamp="10:30AM" from/>
          <ChatSection title="Wednesday,March 25"/>
          <ChatMessage message="Hey Arthus, how are you?" timestamp="10:30AM"/>
          <ChatMessage message="Hey Arthus, how are you?" timestamp="10:30AM"/>
        </ScrollView>
        </View>
        <View style={{flexDirection:'row',padding: 5,paddingTop: 10,justifyContent:'center',alignItems:'center'}}>
          <Text style={{ fontFamily: 'GDSfont', fontSize: 20,padding:10,color:'red' }}>B</Text>
          <View style={{
            flex: 1,
            marginLeft:5,
            marginRight:5
          }}>
          <TextBox />
          <Text style={{ fontFamily: 'GDSfont', fontSize: 20,padding:10,color:'red',position:'absolute',right:0 }}>C</Text>
          </View>
        </View>
      </View>
      </>
    );
  }*/
}