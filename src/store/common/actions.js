import {
  SHOW_PROGRESS,
  STOP_PROGRESS,
  UPDATE_CURRENT_SCREEN,
} from './actionTypes';

export const showProgress = () => ({
  type: SHOW_PROGRESS,
});

export const stopProgress = () => ({
  type: STOP_PROGRESS,
});

export const updateCurrentScreen = screen => ({
  type: UPDATE_CURRENT_SCREEN,
  screen,
});
