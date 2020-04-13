import React, { Component } from 'react'
import { TextInput, StyleSheet } from 'react-native'

const TextBox = (props) => {
    const {style={},...restProps} = props
    return <TextInput style={{...styles.input,...style}}
        underlineColorAndroid="transparent"
        placeholder="Type here something..."
        placeholderTextColor="#c3c3c3"
        autoCapitalize="none"
        {...restProps}
         />
}

export default TextBox

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderWidth: 1,
        backgroundColor:'white',
        fontSize: 15,
        borderColor:'transparent',
        borderRadius: 15,
        width: '100%',
        padding:10
    }
})