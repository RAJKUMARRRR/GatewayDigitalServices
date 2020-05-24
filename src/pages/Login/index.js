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
  Alert,
} from 'react-native';
import KeyPad from '../../components/KeyPad';
import {connect} from 'react-redux';
import {sendOTP} from '../../store/profile/actions';
import {OTP, COUNTRIES} from '../../constants/screens';
import {waitContainer} from '../../hoc/waitContainer';
import {COUNTRY_CODES} from '../../data/servicesUrls';
import SplashScreen from 'react-native-splash-screen';
import TextBox from '../../components/TextBox';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: '',
      email: '',
      selectedCountryCode:
        props.referenceData[0].length > 0 ? this.props.referenceData[0][0] : {},
      showEmailPopup: false,
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
    if (this.state.showEmailPopup) {
      let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!mailFormat.test(this.state.email)) {
        Alert.alert('Error', 'Please enter valid email.');
        return;
      }
    }
    this.props.sendOTP(
      {
        mobile: this.state.mobile,
        email: this.state.email,
        countryCode: this.state.selectedCountryCode.mobileCode,
      },
      () => {
        this.props.navigation.navigate(OTP, {
          mobile: this.state.mobile,
          countryCode: this.state.selectedCountryCode.mobileCode,
        });
      },
      error => {
        if (error.status == '404') {
          this.setState({
            showEmailPopup: true,
          });
        }
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

  onEmailChange = text => {
    this.setState(prevState => ({
      email: text,
    }));
  };

  render() {
    const {
        onChangeHandler,
        props,
        state: {mobile, selectedCountryCode, showEmailPopup, email},
        onLoginHandler,
        onSelectCountryClickHandler,
        onCountryselected,
        onEmailChange,
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
          {!showEmailPopup && (
            <>
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
            </>
          )}
          {showEmailPopup && (
            <>
              <View style={styles.mobileWrapper}>
                <View style={styles.mobileNumber}>
                  <Text style={styles.mobileHint}>
                    We couldn't find account registered with mobile number{' '}
                    {this.state.mobile}, Please Enter your registered email
                    address to login
                  </Text>
                  <TextBox
                    value={email}
                    onChangeText={onEmailChange}
                    style={styles.email}
                    placeholder="Email"
                  />
                </View>
              </View>
              {true && (
                <TouchableOpacity
                  style={styles.loginWrapper}
                  onPress={onLoginHandler}>
                  <Text style={styles.login}>Login</Text>
                </TouchableOpacity>
              )}
            </>
          )}
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
  email: {
    height: 50,
    borderRadius: 50,
    marginTop: 10,
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
    sendOTP: (mobile, cb, err) => dispatch(sendOTP(mobile, cb, err)),
  };
};

export default waitContainer(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Chat),
  [COUNTRY_CODES],
);
