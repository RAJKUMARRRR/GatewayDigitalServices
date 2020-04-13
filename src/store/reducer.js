import { combineReducers } from 'redux';
import chatReducer from './chat/reducer';
import profileReducer from './profile/reducer';

export default combineReducers({chat:chatReducer,profile:profileReducer});