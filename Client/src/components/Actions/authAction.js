import axios from 'axios';
import {
    returnErrors
} from './errorAction';
import cookie from 'react-cookies';
import {
    //Account
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
    //Profile
    DELETE_PROFILE_SUCCESS,
    DELETE_PROFILE_FAIL,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    PROFILE_LOADED,
    PROFILE_FAILED,
    CREATE_PROFILE_SUCCESS,
    CREATE_PROFILE_FAIL,

    //Notifications
    TURNON_LOGIN_NOTIFICATION ,
    TURNOFF_LOGIN_NOTIFICATION ,
    //reg------
    TURNON_REGISTER_NOTIFICATION, 
    TURNOFF_REGISTER_NOTIFICATION ,
    //ANewProduct------
    TURNON_ADDPRODUCT_NOTIFICATION ,
    TURNOFF_ADDPRODUCT_NOTIFICATION ,
    //Update-----
    TURNON_UPDATE_NOTIFICATION ,
    TURNOFF_UPDATE_NOTIFICATION ,
    //Delete-----
    TURNON_DELETE_NOTIFICATION,
    TURNOFF_DELETE_NOTIFICATION, 
  
} from './types';

//header
const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};


//Check Token
export const loadUser = () => (dispatch, getState) => {
  
    //get token from cookie
    const token = getState().auth.token;

    axios.post("http://localhost:5000/checkToken", {
            tokenString: token
        },config)
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status,"AUTH_ERROR"));
            dispatch({
                type: AUTH_ERROR,
            });
        })
};
//login the user
export const login = (email, password) => dispatch => {

    axios.post("http://localhost:5000/authentication", {
            emailaddress: email,
            userpassword: password
        },config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, "LOGIN_FAIL"));
            dispatch({
                type: LOGIN_FAIL,
            });
        })
};
//Logout the user
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    };
};
export const register = (userName, email, password, isverified, profile_id) => dispatch => {

 const data = {
    
    username: userName,
    emailaddress: email,
    userpassword: password,
    isverified: isverified,
    profileid: profile_id
}

    console.log(userName  + email + password + isverified + profile_id)

    axios.post('http://localhost:5000/account/register', data,config)
    
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }),config)
        .catch(err => {
            console.log(err)
            dispatch(returnErrors(err.response.data, err.response.status, "REGISTER_FAIL"));
            dispatch({
                type: REGISTER_FAIL
            })
        })
};
export const deleteAccount = (account_id) => dispatch => {

    const headers = {
        'Authorization': 'Bearer paperboy'
    };
    const data = {
        accountid: account_id
    };


    axios.delete('http://localhost:5000/account/delete', {
            headers,
            data
        })
        .then(res => dispatch({
            type: DELETE_SUCCESS
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status,"DELETE_FAIL"));
            dispatch({
                type: DELETE_FAIL
            })
        })
};
export const updateAccount = (username, userpassword, emailaddress, isverified, profile_id) => dispatch => {
    axios.put('http://localhost:5000/account/update', {
            username: username,
            userpassword: userpassword,
            emailaddress: emailaddress,
            isverified: isverified,
            profileid: profile_id
        }, config)
        .then(res => dispatch({
            type: UPDATE_SUCCESS
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, "UPDATE_FAIL"));
            dispatch({
                type: UPDATE_FAIL
            })
        })
};

//check for unique username
export const uniqueUsernameCheck = (userName) => dispatch => {
    axios.post("http://localhost:5000/account/uniqueUsername", {
        username:userName
    })
    .then(res=> dispatch({
        type:USERNAME_AVAILABLE
    }))
    .catch(err =>{
        dispatch(returnErrors(err.response.data, err.response.status, "USERNAME_TAKEN"));
        dispatch({
            type: USERNAME_TAKEN
        });
    });
};


//profile actions
export const getProfile = (id) => (dispatch) =>{
    axios.post('http://localhost:5000/profile/',{
        id:id}, config)
    .then(res => dispatch({
        type:PROFILE_LOADED,
        payload:res.data
    }))
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status, "PROFILE_FAILED"));
        dispatch({
            type:PROFILE_FAILED
        });
    })
}
export const createProfile = (firstName, lastName,phoneNumber) => dispatch =>{

    axios.post('http://localhost:5000/profile/add',{
        firstname:firstName,
        lastname:lastName,
        phonenumber:phoneNumber
    })
    .then(res => dispatch({
        type: CREATE_PROFILE_SUCCESS
    }))  
    .catch(err =>{

        console.log(err);
        dispatch(returnErrors(err.response.data, err.response.status, "CREATE_PROFILE_FAIL"));
        dispatch({
            type:CREATE_PROFILE_FAIL,
        });
    });
}
export const deleteProfile = (profile_id) => dispatch => {
    axios.delete('http://localhost:5000/profile/delete', {
            profileid: profile_id
        },config)
        .then(res => dispatch({
            type: DELETE_PROFILE_SUCCESS
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, "DELETE_PROFILE_FAIL"));
            dispatch({
                type: DELETE_PROFILE_FAIL
            })
        })
}
export const updateProfile = (firstname, lastname, phonenumber, profile_id) => dispatch => {
    axios.put('http://localhost:5000/profile/update', {
            firstname: firstname,
            lastname: lastname,
            phonenumber: phonenumber,
            profileid: profile_id
        },config)
        .then(res => dispatch({
            type: UPDATE_PROFILE_SUCCESS
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, "UPDATE_PROFILE_FAIL"));
            dispatch({
                type: UPDATE_PROFILE_FAIL
            })
        })
}