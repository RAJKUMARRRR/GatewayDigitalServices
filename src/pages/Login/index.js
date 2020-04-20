/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import { StyleSheet,Text, View, StatusBar, Image, TouchableOpacity} from 'react-native';
import KeyPad from '../../components/KeyPad'
import { connect } from 'react-redux';
import { sendOTP } from '../../store/profile/actions';

class Chat extends Component {
  constructor(props){
    super(props);
    this.state = {
      mobile:''
    }
  }

  onChangeHandler = (val)=>{
    this.setState({
      mobile:val
    });
  }

  onLoginHandler = ()=>{
    this.props.sendOTP(this.state.mobile,()=>{
      this.props.navigation.navigate("OTP",{mobile:this.state.mobile});
    });
  }


  render() {
    const { onChangeHandler, props, state:{ mobile }, onLoginHandler } = this,
    { sendingOTP, sendOTPSuccess, sendOTPError } = props
    if(sendingOTP){
      console.log("sendingOTP");
    }
    if(sendOTPSuccess){
      console.log("OTP sent successfully..");
    }
    if(sendOTPError){
      console.log("Failed to send OTP:"+JSON.stringify(sendOTPError));
    }
    return (
      <>
      <StatusBar barStyle="dark-content" backgroundColor="#f1f1f1"/>
      <View style={styles.main}>
        <Image style={styles.logo} source={require('../../../assets/images/loginbg.png')}/>
        <Text style={styles.mobile}>{mobile}</Text>
        <Text style={styles.mobileHint}>Enter your registered phone number to login</Text>
        {mobile.length>=10 && <TouchableOpacity style={styles.loginWrapper} disabled={mobile.length<10} onPress={onLoginHandler}>
            <Text style={styles.login}>
              Login
            </Text>
        </TouchableOpacity>
        }
        <View style={styles.keypad}>
            <KeyPad onChange={onChangeHandler} max={10} initialValue={""}/>
        </View>
      </View>
      </>
    );
  }
}

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


const mapStateToProps = (state)=>{
  return {
    sendingOTP: state.profile.sendingOTP,
    sendOTPError: state.profile.sendOTPError,
    sendOTPSuccess: state.profile.sendOTPSuccess,
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    sendOTP: (mobile,cb)=>dispatch(sendOTP(mobile,cb))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Chat);