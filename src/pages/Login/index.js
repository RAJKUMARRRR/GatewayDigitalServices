/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import { StyleSheet,Text, View, StatusBar, ScrollView, Image, Button, TouchableOpacity} from 'react-native';
import KeyPad from '../../components/KeyPad'

const styles = StyleSheet.create({
  main:{
    flex:1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width:'100%',
    backgroundColor: '#f1f1f1'
  },
  logo:{
      width:'100%',
      marginTop:-50,
      resizeMode:'contain'
  },
  mobile:{
      marginTop:-50,
      fontSize: 20,
      fontWeight: 'bold',
      letterSpacing: 5,
      borderColor:'red',
      borderWidth: 1,
      borderRadius:100,
      padding:20,
      paddingBottom:10,
      paddingTop:10,
      width:'70%',
      textAlign:'center',
      backgroundColor:'white'
  },
  mobileHint:{
    width:'70%',
    fontSize: 12,
    textAlign:'center'
  },
  loginWrapper:{
      marginTop:50,
      backgroundColor:'red',
      borderRadius:100,
      padding:10,
      width:'70%',
  },
  login:{
    color:'white',
    fontSize:15,
    fontWeight:'bold',
    textAlign:'center'
  },
  keypad:{
      position:'absolute',
      bottom:0,
      width:'100%',
      height:'35%'
  }
});

export default class Chat extends Component {
  render() {
    return (
      <>
      <StatusBar barStyle="dark-content" backgroundColor="#f1f1f1"/>
      <View style={styles.main}>
        <Image style={styles.logo} source={require('../../../assets/images/loginbg.png')}/>
        <Text style={styles.mobile}>98564321896</Text>
        <Text style={styles.mobileHint}>Enter your registered phone number to login</Text>
        <TouchableOpacity style={styles.loginWrapper}>
            <Text style={styles.login}>
              Login
            </Text>
        </TouchableOpacity>
        <View style={styles.keypad}>
            <KeyPad/>
        </View>
      </View>
      </>
    );
  }
}