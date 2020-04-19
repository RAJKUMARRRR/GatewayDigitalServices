import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Avatar from '../Avatar';

const AvatarListItem = (props) => {
    const { imageUrl='',title='',subTitle='',id,onItemSelected } = props;    
    return (
        <View style={styles.container} onTouchEnd={()=>onItemSelected(id)}>
            <Avatar source={imageUrl} style={styles.avatar}/>
            <View style={styles.content}>
            <Text style={styles.title} >{title}</Text>
            <Text style={styles.subTitle}>{subTitle}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor:'white',
        margin:2,
        marginLeft:5,
        marginRight:5,
        borderRadius:3
    },
    content:{
        flex:1,
        margin:5,
        marginRight:10,
        marginLeft:10,
        paddingTop:5,
        paddingBottom:5
    },
    avatar: {
        marginLeft: 10,
        width: 50,
        height:50
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold'
    },
    subTitle:{        
    }
});

export default AvatarListItem;