import {
  SEND_OTP_START,
  SEND_OTP_SUCCESS,
  SEND_OTP_FAILED,
  VERIFY_OTP_START,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAILED,
  LOAD_PROFILE_START,
  LOAD_PROFILE_SUCCESS,
  LOAD_PROFILE_FAILED,
  OTP_RECEIVED,
} from './actionTypes';
import {
  SEND_OTP_URL,
  VERIFY_OTP_URL,
  PROFILE_URL,
} from '../../data/servicesUrls';
import {clearStorage} from '../../data/localStore';
import {getRequest, postRequest} from '../../data/services';
import {LOGIN} from '../../constants/screens';
import {navigate} from '../../utils/navigation';

export const sendOTPStart = () => {
  return {
    type: SEND_OTP_START,
  };
};

export const sendOTPSuccess = () => {
  return {
    type: SEND_OTP_SUCCESS,
  };
};

export const sendOTPFailed = error => {
  return {
    type: SEND_OTP_FAILED,
    error,
  };
};

export const sendOTP = (data, cb, err) => {
  return dispatch => {
    dispatch(sendOTPStart());
    postRequest(SEND_OTP_URL, data)
      .then(res => {
        cb && cb(res);
        dispatch(sendOTPSuccess());
      })
      .catch(error => {
        err && err(error);
        dispatch(sendOTPFailed(error.message));
      });
  };
};

export const verifyOTPStart = () => {
  return {
    type: VERIFY_OTP_START,
  };
};

export const verifyOTPSuccess = token => {
  return {
    type: VERIFY_OTP_SUCCESS,
    token,
  };
};

export const verifyOTPFailed = error => {
  return {
    type: VERIFY_OTP_FAILED,
    error,
  };
};

export const verifyOTP = (otpRequest, cb) => {
  return dispatch => {
    dispatch(verifyOTPStart());
    postRequest(VERIFY_OTP_URL, otpRequest)
      .then(res => {
        let token = res.data.authToken || '';
        dispatch(verifyOTPSuccess(token));
        cb && cb(res.data);
      })
      .catch(error => {
        if (error.status == 401) {
          alert('Invalid OTP');
          dispatch(verifyOTPFailed('Invalid OTP'));
          return;
        }
        dispatch(verifyOTPFailed(error.message));
      });
  };
};

export const loadProfileStart = () => {
  return {
    type: LOAD_PROFILE_START,
  };
};

export const loadProfileSuccess = profile => {
  return {
    type: LOAD_PROFILE_SUCCESS,
    profile,
  };
};

export const loadProfileFailed = error => {
  return {
    type: LOAD_PROFILE_FAILED,
    error,
  };
};

export const loadProfile = cb => {
  return dispatch => {
    dispatch(loadProfileStart());
    getRequest(PROFILE_URL)
      .then(res => {
        dispatch(loadProfileSuccess(res.data));
        cb && cb(res.data);
      })
      .catch(error => {
        dispatch(loadProfileFailed(error.message));
      });
  };
};

export const otpReceived = otp => {
  return {
    type: OTP_RECEIVED,
    otp,
  };
};

export const logout = () => {
  return dispatch => {
    dispatch(verifyOTPSuccess(null));
    clearStorage();
    navigate(LOGIN, {});
  };
};
