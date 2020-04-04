/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView, Image, Button, TouchableOpacity } from 'react-native';
import KeyPad from '../../components/KeyPad'
import InputMask from '../../components/InputMask';

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#f1f1f1'
    },
    logo: {
        margin: 50,
        resizeMode: 'contain',
        height: 50
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    mobileHint: {
        width: '70%',
        fontSize: 12,
        textAlign: 'center'
    },
    resendWrapper: {
        marginTop: 30,
    },
    resend: {
        color: 'red',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    submitWrapper: {
        marginTop: 50,
        backgroundColor: 'red',
        borderRadius: 100,
        padding: 10,
        width: '70%',
        position: 'absolute',
        bottom: '36%',
    },
    submit: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    keypad: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '35%'
    }
});

export default class OTP extends Component {
    render() {
        return (
            <>
                <StatusBar barStyle="dark-content" backgroundColor="#f1f1f1" />
                <View style={styles.main}>
                    <Image style={styles.logo} source={require('../../../assets/images/logo.png')} />
                    <Text style={styles.title}>Enter security code</Text>
                    <Text style={styles.mobileHint}>Please enter the 6 digit security code sent to your phone number</Text>
                    <InputMask style={{ marginTop: 30 }} />
                    <TouchableOpacity style={styles.resendWrapper}>
                        <Text style={styles.resend}>
                            Re-Send
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.submitWrapper}>
                        <Text style={styles.submit}>
                            Submit
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.keypad}>
                        <KeyPad />
                    </View>
                </View>
            </>
        );
    }
}