/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './src/store/store';
import MainApp from './src/MainApp';
import { NavigationContainer } from '@react-navigation/native';

GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;

export default class App extends Component {
  render() {
    return <Provider store={store}><MainApp/></Provider>
  }
}
