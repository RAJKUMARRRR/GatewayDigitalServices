import {
  SHOW_PROGRESS,
  STOP_PROGRESS,
  UPDATE_CURRENT_SCREEN,
} from './actionTypes';
import {CONVERSATIONS} from '../../constants/screens';

const initialData = {
    showProgress: false,
    currentScreen: CONVERSATIONS,
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
  updateCurrentScreen = (state, action) => {
    return {
      ...state,
      currentScreen: action.screen.name,
    };
  },
  reducer = (state = initialData, action) => {
    switch (action.type) {
      case SHOW_PROGRESS:
        return showProgress(state, action);
      case STOP_PROGRESS:
        return stopProgress(state, action);
      case UPDATE_CURRENT_SCREEN:
        return updateCurrentScreen(state, action);
    }
    return state;
  };

export default reducer;
