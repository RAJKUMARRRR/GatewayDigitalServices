import React,{Component} from 'react';
import { View, Text, StyleSheet, StatusBar, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import AvatarListItem from '../../components/AvatarListItem';
import PushController from '../../PushController';


class Conversations extends Component{

    onConversationSelected = (id)=>{
      this.props.navigation.push('Chat',{conversationId:id});
    }

    processConversations = (conversations,profile)=>{
      conversations.map(con=>{
        if(con.userOne.id == profile.id){
          con.user = con.userTwo
        }else{
          con.user = con.userOne
        }
        return con;
      });
    }

    render(){
        const { props, onConversationSelected,processConversations} = this,
        { profile={},route } = props,
        { params } = route,
        { conversations= params.conversations || []  } = props
        return (<>
      <StatusBar barStyle="dark-content" backgroundColor="#f1f1f1"/>
      <View style={styles.main}>
        <View style={{flexDirection:'row',justifyContent:'center',width:'100%',alignItems:'center',height:100}}>          
        <Image style={{height:50,resizeMode:'contain'}} source={require('../../../assets/images/logo.png')}/>
        </View>
        <View style={styles.scroll}>
        <ScrollView>
          {
                processConversations(conversations,profile).map(item=>(
                    <AvatarListItem imageUrl={item.user.profileImageUrl} title={item.user.username} subTitle={item.user.mailBoxNumber} key={item.id} id={item.id} onItemSelected={onConversationSelected}/>
                ))
          }
        </ScrollView>
        </View>
      </View>
      {profile && <PushController profile={profile}/>}
        </>);
    }
}


const styles = StyleSheet.create({
    main:{
      flex:1,
      backgroundColor: 'white',
      justifyContent: 'flex-start',
      alignItems: 'center',
      width:'100%',
      backgroundColor: '#f1f1f1',
    },
    text:{
      color: 'black',
      fontSize: 30,
      fontWeight: "bold"
    },
    scroll:{
      flex:1,
      width:'100%',
    }
  });
  

const mapStateToProps = (state)=>{
    return {
        conversations: state.profile.profile ? state.profile.profile.conversations : [] || [],
        profile: state.profile.profile,
    }
  }
  
const mapDispatchToProps = (dispatch)=>{
    return {
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Conversations);