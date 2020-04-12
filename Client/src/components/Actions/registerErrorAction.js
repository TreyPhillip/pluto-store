import {REG_CLEAR_ERRORS, REG_GET_ERRORS} from '../Actions/types';

//Return errors
export const returnRegErrors = ( msg, status,id = null) =>{
    return{
        type:REG_GET_ERRORS,
        payload:{msg,status,id}
    }
}

export const clearRegErrors = () =>{
    return{
        type:REG_CLEAR_ERRORS
    };
};
