/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Text} from 'react-native';
import Chat from './pages/Chat';
import store from './store/store';
import Login from './pages/Login';
import OTP from './pages/OTP';
import Conversations from './pages/Conversations';
import localStore from './data/localStore';
import {
  verifyOTPSuccess,
  loadProfile,
  otpReceived,
} from './store/profile/actions';
import ProgressBar from './components/ProgressBar';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import RNOtpVerify from 'react-native-otp-verify';
import HeaderTwo from './components/HeaderTwo';
import HeaderOne from './components/HeaderOne';

const Stack = createStackNavigator();

class MainApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: '',
      options: {},
      appLoaded: false,
    };
  }

  otpHandler = message => {
    if (!message) {
      return;
    }
    try {
      const otp = /(\d{6})/g.exec(message)[1];
      console.log(otp);
      this.props.updateOtp(otp);
      RNOtpVerify.removeListener();
    } catch (error) {
      console.log(error);
    }
  };

  getHash = () =>
    RNOtpVerify.getHash()
      .then(console.log)
      .catch(console.log);

  componentDidMount() {
    this.getHash();
    RNOtpVerify.getOtp()
      .then(p => RNOtpVerify.addListener(this.otpHandler))
      .catch(p => console.log(p));
    localStore
      .getItem('authToken')
      .then(token => {
        if (!token) {
          this.setState({
            currentPage: 'LOGIN',
            appLoaded: true,
          });
        } else {
          this.props.setToken(token);
          this.props.loadProfile(profile => {
            this.setState({
              currentPage: profile.role == 'ADMIN' ? 'Conversations' : 'Chat',
              options: {
                conversationId: profile.conversations[0].id,
              },
              appLoaded: true,
            });
          });
        }
      })
      .catch(error => {
        this.setState({
          currentPage: 'login',
          appLoaded: true,
        });
      });
  }

  setCurrentPage = (page, options = {}) => {
    this.setState({
      currentPage: page,
      options,
    });
  };

  getHeaderComponent = screen => {
    const {profile} = this.props;
    let Header = null;
    if (screen == 'chat') {
      Header = HeaderTwo;
    } else {
      Header = HeaderOne;
    }
    return props => (
      <Header
        profileImageUrl={profile.profileImageUrl}
        username={profile.username}
        {...props}
        enableBack={profile.role == 'ADMIN'}
      />
    );
  };

  render() {
    const {currentPage, options, appLoaded} = this.state,
      {showProgress, profile} = this.props;
    return appLoaded ? (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={currentPage}>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{...options, ...{headerShown: false}}}
          />
          <Stack.Screen
            name="OTP"
            component={OTP}
            options={{...options, ...{headerShown: false}}}
          />
          <Stack.Screen
            name="Chat"
            options={{
              ...options,
              ...{headerShown: false},
              /*...{header: this.getHeaderComponent('chat')},*/
            }}>
            {props => (
              <Chat {...props} conversationId={options.conversationId} />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="Conversations"
            component={Conversations}
            options={{
              ...options,
              ...{
                transitionSpec: {open: {animation: 'spring'}},
                header: this.getHeaderComponent(),
              },
            }}
          />
        </Stack.Navigator>
        {showProgress && <ProgressBar />}
      </NavigationContainer>
    ) : (
      <ProgressBar />
    );
  }
}

const mapStateToProps = state => ({
  showProgress: state.common.showProgress,
  profile: state.profile.profile,
});

const mapDispatchToProps = dispatch => ({
  setToken: token => dispatch(verifyOTPSuccess(token)),
  loadProfile: cb => dispatch(loadProfile(cb)),
  updateOtp: otp => dispatch(otpReceived(otp)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainApp);
