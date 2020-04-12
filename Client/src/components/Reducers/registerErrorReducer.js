import {REG_CLEAR_ERRORS, REG_GET_ERRORS} from '../Actions/types';

const initialState ={
    msg:{},
    status:null,
    id: null
}

export default function (state = initialState, action){
    switch(action.type){
        case REG_GET_ERRORS:
            return{
                msg: action.payload.msg,
                status:action.payload.status,
                id:action.payload.id
            } 
        case REG_CLEAR_ERRORS:
            return{
                msg:{},
                status:null,
                id:null
            }
            default:
                return state;
        }
}