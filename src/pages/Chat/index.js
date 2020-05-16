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
  ScrollView,
  Image,
  TouchableOpacity,
  Keyboard,
  PermissionsAndroid,
  Platform,
  BackHandler,
  Button,
} from 'react-native';
import TextBox from '../../components/TextBox';
import ChatMessage from '../../components/ChatMessage';
import ChatSection from '../../components/ChatSection';
import Avatar from '../../components/Avatar';
import {connect} from 'react-redux';
import {loadMessages, sendMessage, sendMedia} from '../../store/chat/actions';
import ImagePicker from 'react-native-image-picker';
import ImageView from '../../components/ImageView';
import PushController from '../../PushController';
import {getRequest} from '../../data/services';
import {BASE_URL} from '../../data/servicesUrls';
import Suggession from '../../components/Suggession';
import HeaderTwo from '../../components/HeaderTwo';
import HeaderThree from '../../components/HeaderThree';
import SplashScreen from 'react-native-splash-screen';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#f1f1f1',
  },
  text: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
  },
  scroll: {
    flex: 1,
    width: '100%',
  },
});

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Cool Photo App Camera Permission',
        message:
          'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageText: '',
      photo: null,
      viewImage: false,
      selectedImageSource: '',
      adminSuggessions: [],
      showSuggession: false,
    };
    BackHandler.addEventListener('hardwareBackPress', this.onDeviceBackHandler);
  }

  componentDidMount() {
    this.props.loadMessages(this.props.route.params.conversationId);
    getRequest(BASE_URL + '/system_messages/admin')
      .then(res => {
        this.setState({
          adminSuggessions: res.data,
        });
      })
      .catch(error => {
        alert(JSON.stringify(error));
      });
      SplashScreen.hide();
    }

  onDeviceBackHandler = () => {
    if (this.state.viewImage) {
      this.setState({
        viewImage: false,
        selectedImageSource: '',
      });
      return true;
    }
    return false;
  };

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.onDeviceBackHandler,
    );
  }

  equals = (a, b) => {
    return a.id == b;
  };

  processMessages = (messages = []) => {
    //alert(JSON.stringify(new Date())+"-------"+messages[0].createdAt)
    const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thirsday',
        'Friday',
        'Saturday',
      ],
      months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      formatNumber = num => {
        if (num < 10) {
          return '0' + num;
        }
        return num;
      };
    messages = messages.map(message => {
      const date = message.createdAt
        ? new Date(message.createdAt.split('+')[0] + 'Z')
        : new Date();
      message.day =
        days[date.getDay()] +
        ',' +
        months[date.getMonth() - 1] +
        ' ' +
        date.getDate();
      message.time =
        formatNumber(date.getHours() % 12) +
        ':' +
        formatNumber(date.getMinutes()) +
        ' ' +
        (date.getHours() >= 12 ? 'PM' : 'AM');
      return message;
    });
    const groups = {};
    for (let msg of messages) {
      if (!groups[msg.day]) {
        groups[msg.day] = [];
      }
      groups[msg.day].push(msg);
    }
    return groups;
  };

  mapMessageWithSections = (messages = {}) => {
    const ui = [];
    for (let key in messages) {
      ui.push(<ChatSection title={key} key={key} />);
      Array.prototype.push.apply(ui, this.mapMessages(messages[key]));
    }
    return ui;
  };

  mapMessages = (messages = []) => {
    const {profile} = this.props;
    return messages.map(msg => (
      <ChatMessage
        message={msg}
        from={!this.equals(profile, msg.userId)}
        key={msg.id}
        onImageTapHandler={this.onImageTapHandler}
      />
    ));
  };

  onTextChange = text => {
    this.setState(prevState => ({
      messageText: text,
    }));
  };

  onSendHandler = () => {
    const {profile, route} = this.props;
    this.props.sendMessage({
      message: this.state.messageText,
      messageStatus: 'SEND',
      messageType: 'TEXT',
      userId: profile.id,
      conversationId: route.params.conversationId,
      messageSource: 'USER',
      systemMessage: null,
    });
    this.setState({
      messageText: '',
    });
  };

  handleScrollToEnd = () => {
    if (this.scrollView) {
      this.scrollView.scrollToEnd({animated: true});
    }
  };

  onTextBoxFocus = () => {
    setTimeout(this.handleScrollToEnd, 100);
    this.setState({
      showSuggession: true,
    });
  };

  createFormData = (photo, body) => {
    return photo;
  };

  handleChoosePhoto = () => {
    const {profile, route} = this.props;
    const options = {};
    ImagePicker.showImagePicker(options, response => {
      if (response.error) {
        requestCameraPermission();
      }
      if (response.uri) {
        this.setState({photo: response}, () => {
          this.props.sendMedia(
            this.state.photo,
            profile.id,
            route.params.conversationId,
          );
        });
      }
    });
  };

  onImageTapHandler = source => {
    this.setState({
      viewImage: true,
      selectedImageSource: source,
    });
  };

  handleImageViewClose = () => {
    this.setState({
      viewImage: false,
      selectedImageSource: '',
    });
  };

  onBackHandler = () => {
    this.props.navigation.goBack();
  };

  getSuggessions = message => {
    const {profile} = this.props;
    if (message.messageSource == 'SYSTEM') {
      const data =
        (profile.id != message.userId &&
          message.systemMessage &&
          message.systemMessage.children) ||
        [];
      if (data.length <= 0 && this.props.profile.role == 'ADMIN') {
        return this.mapSuggessions(this.state.adminSuggessions);
      }
      return this.mapSuggessions(data);
    }
    if (this.props.profile.role == 'ADMIN') {
      return this.mapSuggessions(this.state.adminSuggessions);
    }
    return null;
  };

  mapSuggessions = data => {
    return data.map(item => (
      <Suggession
        title={item.message}
        key={item.id}
        onPress={() => this.onSuggessionClickHandler(item)}
      />
    ));
  };

  onSuggessionClickHandler = suggession => {
    const {profile, route} = this.props;
    this.props.sendMessage({
      message: suggession.message,
      messageStatus: 'SEND',
      messageType: 'TEXT',
      userId: profile.id,
      conversationId: route.params.conversationId,
      messageSource: 'SYSTEM',
      systemMessage: suggession,
    });
    this.setState({
      messageText: '',
    });
    Keyboard.dismiss();
  };

  onStopEditing = () => {
    this.setState({
      showSuggession: false,
    });
  };

  render() {
    const {
        props,
        state,
        onTextChange,
        onSendHandler,
        handleScrollToEnd,
        onTextBoxFocus,
        handleChoosePhoto,
        handleImageViewClose,
        onBackHandler,
        getSuggessions,
        mapSuggessions,
        onStopEditing,
      } = this,
      {messages = [], profile = {}, route = {}} = props,
      {params = {}} = route,
      {user = {}} = params,
      {username = '', profileImageUrl = '', mailBoxNumber = ''} = user,
      {
        messageText,
        viewImage,
        selectedImageSource,
        adminSuggessions,
        showSuggession,
      } = state,
      suggessionsUi =
        (messages.length > 0
          ? getSuggessions(messages[messages.length - 1])
          : mapSuggessions(adminSuggessions)) || [];
    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor="#f1f1f1" />
        <View style={styles.main}>
          {viewImage && (
            <ImageView
              source={selectedImageSource}
              onCloseHandler={handleImageViewClose}
            />
          )}
          {profile.role == 'ADMIN' ? (
            <HeaderTwo
              profileImageUrl={profileImageUrl}
              username={username}
              enableBack={true}
              onBack={onBackHandler}
              mailBoxNumber={mailBoxNumber}
            />
          ) : (
            <HeaderThree
              profileImageUrl={profile.profileImageUrl}
              username={profile.username}
            />
          )}
          <View style={styles.scroll}>
            <ScrollView
              ref={ref => {
                this.scrollView = ref;
              }}
              onContentSizeChange={handleScrollToEnd}>
              {this.mapMessageWithSections(this.processMessages(messages))}
            </ScrollView>
          </View>
          {suggessionsUi.length > 0 && showSuggession && suggessionsUi}
          <View
            style={{
              flexDirection: 'row',
              padding: 5,
              paddingTop: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={handleChoosePhoto}>
              <Text
                style={{
                  fontFamily: 'GDSfont',
                  fontSize: 25,
                  padding: 10,
                  color: '#DA1515',
                }}>
                B
              </Text>
            </TouchableOpacity>
            <View
              style={{
                flex: 1,
                marginLeft: 5,
                marginRight: 5,
              }}>
              <TextBox
                value={messageText}
                onChangeText={onTextChange}
                onFocus={onTextBoxFocus}
                onTouchEnd={onTextBoxFocus}
                onBlur={onStopEditing}
              />
            </View>
            <TouchableOpacity onPress={onSendHandler} disabled={!messageText}>
              <Text
                style={{
                  fontFamily: 'GDSfont',
                  fontSize: 30,
                  padding: 10,
                  color: '#DA1515',
                }}>
                C
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {profile && <PushController profile={profile} />}
      </>
    );
  }
}

const mapStateToProps = state => ({
  messages: state.chat.messages,
  loading: state.chat.loading,
  error: state.chat.error,
  profile: state.profile.profile,
  authToken: state.profile.authToken,
});

const mapDispatchToProps = dispatch => ({
  loadMessages: conversationId => dispatch(loadMessages(conversationId)),
  sendMessage: message => dispatch(sendMessage(message)),
  sendMedia: (data, userId, conversationId) =>
    dispatch(sendMedia(data, userId, conversationId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chat);
