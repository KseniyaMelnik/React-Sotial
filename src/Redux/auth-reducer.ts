import {Dispatch} from "redux";
import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {AppActionsType, AppThunkType} from "./redux-store";

const SET_USER_DATE = 'SET_USER_DATE';


type authReducerType = {
    userId: string|null,
    email: string|null,
    login: string|null,
    isAuth: boolean,
}
let initialState: authReducerType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
};

const authReducer = (state = initialState, action: AppActionsType):authReducerType  => {

    switch (action.type) {
        case SET_USER_DATE:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

export const setAuthUserData = (userId: string|null, email: string|null, login: string|null, isAuth: boolean) => ({type: SET_USER_DATE, payload: {userId: userId, email, login, isAuth} } as const)

export const getAuthUserData = ():AppThunkType=>(dispatch)=> {
    return authAPI.me()
        .then(response => {
            if (response.data.resultCode === 0) {
                let {id, login, email } = response.data.data
                dispatch(setAuthUserData(id, email, login, true));
            }
        });
}


export const login = (email: string, password: string, rememberMe: boolean):AppThunkType=>(dispatch: Dispatch)=> {

    authAPI.login(email,password,rememberMe)
        .then(response => {
            if (response.data.resultCode === 0) {
                //@ts-ignore
                 dispatch(getAuthUserData())
            } else {
                let message =  response.data.messages.length >0 ? response.data.messages[0] : "some error"
                dispatch(stopSubmit("login", {_error: message}))
            }
        });
}

export const logout = ():AppThunkType=>(dispatch)=> {
    authAPI.logout()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false));
            }
        });
}

export default authReducer;