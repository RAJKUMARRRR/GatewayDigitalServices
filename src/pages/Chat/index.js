/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import { StyleSheet,Text, View, StatusBar, ScrollView, Image, TouchableOpacity, Keyboard} from 'react-native';
import { withTheme } from 'styled-components';
import TextBox from '../../components/TextBox';
import ChatMessage from '../../components/ChatMessage';
import ChatSection from '../../components/ChatSection';
import Avatar from '../../components/Avatar'
import { connect } from 'react-redux';
import { loadMessages, sendMessage } from '../../store/chat/actions';

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


class Chat extends Component {

  constructor(props){
    super(props);
    this.state = {
      messageText:''
    }
  }

  componentDidMount(){
    this.props.loadMessages(1);
  }

  equals = (a,b)=>{
    /*if(b.id){
      return a.id==b.id;
    }*/
    return a.id==b;
  }

   processMessages = (messages=[])=>{
     const days = ["Monday","Tuesday","Wednesday","Thirsday","Friday","Saturday","Sunday"],
     months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
     formatNumber = (num)=>{
       if(num<10){
         return "0"+num;
       }
       return num;
     }
     messages = messages.map(message => {
       const date = new Date(message.createdAt.split("+")[0]+"Z");
       message.day = days[(date.getDay())]+","+months[date.getMonth()-1]+" "+date.getDate();
       message.time = (formatNumber(date.getHours()%12))+":"+(formatNumber(date.getMinutes()))+" "+(date.getHours()>=12?"PM":"AM");
       return message;
     });
     const groups = {};
     for(let msg of messages){
       if(!groups[msg.day]){
        groups[msg.day] = [];
       }
       groups[msg.day].push(msg);
     }     
     return groups;
   }

   mapMessageWithSections = (messages={})=>{
     const ui = [];
    for(let key in messages){
       ui.push(<ChatSection title={key} key={key}/>)
       Array.prototype.push.apply(ui,this.mapMessages(messages[key])) 
     }
     return ui;
   }

   mapMessages = (messages=[])=>{
     const { profile } = this.props
     return messages.map(msg=>(
      <ChatMessage message={msg.message} timestamp={msg.time} from={!this.equals(profile,msg.userId)} key={msg.id}/>
     ));
   }

   onTextChange = (text)=>{
     this.setState((prevState)=>({
       messageText : text
     }));
   }

   onSendHandler = ()=>{
     const {profile} = this.props;
     this.props.sendMessage(    {
      "message": this.state.messageText,
      "messageStatus": "PENDING",
      "messageType": "TEXT",
      "userId": profile.id,
      "conversationId": 1
    });
     this.setState({
       messageText:''
     });
   }

   handleScrollToEnd = ()=>{
     if(this.scrollView){
       this.scrollView.scrollToEnd({animated: true});
     }
   }

   onTextBoxFocus = ()=>{
     setTimeout(this.handleScrollToEnd,100);
   }

  render() {
    const { props, state, onTextChange, onSendHandler,handleScrollToEnd,onTextBoxFocus} = this,
    { messages=[] } = props,
    { messageText } = state;
    return (
      <>
      <StatusBar barStyle="dark-content" backgroundColor="#f1f1f1"/>
      <View style={styles.main}>
        <View style={{flexDirection:'row',justifyContent:'flex-start',width:'100%',alignItems:'center'}}>
          <Text style={{marginRight:'auto',padding:15,paddingBottom:5,paddingTop:5}}>Welcome!</Text>
          <Avatar style={{margin:5}}/>
          <Text style={{marginRight:15}}>Arthur Mack</Text>
        </View>
        <View style={{flexDirection:'row',justifyContent:'center',width:'100%',alignItems:'center',height:100}}>          
        <Text style={{ fontFamily: 'GDSfont', fontSize: 20,padding:10,color:'black',position:'absolute',left:10 }}>A</Text>
        <Image style={{height:50,resizeMode:'contain'}} source={require('../../../assets/images/logo.png')}/>
        </View>
        <View style={styles.scroll}>
        <ScrollView
          ref={ref => {this.scrollView = ref}}
          onContentSizeChange={handleScrollToEnd}        
        >
          {
            this.mapMessageWithSections(this.processMessages(messages))
          }
        </ScrollView>
        </View>
        <View style={{flexDirection:'row',padding: 5,paddingTop: 10,justifyContent:'center',alignItems:'center'}}>
          <Text style={{ fontFamily: 'GDSfont', fontSize: 25,padding:10,color:'red' }}>B</Text>
          <View style={{
            flex: 1,
            marginLeft:5,
            marginRight:5
          }}>
          <TextBox  
          value={messageText} 
          onChangeText={onTextChange}
          onFocus={onTextBoxFocus}
          onTouchEnd= {onTextBoxFocus}
          />
          {/*<Text style={{ fontFamily: 'GDSfont', fontSize: 20,padding:10,color:'red',position:'absolute',right:0 }}>C</Text>*/}
          </View>
          <TouchableOpacity onPress={onSendHandler} disabled={!messageText}><Text style={{ fontFamily: 'GDSfont', fontSize: 30,padding:10,color:'red' }}>C</Text></TouchableOpacity>
        </View>
      </View>
      </>
    );
  }
}

const mapStateToProps = state => ({
  messages:state.chat.messages,
  loading:state.chat.loading,
  error:state.chat.error,
  profile: state.profile.profile
});

const mapDispatchToProps = dispatch => ({
  loadMessages: (conversationId)=>dispatch(loadMessages(conversationId)),
  sendMessage: (message)=>dispatch(sendMessage(message))
});

export default connect(mapStateToProps,mapDispatchToProps)(Chat);