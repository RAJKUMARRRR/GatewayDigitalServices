import { SEND_OTP_START, SEND_OTP_SUCCESS, SEND_OTP_FAILED, VERIFY_OTP_START, VERIFY_OTP_SUCCESS, VERIFY_OTP_FAILED, LOAD_PROFILE_START, LOAD_PROFILE_SUCCESS, LOAD_PROFILE_FAILED } from "./actionTypes"
import { SEND_OTP_URL, VERIFY_OTP_URL, PROFILE_URL } from "../../data/servicesUrls"
import axios from 'axios';
import { getRequest, postRequest } from '../../data/services';

export const sendOTPStart = ()=>{
    return {
        type: SEND_OTP_START
    }
}

export const sendOTPSuccess = ()=>{
    return {
        type: SEND_OTP_SUCCESS
    }
}

export const sendOTPFailed = (error)=>{
    return {
        type: SEND_OTP_FAILED,
        error
    }
}

export const sendOTP = (mobile)=>{
    return (dispatch)=>{
        dispatch(sendOTPStart());
        getRequest(SEND_OTP_URL+"?mobile="+mobile)
        .then(res=>{
            dispatch(sendOTPSuccess());
        })
        .catch(error=>{
            dispatch(sendOTPFailed(error))
        });
    }
}




export const verifyOTPStart = ()=>{
    return {
        type: VERIFY_OTP_START
    }
}

export const verifyOTPSuccess = (token)=>{
    return {
        type: VERIFY_OTP_SUCCESS,
        token
    }
}

export const verifyOTPFailed = (error)=>{
    return {
        type: VERIFY_OTP_FAILED,
        error
    }
}

export const verifyOTP = (otpRequest,cb)=>{
    return (dispatch)=>{
        dispatch(verifyOTPStart());
        postRequest(VERIFY_OTP_URL,otpRequest)
        .then(res=>{
            let token = res.data.authToken || '';
            dispatch(verifyOTPSuccess(token));
            cb && cb(res.data);
        })
        .catch(error=>{
            dispatch(verifyOTPFailed(error))
        });
    }
}



export const loadProfileStart = ()=>{
    return {
        type: LOAD_PROFILE_START
    }
}

export const loadProfileSuccess = (profile)=>{
    return {
        type: LOAD_PROFILE_SUCCESS,
        profile
    }
}

export const loadProfileFailed = (error)=>{
    return {
        type: LOAD_PROFILE_FAILED,
        error
    }
}

export const loadProfile = (cb)=>{
    return (dispatch)=>{
        dispatch(loadProfileStart());
        getRequest(PROFILE_URL)
        .then(res=>{
            dispatch(loadProfileSuccess(res.data));
            cb && cb(res.data);
        })
        .catch(error=>{
            dispatch(loadProfileFailed(error))
        });
    }
}
