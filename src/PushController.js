import React, {Component} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import PushNotification from 'react-native-push-notification';
import {UPDATE_PROFILE_URL} from './data/servicesUrls';
import {setItem} from './data/localStore';
import {putRequest} from './data/services';
import {connect} from 'react-redux';
import {sendMessageSuccess} from './store/chat/actions';
import {CONVERSATIONS, CHAT} from './constants/screens';
import {loadConversations} from './store/conversations/actions';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { Alert } from 'react-native';


class PushController extends Component {
  registerDevice = token => {
    const {profile} = this.props;
    profile.pushToken = token;
    putRequest(UPDATE_PROFILE_URL, profile)
      .then(response => {
        console.log(JSON.stringify(response.status));
        setItem('isRegisteredForPush', 'true');
      })
      .catch(error => {
        console.log('Server Down!! Please contact admin.', error);
      });
  };

  registerForPushNotification = () => {
    alert("registering");
    const {registerDevice, props} = this;
    const onRegistered = (deviceToken) => {
      console.log('Registered For Remote Push', `Device Token: ${deviceToken}`);
    };
  
    const onRegistrationError = (error) => {
      alert(
        'Failed To Register For Remote Push'+`Error (${error.code}): ${error.message}`
      );
      alert(JSON.stringify(error));
    };
  
    const onRemoteNotification = (notification) => {
      const result = `Message: ${notification.getMessage()};\n
        badge: ${notification.getBadgeCount()};\n
        sound: ${notification.getSound()};\n
        category: ${notification.getCategory()};\n
        content-available: ${notification.getContentAvailable()}.`;
  
      alert('Push Notification Received', result);
    };

    PushNotificationIOS.addEventListener('register', onRegistered);
    PushNotificationIOS.addEventListener(
      'registrationError',
      onRegistrationError,
    );
    PushNotificationIOS.addEventListener('notification', onRemoteNotification);

    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function(token) {
        alert("on register");
        //console.log("DeviceId",DeviceInfo.getUniqueId());
        console.log('TOKEN:', token);
        AsyncStorage.getItem('isRegisteredForPush').then(val => {
          if (!val) {
            registerDevice(token.token);
          }
        });
      },

      onNotification: function(notification) {
        console.log('NOTIFICATION:', notification);
        if (props.currentScreen === CHAT) {
          props.addToChat(notification.data);
        }
        if (props.currentScreen === CONVERSATIONS) {
          props.updateConversations();
        }
        // required on iOS only
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      // Android only
      senderID: '861088027944',
      // iOS only
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
    //PushNotification.requestPermissions('861088027944');
  };

  componentDidMount() {
    const {registerForPushNotification} = this;
    registerForPushNotification();
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => {
  return {
    currentScreen: state.common.currentScreen,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addToChat: message => dispatch(sendMessageSuccess(message)),
    updateConversations: () => dispatch(loadConversations()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PushController);
