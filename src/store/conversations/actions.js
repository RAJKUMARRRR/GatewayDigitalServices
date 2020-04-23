import {
  FETCH_CONVERSATIONS_START,
  FETCH_CONVERSATIONS_SUCCESS,
  FETCH_CONVERSATIONS_FAILED,
} from './actionTypes';
import {
  CONVERSATIONS_URL,
  MARK_CONVERSATION_URL,
} from '../../data/servicesUrls';
import {getRequest, postRequest} from '../../data/services';

export const loadConversationsStart = () => {
  return {
    type: FETCH_CONVERSATIONS_START,
  };
};

export const loadConversationsSuccess = conversations => {
  return {
    type: FETCH_CONVERSATIONS_SUCCESS,
    conversations,
  };
};

export const loadConversationsFailed = error => {
  return {
    type: FETCH_CONVERSATIONS_FAILED,
    error,
  };
};

export const loadConversations = () => {
  return dispatch => {
    dispatch(loadConversationsStart());
    getRequest(CONVERSATIONS_URL)
      .then(response => {
        dispatch(loadConversationsSuccess(response.data));
      })
      .catch(error => {
        dispatch(loadConversationsFailed(error.message));
      });
  };
};

export const markConversationRead = id => {
  getRequest(MARK_CONVERSATION_URL + '/' + id)
    .then(console.log)
    .catch(console.log);
};
