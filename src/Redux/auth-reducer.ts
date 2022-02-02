import {Dispatch} from "redux";
import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {AppActionsType, AppThunkType} from "./redux-store";


export type AuthReducerType = typeof initialState;

let initialState = {
    userId: null as string|null,
    email: null as string|null,
    login: null as string|null,
    isAuth: false,
};

const authReducer = (state = initialState, action: AppActionsType):AuthReducerType  => {

    switch (action.type) {
        case 'SAMURAI-NETWORK/AUTH/SET_USER_DATE':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

export const setAuthUserData = (userId: string|null, email: string|null, login: string|null, isAuth: boolean) => ({type: 'SAMURAI-NETWORK/AUTH/SET_USER_DATE', payload: {userId: userId, email, login, isAuth} } as const)

export const getAuthUserData = (): AppThunkType => async (dispatch) => {
    let response = await authAPI.me()
    if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data
        dispatch(setAuthUserData(id, email, login, true));
    }
}


export const login = (email: string, password: string, rememberMe: boolean): AppThunkType => async (dispatch: Dispatch) => {
    let response = await authAPI.login(email, password, rememberMe)
    if (response.data.resultCode === 0) {
        //@ts-ignore
        dispatch(getAuthUserData())
    } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "some error"
        dispatch(stopSubmit("login", {_error: message}))
    }
}

export const logout = (): AppThunkType => async (dispatch) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}

export default authReducer;