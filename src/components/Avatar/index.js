import React, { Component } from 'react'
import { Image, StyleSheet, View } from 'react-native'


const Avatar = (props) => {
    const { style = {}, sourceUrl='' } = props,
    {logo={}} = style,
    url = (sourceUrl=="null" || !sourceUrl) ? 'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png' : sourceUrl
    //alert(url);
    delete style.logo
    return <View style={{...styles.container,...style}}>
    <Image
            style={{...styles.logo,...logo}}
            source={{
                uri: url
            }}
        />
    </View>
}

export default Avatar

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        borderRadius: 100,
        borderColor: 'red',
        borderWidth: 1,
        padding: 2,
        justifyContent:'center',
        alignItems:'center'
    },
    logo: {
        width: 5,
        height: 5,
        borderRadius: 100,
        borderWidth: 1,
        padding: 10,
    },
});