import axios from 'axios';
import { returnErrors} from './errorAction';
import cookie from 'react-cookies';
import {
    //Account
    USER_LOADED, USER_LOADING, AUTH_ERROR,
    LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS,
    UPDATE_SUCCESS,  UPDATE_FAIL, DELETE_FAIL,
    DELETE_SUCCESS,
    DELETE_PROFILE_SUCCESS, DELETE_PROFILE_FAIL, UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,PROFILE_LOADED, PROFILE_FAILED,
} from './types';

//header
const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};
//get last record
export const getLastRecord = () => dispatch =>{

    axios.get('http://localhost:5000/lastRecord')
    .then(data => dispatch({
        type:'GET_LAST_PROFILE_RECORD',
        payload:data.data[0]
    }))
    .catch(err =>{
    dispatch(returnErrors(err.response.data, err.response.status, "CREATE_PROFILE_FAIL"));
    dispatch({
        type:"GET_LAST_PROFILE_RECORD_ERR",
        });
    });
 }
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
//delete an account
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
//update an account
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
//delete a profile
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
//update a profile
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