import {
  SEND_MESSAGE,
  SEND_MESSAGE_SUCCESS,
  SEND_MEDIA_START,
  SEND_MEDIA_SUCCESS,
  SEND_MEDIA_FAILED,
  FETCH_CHAT_START,
  FETCH_CHAT_SUCCESS,
  SEND_MESSAGE_FAILED,
} from './actionTypes';
import {
  MESSAGES_URL,
  SEND_MEDIA_URL,
  SEND_MESSAGE_URL,
} from '../../data/servicesUrls';
import RNFS from 'react-native-fs';
import {getRequest, postRequest} from '../../data/services';

export const sendMessageStart = message => {
  return {
    type: SEND_MESSAGE,
    message,
  };
};

const sendMessageHelper = msg => {
  return postRequest(SEND_MESSAGE_URL, msg);
};

export const sendMessage = message => {
  return dispatch => {
    dispatch(sendMessageStart(message));
    sendMessageHelper(message)
      .then(res => {
        dispatch(sendMessageSuccess(res.data));
      })
      .catch(error => {
        dispatch(sendMessageFailed(error.message));
      });
  };
};

export const sendMessageSuccess = message => {
  return {
    type: SEND_MESSAGE_SUCCESS,
    message,
  };
};

export const sendMessageFailed = message => {
  return {
    type: SEND_MESSAGE_FAILED,
    message,
  };
};

export const sendMedia = (media, userId, conversationId) => {
  return dispatch => {
    let msg = {
      id: new Date().getTime(),
      message: '',
      messageStatus: 'PENDING',
      messageType: 'MEDIA',
      userId: userId,
      conversationId: conversationId,
      messageSource: 'USER',
      systemMessage: null,
      media: {
        mediaType: 'IMAGE',
        sourceUrl: media.uri,
        filename: 'image',
      },
    };
    dispatch(sendMediaStart(msg));
    RNFS.readFile(media.path, 'base64')
      .then(base64 => {
        postRequest(SEND_MEDIA_URL, {
          base64: 'data:image/png;base64,' + base64,
        })
          .then(res => {
            let oldId = msg.id,
              oldUrl = msg.media.sourceUrl;
            msg.media.sourceUrl = res.data.secure_url;
            msg.messageStatus = 'RECEIVED';
            delete msg.id;
            sendMessageHelper(msg)
              .then(res => {
                dispatch(
                  sendMediaSuccess({
                    prevId: oldId,
                    createdAt: res.data.createdAt,
                    messageStatus: res.data.messageStatus,
                  }),
                );
              })
              .catch(err => {
                dispatch(sendMediaFailed(err.message));
              });
          })
          .catch(err => alert('Error:' + JSON.stringify(err)));
      })
      .catch(error => {
        alert(error);
      });
  };
};

export const sendMediaStart = message => {
  return {
    type: SEND_MEDIA_START,
    message,
  };
};

export const sendMediaSuccess = data => {
  return {
    type: SEND_MEDIA_SUCCESS,
    data,
  };
};

export const sendMediaFailed = message => {
  return {
    type: SEND_MEDIA_FAILED,
    message,
  };
};

export const loadMessagesStart = () => {
  return {
    type: FETCH_CHAT_START,
  };
};

export const loadMessagesSuccess = messages => {
  return {
    type: FETCH_CHAT_SUCCESS,
    messages,
  };
};

export const loadMessagesFailed = error => {
  return {
    type: FETCH_CHAT_SUCCESS,
    error,
  };
};

export const loadMessages = conversationId => {
  return dispatch => {
    dispatch(loadMessagesStart());
    getRequest(MESSAGES_URL + '?conversationId=' + conversationId)
      .then(response => {
        dispatch(loadMessagesSuccess(response.data));
      })
      .catch(error => {
        dispatch(loadMessagesFailed(error.message));
      });
  };
};
