
import axios from 'axios';
import {returnRegErrors} from './registerErrorAction';
import cookie from 'react-cookies';
import {
    //Account
    REGISTER_FAIL, REGISTER_SUCCESS,
    USERNAME_TAKEN,USERNAME_AVAILABLE,
    //Profile
    CREATE_PROFILE_SUCCESS,
    CREATE_PROFILE_FAIL,
} from './types';

//header
const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};

export const register = (userName, email, password, isverified, profile_id) => dispatch => {
    const data = {
        username: userName,
        emailaddress: email,
        userpassword: password,
        isverified: isverified,
        profileid: profile_id
    }
    axios.post('http://localhost:5000/account/register', data,config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnRegErrors(err.response.data, err.response.status, "REGISTER_FAIL"));
            dispatch({
            type: REGISTER_FAIL
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
        dispatch(returnRegErrors(err.response.data, err.response.status, "USERNAME_TAKEN"));
        dispatch({
            type: USERNAME_TAKEN
        });
    });
};

export const uniqueEmailCheck = (email) => dispatch =>{
    axios.post("http://localhost:5000/account/uniqueEmail", {
        emailaddress:email
    })
    .then(res => dispatch({
        type: "EMAIL_AVAILABLE"
    }))
    .catch(err=>{
        dispatch(returnRegErrors(err.response.data, err.response.status, "EMAIL_TAKEN"));
        dispatch({
            type: "EMAIL_TAKEN"
        });
    })
}



export const createProfile =  (firstName, lastName,phoneNumber) => dispatch =>{

    axios.post('http://localhost:5000/profile/add',{
        firstname:firstName,
        lastname:lastName,
        phonenumber:phoneNumber
    })
    .then(res => dispatch({
        type: CREATE_PROFILE_SUCCESS
    }))  
    .catch(err =>{
    dispatch(returnRegErrors(err.response.data, err.response.status, "CREATE_PROFILE_FAIL"));
    dispatch({
        type:CREATE_PROFILE_FAIL,
        });
    });
};