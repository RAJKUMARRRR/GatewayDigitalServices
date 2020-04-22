import {SHOW_PROGRESS, STOP_PROGRESS} from './actionTypes';

const initialData = {
    showProgress: false,
  },
  showProgress = (state, action) => {
    return {
      ...state,
      showProgress: true,
    };
  },
  stopProgress = (state, action) => {
    return {
      ...state,
      showProgress: false,
    };
  },
  reducer = (state = initialData, action) => {
    switch (action.type) {
      case SHOW_PROGRESS:
        return showProgress(state, action);
      case STOP_PROGRESS:
        return stopProgress(state, action);
    }
    return state;
  };

export default reducer;
