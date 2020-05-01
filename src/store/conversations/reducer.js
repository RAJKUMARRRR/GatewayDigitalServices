import {
  FETCH_CONVERSATIONS_START,
  FETCH_CONVERSATIONS_SUCCESS,
  FETCH_CONVERSATIONS_FAILED,
} from './actionTypes';

const initialData = {
    conversations: [],
    loading: false,
    error: null,
  },
  loadingConversationsStart = (state, action) => {
    return {
      ...state,
      loading: true,
    };
  },
  loadingConversationsSuccess = (state, action) => {
    return {
      ...state,
      loading: false,
      conversations: action.conversations || [],
    };
  },
  loadingConversationsFailed = (state, action) => {
    return {
      ...state,
      loading: false,
    };
  },
  reducer = (state = initialData, action) => {
    switch (action.type) {
      case FETCH_CONVERSATIONS_START:
        return loadingConversationsStart(state, action);
      case FETCH_CONVERSATIONS_SUCCESS:
        return loadingConversationsSuccess(state, action);
      case FETCH_CONVERSATIONS_FAILED:
        return loadingConversationsFailed(state, action);
    }
    return state;
  };

export default reducer;
