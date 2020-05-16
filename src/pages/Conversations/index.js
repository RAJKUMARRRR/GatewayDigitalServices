import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import AvatarListItem from '../../components/AvatarListItem';
import PushController from '../../PushController';
import {loadMessagesSuccess} from '../../store/chat/actions';
import {
  loadConversations,
  markConversationRead,
} from '../../store/conversations/actions';
import {CHAT} from '../../constants/screens';
import SearchBar from '../../components/SearchBar';
import SplashScreen from 'react-native-splash-screen';

class Conversations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      searchResult: [],
    };
  }

  onConversationSelected = ({id, user}) => {
    this.props.resetMessages();
    markConversationRead(id);
    this.props.navigation.push(CHAT, {
      conversationId: id,
      user: user,
    });
    this.unregisterListener = null;
  };
  processConversations = (conversations = [], profile = {}) => {
    return conversations.map(con => {
      if (con.userOne.id == profile.id) {
        con.user = con.userTwo;
      } else {
        con.user = con.userOne;
      }
      con.showNewMessagesIndicator =
        con.lastUpdatedUserId &&
        con.lastUpdatedUserId != '' &&
        con.lastUpdatedUserId != 'null' &&
        con.lastUpdatedUserId != profile.id;
      return con;
    });
  };

  componentDidMount() {
    this.unregisterListener = this.props.navigation.addListener('focus', () => {
      this.props.loadConversations();
    });
    SplashScreen.hide();
  }

  componentWillUnmount() {
    this.unregisterListener && this.unregisterListener();
  }

  onSearchHandler = searchString => {
    if (!searchString || !this.props.conversations) {
      this.setState({
        searchText: '',
        searchResult: [],
      });
      return;
    }
    let str = searchString
      .toString()
      .trim()
      .toLowerCase();
    this.setState({
      searchText: str,
      searchResult: this.processConversations(
        this.props.conversations,
        this.props.profile,
      ).filter(
        con =>
          (con.user.mailBoxNumber + ' ' + con.user.username)
            .toLowerCase()
            .indexOf(str) >= 0,
      ),
    });
  };

  render() {
    const {
        props,
        onConversationSelected,
        processConversations,
        state: {searchResult, searchText},
        onSearchHandler,
      } = this,
      {profile = {}, route, navigation, conversations = []} = props;
    // {params} = route,
    // {conversations = params.conversations || []} = props;
    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor="#f1f1f1" />
        <View style={styles.main}>
          <View style={styles.scroll}>
            <SearchBar
              style={{marginLeft: 15, marginRight: 15}}
              onSearch={onSearchHandler}
              placeholder="Search mailbox number..."
            />
            <ScrollView>
              {processConversations(
                searchText ? searchResult : conversations,
                profile || {},
              ).map(item => (
                <AvatarListItem
                  imageUrl={item.user.profileImageUrl}
                  title={item.user.username}
                  subTitle={'Mailbox NO ' + item.user.mailBoxNumber}
                  key={item.id}
                  id={item.id}
                  showIndicator={item.showNewMessagesIndicator}
                  unreadCount={item.unreadCount}
                  onItemSelected={() => onConversationSelected(item)}
                />
              ))}
            </ScrollView>
          </View>
        </View>
        {profile && <PushController profile={profile} />}
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

const mapStateToProps = state => {
  return {
    profile: state.profile.profile,
    conversations: state.conversations.conversations || [],
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetMessages: () => dispatch(loadMessagesSuccess([])),
    loadConversations: () => dispatch(loadConversations()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Conversations);
