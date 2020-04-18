import {
    REGISTER_SUCCESS, REGISTER_FAIL,
    USERNAME_AVAILABLE, USERNAME_TAKEN, 
    CREATE_PROFILE_FAIL, CREATE_PROFILE_SUCCESS 
} from "../Actions/types";

const initialState ={
    isRegistered: false,
    usernameTaken: false,
    profile_added_success:false,
}

export default function (state = initialState, action) {
    switch (action.type) {
        
    case REGISTER_SUCCESS:
        return{
         ...state,
         ...action.payload,
         isRegistered:true,    
        }
    case REGISTER_FAIL:
        return{
            ...state,
            isRegistered:false,
    }
    case USERNAME_AVAILABLE:
        return{
            ...state,
            usernameTaken:false,
        }
    case USERNAME_TAKEN:
        return{
            ...state,
            usernameTaken:true
        }
     ///profile
     case CREATE_PROFILE_SUCCESS:
        return{
            ...state,
            profile_added_success:true,
    }   
    //Profile failure
    case CREATE_PROFILE_FAIL:
        return{
        ...state,
        profile_added_success:false,
    }
    default:
        return state
    }
}

