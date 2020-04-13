import { SEND_MESSAGE, SEND_MESSAGE_SUCCESS, SEND_MEDIA_START, SEND_MEDIA_SUCCESS, SEND_MEDIA_FAILED, FETCH_CHAT_START, FETCH_CHAT_SUCCESS, SEND_MESSAGE_FAILED } from "./actionTypes"
import { fetchMessages, sendMessage as sendMessageService } from "./mock_services"
import { CHAT } from '../../../api';

export const sendMessageStart = (message) => {
    return {
        type: SEND_MESSAGE,
        message
    }
}

export const sendMessage = (message)=>{
    return (dispatch)=>{
        dispatch(sendMessageStart(message));
        /*sendMessageService(message)
        .then(res=>{
            dispatch(sendMessageSuccess(message));
        })
        .catch(error=>{
            dispatch(sendMessageFailed)
        });*/

        fetch(CHAT, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
          })
          .then((response) => response.json())
          .then(res=>{
              dispatch(sendMessageSuccess(res));
          }).catch(error=>{
              dispatch(sendMessageFailed(error));
          });
        
    }
}

export const sendMessageSuccess = (message) => {
    return {
        type: SEND_MESSAGE_SUCCESS,
        message
    }
}

export const sendMessageFailed = (message) => {
    return {
        type: SEND_MESSAGE_FAILED,
        message
    }
}

export const sendMediaStart = () => {
    return {
        type: SEND_MEDIA_START
    }
}

export const sendMediaSuccess = (message) => {
    return {
        type: SEND_MEDIA_SUCCESS,
        message
    }
}

export const sendMediaFailed = (message) => {
    return {
        type: SEND_MEDIA_FAILED,
        message
    }
}

export const loadMessagesStart = () => {
    return {
        type: FETCH_CHAT_START
    }
}

export const loadMessagesSuccess = (messages) => {
    return {
        type: FETCH_CHAT_SUCCESS,
        messages
    }
}

export const loadMessagesFailed = (error) => {
    return {
        type: FETCH_CHAT_SUCCESS,
        error
    }
}

export const loadMessages = (conversationId) => {
    return (dispatch) => {
        dispatch(loadMessagesStart());
        /*fetchMessages()
            .then((res) => {
                dispatch(loadMessagesSuccess(res.messages));
            })
            .catch((error) => {
                dispatch(loadMessagesFailed(error));
            });*/
            fetch(CHAT+"?conversationId="+conversationId)
            .then((response) => response.json())
            .then((response) => {
                dispatch(loadMessagesSuccess(response));
            })
            .catch((error) => {
                dispatch(loadMessagesFailed(error));
            });      
    }
}