import { SEND_OTP_START, SEND_OTP_SUCCESS, SEND_OTP_FAILED } from "./actionTypes";

const initialData = {
    sendingOTP:false,
    sendOTPError:null,
    sendOTPSuccess:false,
    profile: {
        "id": 1,
        "createdAt": "2020-04-12T12:13:23.000+0000",
        "updatedAt": "2020-04-12T12:13:23.000+0000",
        "phone": "8501096987",
        "username": "root",
        "accountStatus": null
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
reducer = (state=initialData,action)=>{
    switch(action.type){
        case SEND_OTP_START: return sendingOTPStart(state,action);
        case SEND_OTP_SUCCESS: return sendOTPSuccess(state,action);
        case SEND_OTP_FAILED: return sendOTPFailed(state,action);
    }
    return state;
}

export default reducer;

