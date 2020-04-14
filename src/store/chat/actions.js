import { SEND_MESSAGE, SEND_MESSAGE_SUCCESS, SEND_MEDIA_START, SEND_MEDIA_SUCCESS, SEND_MEDIA_FAILED, FETCH_CHAT_START, FETCH_CHAT_SUCCESS, SEND_MESSAGE_FAILED } from "./actionTypes"
import { CHAT, BASE_URL } from '../../../api';
import RNFS from 'react-native-fs';

export const sendMessageStart = (message) => {
    return {
        type: SEND_MESSAGE,
        message
    }
}


const sendMessageHelper = (msg)=>{
    return  fetch(CHAT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(msg),
      });
}

export const sendMessage = (message)=>{
    return (dispatch)=>{
        dispatch(sendMessageStart(message));
        sendMessageHelper(message)
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

export const sendMedia = (media,userId,conversationId)=>{
    return (dispatch)=>{
        let msg = {
            "id": (new Date()).getTime(),
            "message": "",
            "messageStatus": "PENDING",
            "messageType": "MEDIA",
            "userId": userId,
            "conversationId": conversationId,
            "media":{
                "mediaTye":"IMAGE",
                "sourceUrl":media.uri,
                "filename":"image"
            }
        };
        dispatch(sendMediaStart(msg));
        RNFS.readFile(media.path, 'base64')
        .then(base64=>{
            fetch(BASE_URL +  '/upload',{
                method:'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body:JSON.stringify({
                      base64: "data:image/png;base64,"+base64
                  })
            }).then(res=>res.json())
            .then(res=>{
                let oldId = msg.id,oldUrl=msg.media.sourceUrl;
                msg.media.sourceUrl = res.secure_url;
                msg.messageStatus = "RECEIVED";
                delete msg.id;
                sendMessageHelper(msg)
                .then((res)=>{
                    dispatch(sendMediaSuccess({
                        prevId: oldId,
                        createdAt:res.createdAt,
                        messageStatus: res.messageStatus
                    }));    
                })
                .catch((err)=>{
                    dispatch(sendMediaFailed(err));
                });
            })
            .catch(err=>alert("Error:"+JSON.stringify(err)));    

        })
        .catch(error=>{
            alert(error)
        });
     }
}

export const sendMediaStart = (message) => {
    return {
        type: SEND_MEDIA_START,
        message
    }
}

export const sendMediaSuccess = (data) => {
    return {
        type: SEND_MEDIA_SUCCESS,
        data
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