import { act } from "react-test-renderer"
import { FETCH_CHAT_START, FETCH_CHAT_SUCCESS, FETCH_CHAT_FAILED, SEND_MEDIA, SEND_MEDIA_SUCCESS, SEND_MEDIA_FAILED, SEND_MEDIA_START, SEND_MESSAGE, SEND_MESSAGE_SUCCESS, SEND_MESSAGE_FAILED } from "./actionTypes"

const initialData = {
    messages:[],
    sendingMedia:false,
    sendingMessage:false,
    messageSendSuccess: false,
    messageSendFailed: false,
    mediaSendSuccess: false,
    mediaSendFailed: false,
    loading:false,
    error:null
},

sendingMessage = (state,action)=>{
    return {
        ...state,
       // messages: [...state.messages,{...action.message,createdAt:new Date()}],
        sendingMessage:true
    }
},

sendingMessageSuccess = (state,action)=>{
    return {
        ...state,
        sendingMessage:false,
        sendingMessageSuccess:true,
        sendingMessageFailed:false,
        messages: [...state.messages,action.message],
    }
},

sendingMessageFailed = (state,action)=>{
    return {
        ...state,
        sendingMessage:false,
        sendingMessageSuccess:false,
        sendingMessageFailed:true
    }
},

sendingMedia = (state,action)=>{
    return {
        ...state,
        sendingMedia:true,
        messages:[...state.messages,action.message]
    }
},

sendingMediaSuccess = (state,action)=>{
    const newMessages = [...state.messages],
    ind = newMessages.findIndex(msg=>msg.id==action.data.prevId)
    newMessages[ind] = {
        ...newMessages[ind],
        createdAt: action.data.createdA,
        messageStatus: action.data.messageStatus
    }
    return {
        ...state,
        sendingMedia:false,
        sendingMediaSuccess:true,
        sendingMediaFailed:false,
        messages:newMessages
    }
},

sendingMediaFailed = (state,action)=>{
    return {
        ...state,
        sendingMedia:false,
        sendingMediaSuccess:false,
        sendingMediaFailed:true
    }
},

loadingMessagesStart = (state,action)=>{
    return {
        ...state,
        loading:true
    }
},

loadingMessagesSuccess = (state,action)=>{
    return {
        ...state,
        loading:false,
        messages: action.messages
    }
},

loadingMessagesFailed = (state,action)=>{
    return {
        ...state,
        loading:false
    }
},

reducer = (state=initialData,action)=>{
    switch(action.type){        
        case FETCH_CHAT_START: return loadingMessagesStart(state,action);
        case FETCH_CHAT_SUCCESS: return loadingMessagesSuccess(state,action);
        case FETCH_CHAT_FAILED: return loadingMessagesFailed(state,action);
        case SEND_MEDIA_START: return sendingMedia(state,action);
        case SEND_MEDIA_SUCCESS: return sendingMediaSuccess(state,action);
        case SEND_MEDIA_FAILED: return sendingMediaFailed(state,action);
        case SEND_MESSAGE: return sendingMessage(state,action);
        case SEND_MESSAGE_SUCCESS: return sendingMessageSuccess(state,action);
        case SEND_MESSAGE_FAILED: return sendingMessageFailed(state,action);
    }
    return state;
}

export default reducer;