/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import KeyPad from '../../components/KeyPad';
import InputMask from '../../components/InputMask';
import {verifyOTP, loadProfile} from '../../store/profile/actions';
import { CONVERSATIONS, CHAT } from '../../constants/screens';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#f1f1f1',
  },
  logo: {
    margin: 50,
    resizeMode: 'contain',
    height: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  mobileHint: {
    width: '70%',
    fontSize: 12,
    textAlign: 'center',
  },
  resendWrapper: {
    marginTop: 30,
  },
  resend: {
    color: 'red',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  submitWrapper: {
    marginTop: 50,
    backgroundColor: 'red',
    borderRadius: 100,
    padding: 10,
    width: '70%',
    position: 'absolute',
    bottom: '36%',
  },
  submit: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  keypad: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '35%',
  },
});

class OTP extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      otp: '',
      receivedOtp: null,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.otpReceived != state.receivedOtp) {
      return {
        otp: props.otpReceived || '',
        receivedOtp: props.otpReceived,
      };
    }
  }

  onChangeHandler = val => {
    this.setState({
      otp: val,
    });
  };

  onSubmit = () => {
    this.props.verifyOTP(
      {
        otp: this.state.otp || this.props.route.params.otp,
        mobileNumber: this.props.route.params.mobile,
      },
      () => {
        this.props.loadProfile(profile => {
          this.props.navigation.navigate(
            profile.role == 'ADMIN' ? CONVERSATIONS : CHAT,
            {
              conversationId: profile.conversations[0].id,
              conversations: profile.conversations,
            },
          );
        });
      },
    );
  };

  render() {
    const {
        onChangeHandler,
        state: {otp},
        props,
        onSubmit,
      } = this,
      {
        verifyingOTP,
        verifyOTPSuccess,
        verifyOTPError,
        navigate,
        authToken,
      } = props;
    if (verifyingOTP) {
      console.log('verufying otp');
    }
    if (verifyOTPSuccess) {
      console.log('verify otp success');
    }
    if (verifyOTPError) {
      console.log('Error:', verifyOTPError);
    }
    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor="#f1f1f1" />
        <View style={styles.main}>
          <Image
            style={styles.logo}
            source={require('../../../assets/images/logo.png')}
          />
          <Text style={styles.title}>Enter security code</Text>
          <Text style={styles.mobileHint}>
            Please enter the 6 digit security code sent to your phone number
          </Text>
          <InputMask style={{marginTop: 30}} value={otp} />
          <TouchableOpacity style={styles.resendWrapper}>
            <Text style={styles.resend}>Re-Send</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitWrapper} onPress={onSubmit}>
            <Text style={styles.submit}>Submit</Text>
          </TouchableOpacity>
          <View style={styles.keypad}>
            <KeyPad onChange={onChangeHandler} max={6} initialValue={otp} />
          </View>
        </View>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    verifyingOTP: state.profile.verifyingOTP,
    verifyOTPError: state.profile.verifyOTPError,
    verifyOTPSuccess: state.profile.verifyOTPSuccess,
    authToken: state.profile.authToken,
    otpReceived: state.profile.otpReceived,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    verifyOTP: (data, cb) => dispatch(verifyOTP(data, cb)),
    loadProfile: cb => dispatch(loadProfile(cb)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OTP);
