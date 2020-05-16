/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import KeyPad from '../../components/KeyPad';
import {connect} from 'react-redux';
import {sendOTP} from '../../store/profile/actions';
import {OTP, COUNTRIES} from '../../constants/screens';
import {waitContainer} from '../../hoc/waitContainer';
import {COUNTRY_CODES} from '../../data/servicesUrls';
import SplashScreen from 'react-native-splash-screen';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: '',
      selectedCountryCode:
        props.referenceData[0].length > 0 ? this.props.referenceData[0][0] : {},
    };
  }

  componentDidMount() {
    SplashScreen.hide();
  }

  onChangeHandler = val => {
    this.setState({
      mobile: val,
    });
  };

  onLoginHandler = () => {
    this.props.sendOTP(
      {
        mobile: this.state.mobile,
        countryCode: this.state.selectedCountryCode.mobileCode,
      },
      () => {
        this.props.navigation.navigate(OTP, {mobile: this.state.mobile});
      },
    );
  };

  onSelectCountryClickHandler = () => {
    this.props.navigation.push(COUNTRIES, {
      countries: this.props.referenceData[0],
      onCountryselected: this.onCountryselected,
    });
  };

  onCountryselected = country => {
    this.setState({
      selectedCountryCode: country,
    });
  };

  render() {
    const {
        onChangeHandler,
        props,
        state: {mobile, selectedCountryCode},
        onLoginHandler,
        onSelectCountryClickHandler,
        onCountryselected,
      } = this,
      {sendingOTP, sendOTPSuccess, sendOTPError} = props;
    if (sendingOTP) {
      console.log('sendingOTP');
    }
    if (sendOTPSuccess) {
      console.log('OTP sent successfully..');
    }
    if (sendOTPError) {
      console.log('Failed to send OTP:' + JSON.stringify(sendOTPError));
    }
    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor="#f1f1f1" />
        <View style={styles.main}>
          <Image
            style={styles.logo}
            source={require('../../../assets/images/loginbg.png')}
          />
          <View style={styles.mobileWrapper}>
            <View
              style={styles.countryCode}
              onTouchEnd={onSelectCountryClickHandler}>
              <Text style={{...styles.mobile, ...styles.countryCodeLabel}}>
                {selectedCountryCode.mobileCode}
              </Text>
              <Text style={styles.mobileHint}>Select</Text>
            </View>
            <View style={styles.mobileNumber}>
              <Text style={styles.mobile}>{mobile}</Text>
              <Text style={styles.mobileHint}>
                Enter your registered phone number to login
              </Text>
            </View>
          </View>
          {mobile.length >= 10 && (
            <TouchableOpacity
              style={styles.loginWrapper}
              disabled={mobile.length < 10}
              onPress={onLoginHandler}>
              <Text style={styles.login}>Login</Text>
            </TouchableOpacity>
          )}
          <View style={styles.keypad}>
            <KeyPad onChange={onChangeHandler} max={10} initialValue={''} />
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#f1f1f1',
  },
  logo: {
    width: '100%',
    marginTop: -50,
    resizeMode: 'contain',
  },
  mobileWrapper: {
    marginTop: -50,
    width: '90%',
    flexDirection: 'row',
  },
  countryCode: {
    flexWrap: 'nowrap',
    paddingRight: 10,
  },
  countryCodeLabel: {
    width: 50,
    color: '#c1c1c1',
    fontWeight: 'bold',
    padding: 0,
    letterSpacing: 0,
  },
  mobileNumber: {
    flex: 1,
  },
  mobile: {
    height: 50,
    color: '#c1c1c1',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 5,
    borderColor: '#DA1515',
    borderWidth: 1,
    borderRadius: 50,
    padding: 20,
    paddingBottom: 10,
    paddingTop: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: 'white',
  },
  mobileHint: {
    fontSize: 12,
    textAlign: 'center',
  },
  loginWrapper: {
    marginTop: 50,
    backgroundColor: '#DA1515',
    borderRadius: 100,
    padding: 10,
    width: '70%',
  },
  login: {
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

const mapStateToProps = state => {
  return {
    sendingOTP: state.profile.sendingOTP,
    sendOTPError: state.profile.sendOTPError,
    sendOTPSuccess: state.profile.sendOTPSuccess,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendOTP: (mobile, cb) => dispatch(sendOTP(mobile, cb)),
  };
};

export default waitContainer(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Chat),
  [COUNTRY_CODES],
);
