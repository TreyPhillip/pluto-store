import {
    combineReducers
} from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import accountReducer from './accountRegisterReducer';
import registerErrorReducer from './registerErrorReducer';

export default combineReducers({
    error: errorReducer,
    auth: authReducer,
    reg: accountReducer,
    reg_err:registerErrorReducer,
});

//combines all the reducers into a single reducer