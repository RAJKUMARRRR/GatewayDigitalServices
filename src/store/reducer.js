import { combineReducers } from 'redux';
import chatReducer from './chat/reducer';
import profileReducer from './profile/reducer';
import commonReducer from './common/reducer';

export default combineReducers({chat:chatReducer,profile:profileReducer,common:commonReducer});