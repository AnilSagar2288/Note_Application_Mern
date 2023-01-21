import {USER_LOGIN_REQUEST,USER_LOGIN_SUCCESS,USER_LOGIN_FAILED, USER_LOGOUT, USER_REGISTRATION_REQUEST, USER_REGISTRATION_SUCCESS, USER_REGISTRATION_FAIL, USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS, USER_PROFILE_FAIL} from '../constants/userConstant'

export const userLoginReducer = (state={}, action)=>{
    switch (action.type) {
        case USER_LOGIN_REQUEST: 
            return {loading: true};
        case USER_LOGIN_SUCCESS:
            return {loading: false, userInfo:action.payload};
        case USER_LOGIN_FAILED:
            return {loading: false, error:action.payload};
        case USER_LOGOUT:
            return {};    
        default:
            return state;
    }
}


export const userRegistrationReducer =(state ={}, action)=>{
    switch (action.type) {
        case USER_REGISTRATION_REQUEST:
            return {loading: true};
        case USER_REGISTRATION_SUCCESS:
            return {loading:false, userInfo:action.payload}
        case USER_REGISTRATION_FAIL:
            return {loading:false, error:action.payload}    
        default:
            return state;
    }
}


export const userProfileReducer =(state ={}, action)=>{
    switch (action.type) {
        case USER_PROFILE_REQUEST:
            return {loading: true};
        case USER_PROFILE_SUCCESS:
            return {loading:false, userInfo:action.payload, success: true}
        case USER_PROFILE_FAIL:
            return {loading:false, error:action.payload, success: false}    
        default:
            return state;
    }
}

