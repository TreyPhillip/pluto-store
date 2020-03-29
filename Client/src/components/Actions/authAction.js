import axios from 'axios';
import {returnErrors} from './errorAction';
import cookie from 'react-cookies';
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
    DELETE_PROFILE_SUCCESS,
    DELETE_PROFILE_FAIL,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL
} from './types';
import { useRouteMatch } from 'react-router';

//Check Token
export const loadUser = () => (dispatch, getState) =>{
    //User loading
    dispatch({type:USER_LOADING});
    //get token from cookie
        const token = getState().auth.token;

        axios.post("http://localhost:5000/checkToken",{
            tokenString:token
        })
        .then(res => dispatch({
            type:USER_LOADED,
            payload: res.data
        }))
        .catch(err =>{
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type:AUTH_ERROR,        
            });
        })
}
//login the user
export const login = (email,password) => dispatch =>{

    axios.post("http://localhost:5000/authentication",{
        emailaddress: email,
        userpassword: password
      })
      .then(res => dispatch({
         type:LOGIN_SUCCESS,
         payload:res.data
      }))
      .catch(err =>{
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
            type:LOGIN_FAIL,        
        });
    })}
//Logout the user
export const logout = () =>{
    return{
        type:LOGOUT_SUCCESS
    };
};
export const register = (userName, email, password, isverified, profile_id) => dispatch =>{

    console.log(profile_id);
    axios.post('http://localhost:5000/account/register', {
        username: userName,
        emailaddress: email,
        userpassword: password,
        isverified: isverified,
        profileid: profile_id
    }).then(res => dispatch({
        type:REGISTER_SUCCESS,
        payload: res.data
    }))
    .catch(err =>{
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
            type:REGISTER_FAIL
        })
    })
}
export const deleteAccount = (account_id) => dispatch =>{
    
    const headers = {
        'Authorization': 'Bearer paperboy'
      };
      const data = {
        accountid: account_id
      };


    axios.delete('http://localhost:5000/account/delete',{headers,data})
    .then(res => dispatch({
        type:DELETE_SUCCESS
    }))
    .catch(err =>{
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
            type:DELETE_FAIL
        })
    })
}

export const updateAccount = (username,userpassword,emailaddress,isverified, profile_id) =>dispatch =>{
    axios.put('http://localhost:5000/account/update',{
        username: username,
        userpassword:userpassword,
        emailaddress:emailaddress,
        isverified:isverified,
        profileid:profile_id
    })
    .then(res =>dispatch({
        type:UPDATE_SUCCESS      
    }))
    .catch(err=>{
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
            type:UPDATE_FAIL
        })
    })
}

//profile actions
export const deleteProfile = (profile_id) => dispatch =>{
    axios.delete('http://localhost:5000/profile/delete',{
        profileid:profile_id
    })
    .then(res => dispatch({
        type:DELETE_PROFILE_SUCCESS
    }))
    .catch(err =>{
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
            type:DELETE_PROFILE_FAIL
        })
    })
}


export const updateProfile = (firstname, lastname , phonenumber, profile_id) => dispatch =>{
    axios.put('http://localhost:5000/profile/update',{
        firstname:firstname,
        lastname:lastname,
        phonenumber:phonenumber,
        profileid:profile_id
    })
    .then(res => dispatch({
        type:UPDATE_PROFILE_SUCCESS
    }))
    .catch(err=>{
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
            type:UPDATE_PROFILE_FAIL
        })
    })
}