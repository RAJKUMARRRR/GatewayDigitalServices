import axios from 'axios';
import {BASE_URL} from './servicesUrls';
import store from '../store/store';
import {showProgress, stopProgress} from '../store/common/actions';
import {processErrorObject} from '../utils/errorHandler';

const dispatch = store.dispatch;

const getHeader = () => {
  return {
    authorization: 'Bearer ' + store.getState().profile.authToken,
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
    alert(err.message);
    return Promise.reject(err);
  },
);

export default axiosInstance;
