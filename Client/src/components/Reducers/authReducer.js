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
    USERNAME_TAKEN,
    USERNAME_AVAILABLE,

    //  profile update delete
    DELETE_PROFILE_SUCCESS,
    DELETE_PROFILE_FAIL,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    PROFILE_LOADED,
    PROFILE_FAILED,
    CREATE_PROFILE_SUCCESS,
    CREATE_PROFILE_FAIL,
} from '../Actions/types';
import cookie from 'react-cookies';




const initialState = {
    token: cookie.load('token'),
    isAuthenticated: false,
    isLoading: false,
    isLoggedIn: false,
    isDeleted: false,
   // isRegistered: false,
    isUpdate: false,
    user: null,

    //usernameTaken: false,

    //profile
    profileUpdate: false,
    profileUpdateFail: false,
    profile_loaded:false,
    profile_fail:false,
    profile_record: null,
   // profile_added_success:false,
    profileDeleteSuccess: false,
    profileDeleteFail: false,
    profile:null,

}

export default function (state = initialState, action) {
    switch (action.type) {

        case "GET_LAST_PROFILE_RECORD":
            return {
                ...state,
                profile:action.payload,
        }
        case "GET_LAST_PROFILE_RECORD_ERR":
            return{
                ...state
            }

        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case USER_LOADED:
            return {
                 ...state,
                 isAuthenticated:true,
                 user:action.payload,
                 isLoading:false
            };
        case LOGIN_SUCCESS:
            cookie.save('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
                isDeleted: false,
                isUpdate: false
        };
        case UPDATE_SUCCESS:
            return {
                 ...state,
                isUpdate: true
             }
        case UPDATE_FAIL:
             return {
                ...state,
                isUpdate: false
            }
         case DELETE_SUCCESS:
            cookie.remove('token');
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isRegistered: false,
                isLoading: false,
                isDeleted: true,
        };
        case DELETE_FAIL:
            return {
                ...state,
                isDeleted: false,
            }

         //profile!   
         case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                profileUpdate: true,
                profileUpdateFail: false
            }
        case UPDATE_PROFILE_FAIL:
             return {
            ...state,
            profileUpdate: false,
            profileUpdateFail: true
        }
        case DELETE_PROFILE_FAIL:
            return {
                ...state,
                profileDeleteSuccess: false,
                profileDeleteFail: true
            }
        case DELETE_PROFILE_SUCCESS:
            return {
                ...state,
                profileDeleteSuccess: true,
                profileDeleteFail: false
            }
        case PROFILE_LOADED:
            return{
                ...state,
                profile:action.payload,
                profile_loaded:true
            }
        case PROFILE_FAILED:
            return{
             ...state,
            profile:null,
            profile_loaded:false
        }
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
            cookie.remove('token');
                return {
                ...state,
                token: null,
                profile:null,
                user: null,
                isAuthenticated: false,
                isLoading: false,
                profile_loaded:false
            };

        default:
        return state
    }
}
