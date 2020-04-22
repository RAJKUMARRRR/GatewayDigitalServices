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

class Conversations extends Component {
  onConversationSelected = ({id, user}) => {
    this.props.resetMessages();
    this.props.navigation.push('Chat', {
      conversationId: id,
      user: user,
    });
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

  render() {
    const {props, onConversationSelected, processConversations} = this,
      {profile = {}, route} = props,
      {params} = route,
      {conversations = params.conversations || []} = props;
    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor="#f1f1f1" />
        <View style={styles.main}>
          <View style={styles.scroll}>
            <ScrollView>
              {processConversations(conversations, profile).map(item => (
                <AvatarListItem
                  imageUrl={item.user.profileImageUrl}
                  title={item.user.username}
                  subTitle={'Mailbox NO ' + item.user.mailBoxNumber}
                  key={item.id}
                  id={item.id}
                  showIndicator={item.showNewMessagesIndicator}
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
    conversations: state.profile.profile
      ? state.profile.profile.conversations
      : [] || [],
    profile: state.profile.profile,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetMessages: () => dispatch(loadMessagesSuccess([])),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Conversations);
