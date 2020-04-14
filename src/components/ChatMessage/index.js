import React from 'react'
import {View,StyleSheet,Text,Image, TouchableOpacity} from 'react-native'

const ChatMessage = (props)=>{
    const { message, from, onImageTapHandler } = props
    const containerStyle = {...styles.container, ...(from ? styles.containerFrom:styles.containerTo)}
    const textStyle = from ? styles.textFrom:styles.textTo
    const timestampStype = from ? styles.timestamp : {...styles.timestamp,...styles.timestampFrom}
    return (
        <View style={containerStyle}>
            {
                message.messageType==="MEDIA" && <TouchableOpacity onPress={()=>onImageTapHandler&&onImageTapHandler(message.media.sourceUrl)}><Image source={{uri:message.media.sourceUrl}} style={styles.imageNormal}/></TouchableOpacity>
            }
            {
                message.messageType==="TEXT" && <Text style={{...textStyle,...styles.message}}>{message.message}</Text>
            }            
            <Text style={{...textStyle,...timestampStype}}>{message.messageStatus=="PENDING"? "sending..." : message.time}</Text>
        </View>
    )
}


export default ChatMessage

const styles = StyleSheet.create({
    container:{
        padding:15,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 10,
        margin: 20,
        marginTop: 10,
        marginBottom:0,
        /*flex:1,
        flexDirection:'row'*/
    },
    containerFrom:{
        backgroundColor: 'white',
        alignSelf: 'flex-start',
        borderBottomLeftRadius: 0,
        marginRight: 80
    },
    containerTo:{
        backgroundColor: 'red',
        alignSelf: 'flex-end',
        borderBottomRightRadius: 0,
        marginLeft: 80
    },
    textFrom:{
        color:'black'
    },
    textTo:{
        color: 'white'
    },
    message:{
        alignSelf:'flex-start',
        /*paddingBottom:10*/
    },
    timestamp:{
        color:'#c3c3c3',
        fontSize: 10,
        textAlign:'right',
        alignSelf:'flex-end',
        marginLeft:5 
    },
    timestampFrom:{
        color:'white',
    },
    imageNormal:{
        width: 200,
        height: 200
    }
})