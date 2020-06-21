import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {putRequest} from './data/services';
import {connect} from 'react-redux';
import {UPDATE_PROFILE_URL} from './data/servicesUrls';
import AsyncStorage from '@react-native-community/async-storage';
import {setItem} from './data/localStore';
import {sendMessageSuccess} from './store/chat/actions';
import {CONVERSATIONS, CHAT} from './constants/screens';
import {loadConversations} from './store/conversations/actions';


function PushController(props) {
    registerDevice = token => {
        const {profile} = props;
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

    useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', remoteMessage);
      //alert(props.currentScreen);
      if (props.currentScreen === CHAT) {
        props.addToChat(JSON.parse(remoteMessage.data.data));
      }
      if (props.currentScreen === CONVERSATIONS) {
        props.updateConversations();
      }
  });
    return unsubscribe;
  }, []);

  useEffect(() => {
    messaging()
      .getToken()
      .then(token => {
        AsyncStorage.getItem('isRegisteredForPush').then(val => {
            if (!val) {
              registerDevice(token);
            }
        });
       });

    return messaging().onTokenRefresh(token => {
      console.log("token",token);
    });
  }, []);
  return null;
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
  