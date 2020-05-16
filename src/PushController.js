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
    const {registerDevice, props} = this;
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function(token) {
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
        //notification.finish(PushNotificationIOS.FetchResult.NoData);
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
    PushNotification.requestPermissions('861088027944');
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
