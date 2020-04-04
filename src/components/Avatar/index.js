import React, { Component } from 'react'
import { Image, StyleSheet, View } from 'react-native'


const Avatar = (props) => {
    const { style = {} } = props
    
    return <View style={{...styles.container,...style}}> 
    <Image
            style={styles.logo}
            source={{
                uri:
                    'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
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
        padding: 2
    },
    logo: {
        width: 5,
        height: 5,
        borderRadius: 100,
        borderWidth: 1,
        padding: 10
    },
});