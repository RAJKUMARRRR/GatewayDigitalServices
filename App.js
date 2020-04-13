/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { CHAT } from './api';
import Chat from './src/pages/Chat';
import store from './src/store/store';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      profile: {
        "id": 102,
        "createdAt": "2020-04-11T11:10:06.000+0000",
        "updatedAt": "2020-04-11T11:10:06.000+0000",
        "phone": "8501096987",
        "username": "root",
        "accountStatus": null
      }
    }
  }


  loadAppinfo = () => {
    fetch(CHAT+"?conversationId=1")
      .then((response) => response.json())
      .then((response) => {
        alert(JSON.stringify(response));
        this.setState({
          loading: false,
          messages:response
        })
      })
      .catch((error) => {
        alert("Error:" + JSON.stringify(error));
        this.setState({
          loading: false,
          error:error
        })
      });
    }

  componentDidMount() {
    //this.loadAppinfo();
  }

  render() {
    return <Provider store={store}>
      <Chat/>
    </Provider>
  }
}