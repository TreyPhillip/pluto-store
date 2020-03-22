import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';

export default combineReducers({
    error:errorReducer,
    auth:authReducer
});

//combines all the reducers into a single reducer