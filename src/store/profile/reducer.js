import { SEND_OTP_START, SEND_OTP_SUCCESS, SEND_OTP_FAILED, VERIFY_OTP_START, VERIFY_OTP_SUCCESS, VERIFY_OTP_FAILED, LOAD_PROFILE_START, LOAD_PROFILE_SUCCESS, LOAD_PROFILE_FAILED } from "./actionTypes";
import localStore from '../../data/localStore';

const initialData = {
    sendingOTP:false,
    sendOTPError:null,
    sendOTPSuccess:false,
    verifyingOTP:false,
    verifyOTPError:null,
    verifyOTPSuccess:false,
    authToken:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4NTAxMDk2OTg3IiwiZXhwIjoxNTg4MDY5Mzc1fQ.9HZ40dl0DkftS1vTPRhlSQpBEIBWuuamLwUYe18HyDqEf1KVHZBVB85bS-tdkFmi34Y8zuRFbcxMKZ_uJ4TjSA',
    profile: null,
    loading:false,
    error: null
},
loadProfileStart = (state,action)=>{
    return {
        ...state,
        loading:true
    }
},
loadProfileSuccess = (state,action)=>{
    return {
        ...state,
        loading:false,
        error:null,
        profile:action.profile
    }
},
loadProfileFailed = (state,action)=>{
    return {
        ...state,
        loading:false,
        profile:null,
        error:action.error
    }
},
sendingOTPStart = (state,action)=>{
    return {
        ...state,
        sendingOTP: true
    }
},
sendOTPSuccess = (state,action)=>{
    return {
        ...state,
        sendingOTP:false,
        sendOTPSuccess:true,
        sendOTPError:null
    }
},
sendOTPFailed = (state,action)=>{
    return {
        ...state,
        sendingOTP:false,
        sendOTPSuccess:false,
        sendOTPError:action.error
    }
},
verifyingOTPStart = (state,action)=>{
    return {
        ...state,
        verifyingOTP: true
    }
},
verifyOTPSuccess = (state,action)=>{
    localStore.setItem("authToken",action.token);
    return {
        ...state,
        verifyingOTP:false,
        verifyOTPSuccess:true,
        verifyOTPError:null,
        authToken: action.token
    }
},
verifyOTPFailed = (state,action)=>{
    return {
        ...state,
        verifyingOTP:false,
        verifyOTPSuccess:false,
        verifyOTPError:action.error
    }
},
reducer = (state=initialData,action)=>{
    switch(action.type){
        case SEND_OTP_START: return sendingOTPStart(state,action);
        case SEND_OTP_SUCCESS: return sendOTPSuccess(state,action);
        case SEND_OTP_FAILED: return sendOTPFailed(state,action);
        case VERIFY_OTP_START: return verifyingOTPStart(state,action);
        case VERIFY_OTP_SUCCESS: return verifyOTPSuccess(state,action);
        case VERIFY_OTP_FAILED: return verifyOTPFailed(state,action);
        case LOAD_PROFILE_START: return loadProfileStart(state,action);
        case LOAD_PROFILE_SUCCESS: return loadProfileSuccess(state,action);
        case LOAD_PROFILE_FAILED: return loadProfileFailed(state,action);
    }
    return state;
}

export default reducer;

