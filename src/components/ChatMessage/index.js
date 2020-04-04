import React from 'react'
import {View,StyleSheet, Text} from 'react-native'

const ChatMessage = (props)=>{
    const { message='', timestamp='', from } = props
    const containerStyle = {...styles.container, ...(from ? styles.containerFrom:styles.containerTo)}
    const textStyle = from ? styles.textFrom:styles.textTo
    return (
        <View style={containerStyle}>
            <Text style={{...textStyle,...styles.message}}>{message}</Text>
            {from && <Text style={{...textStyle,...styles.timestamp}}>{timestamp}</Text>}
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
        marginBottom:0        
    },
    containerFrom:{
        backgroundColor: 'white',
        alignSelf: 'flex-start',
        borderBottomLeftRadius: 0,
    },
    containerTo:{
        backgroundColor: 'red',
        alignSelf: 'flex-end',
        borderBottomRightRadius: 0,
    },
    textFrom:{
        color:'black'
    },
    textTo:{
        color: 'white'
    },
    message:{

    },
    timestamp:{
        color:'#c3c3c3',
        fontSize: 10,
        textAlign:'right'
    }
})