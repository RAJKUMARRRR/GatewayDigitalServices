import { SEND_OTP_START, SEND_OTP_SUCCESS, SEND_OTP_FAILED } from "./actionTypes"
import { SEND_OTP } from "../../../api"

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
        fetch(SEND_OTP+"?mobile="+mobile)
        .then(res=>{
            dispatch(sendOTPSuccess());
        })
        .catch(error=>{
            dispatch(sendOTPFailed(error))
        });
    }
}