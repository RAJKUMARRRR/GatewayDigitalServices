import axios from 'axios';
import {BASE_URL} from './servicesUrls';
import store from '../store/store';
import {showProgress, stopProgress} from '../store/common/actions';
import {processErrorObject} from '../utils/errorHandler';
import {logout} from '../store/profile/actions';
import {LOGIN, OTP} from '../constants/screens';
import {Alert} from 'react-native';

const dispatch = store.dispatch;
const expiredToken =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4NTAxMDk2OTg3IiwiZXhwIjoxNTg4MDY5Mzc1fQ.9HZ40dl0DkftS1vTPRhlSQpBEIBWuuamLwUYe18HyDqEf1KVHZBVB85bS-tdkFmi34Y8zuRFbcxMKZ_uJ4TjSA';

const getHeader = () => {
  return {
    authorization: store.getState().profile.authToken
      ? 'Bearer ' + store.getState().profile.authToken
      : null,
    accept: 'application/json',
    'content-type': 'application/json',
  };
};

const axiosInstance = axios.create({
  //baseURL: BASE_URL,
  headers: getHeader(),
});

axiosInstance.interceptors.request.use(
  req => {
    dispatch(showProgress());
    req.headers = getHeader();
    console.log('Request:', req);
    return req;
  },
  err => {
    console.log('RequestError:', err);
    return Promise.reject(err);
  },
);

axiosInstance.interceptors.response.use(
  res => {
    dispatch(stopProgress());
    console.log('Response:', res);
    return res;
  },
  err => {
    dispatch(stopProgress());
    console.log('ResponseError:', err);
    err = processErrorObject(err);
    //todo expires token
    const currentScreen = store.getState().common.currentScreen;
    if (
      err.status == '401' &&
      (currentScreen != LOGIN || currentScreen != OTP)
    ) {
      Alert.alert(
        'Session Expired',
        'Your session has expired, Please login again.',
      );
      store.dispatch(logout());
    } else {
      Alert.alert('Error', err.message);
      store.dispatch(logout());
    }
    return Promise.reject(err);
  },
);

export default axiosInstance;
