/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chat from './pages/Chat';
import store from './store/store';
import Login from './pages/Login';
import OTP from './pages/OTP';
import Conversations from './pages/Conversations';
import localStore from './data/localStore';
import { verifyOTPSuccess, loadProfile } from './store/profile/actions';
import ProgressBar from './components/ProgressBar';


class MainApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: '',
      options: {}
    }
  }

  componentDidMount() {
    localStore.getItem("authToken")
      .then(token => {
        if (!token) {
          this.setState({
            currentPage: 'login'
          });
        } else {
          this.props.setToken(token);
          this.props.loadProfile((profile)=>{
            this.setState({
                currentPage: profile.role=="ADMIN"?'conversations':'chat',
                options:{
                  conversationId:profile.conversations[0].id
                }
              });
          });
        }
      })
      .catch(error => {
        this.setState({
          currentPage: 'login'
        });
      });
  }

  setCurrentPage = (page, options = {}) => {
    this.setState({
      currentPage: page,
      options
    });
  }
  render() {
    const { currentPage, options } = this.state,
    { showProgress,profile } = this.props
    return <>
      {currentPage == "login" && <Login navigate={this.setCurrentPage} {...options} />}
      {currentPage == "otp" && <OTP navigate={this.setCurrentPage} {...options} />}
      {currentPage == "chat" && <Chat navigate={this.setCurrentPage} {...options} />}
      {currentPage == "conversations" && <Conversations navigate={this.setCurrentPage} {...options} />}
      {showProgress && <ProgressBar/>}
    </>
  }
}

const mapStateToProps = state => ({
    showProgress: state.common.showProgress,
    profile: state.profile.profile
});

const mapDispatchToProps = dispatch => ({
  setToken: (token)=>dispatch(verifyOTPSuccess(token)),
  loadProfile: (cb)=>dispatch(loadProfile(cb))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainApp);