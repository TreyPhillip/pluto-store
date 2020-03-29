import {
    
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    UPDATE_SUCCESS,
    UPDATE_FAIL,
    DELETE_FAIL,
    DELETE_SUCCESS,

//  profile update delete
    DELETE_PROFILE_SUCCESS,
    DELETE_PROFILE_FAIL ,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL

 //modify accounts
} from '../Actions/types';
import cookie from 'react-cookies';

const initialState = {
    token: cookie.load('token'),
    //isAuthenticated:false,
    isLoading:false,
    isLoggedIn:false,
    isDeleted:false,
    isRegistered:false,
    isUpdate: false,
    user:null,
    //profile
    profileUpdate:false,
    profileUpdateFail:false,

    profileDeleteSuccess:false,
    profileDeleteFail:false
}
export default function(state = initialState, action){
    switch(action.type){
        case USER_LOADING:
            return{
                ...state,
                isLoading:true
            }
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated:true,
                isLoading:false,
                user:action.payload
            } 
        case LOGIN_SUCCESS:
            cookie.save('token', action.payload.token);
            return{
                ...state,
                ...action.payload,
                isAuthenticated:true,
                isLoading:false,
                isDeleted:false,
                isUpdate:false
            };
        case REGISTER_SUCCESS:
           return{
               ...state,
               ...action.payload,
               isRegistered:true,
           }
        case UPDATE_SUCCESS:
           return{
               ...state,
               isUpdate:true
           }
        case UPDATE_FAIL:
            return{
                ...state,
                isUpdate:false
            }
        case DELETE_SUCCESS:
            cookie.remove('token');
            return{
                ...state,
                token:null,
                user:null,
                isAuthenticated:false,
                isRegistered:false,
                isLoading:false,
                isDeleted:true,
            };
        case DELETE_FAIL:
            return{
            ...state,
            isDeleted:false,
        }
        //profile actions
        case UPDATE_PROFILE_SUCCESS:
            return{
            profileUpdate:true,
            profileUpdateFail:false
        }
        case UPDATE_PROFILE_FAIL:
            return{
             profileUpdate:false,
             profileUpdateFail:true
        }
        case DELETE_PROFILE_FAIL:
            return{
                profileDeleteSuccess:false,
                profileDeleteFail: true
        }
        case DELETE_PROFILE_SUCCESS:
            return{ 
                profileDeleteSuccess:true,
                profileDeleteFail: false
        }
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            cookie.remove('token');
            return{
                ...state,
                token:null,
                user:null,
                isAuthenticated:false,
                isRegistered:false,
                isLoading:false
            };
        default:
          return  state
    }
}