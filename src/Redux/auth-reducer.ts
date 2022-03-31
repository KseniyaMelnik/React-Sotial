import {Dispatch} from "redux";
import {authAPI, profileAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {AppActionsType, AppThunkType} from "./redux-store";
import {ProfileType} from "../types/types";
import {ProfilePropsType} from "../components/Profile/ProfileContainer";
import {setUserProfile} from "./profile-reducer";


export type AuthReducerType = typeof initialState;

let initialState = {
    userId: null as string|null,
    email: null as string|null,
    login: null as string|null,
    isAuth: false,
    captchaUrl: null as string|null,
    myProfile: null as ProfileType | null
};

const authReducer = (state = initialState, action: AppActionsType):AuthReducerType  => {

    switch (action.type) {
        case 'SAMURAI-NETWORK/AUTH/GET-CAPTCHA-URL-SUCCESS':
        case 'SAMURAI-NETWORK/AUTH/SET_USER_DATE':
        case "SAMURAI-NETWORK/AUTH/SET_MY_PROFILE":
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

export const setAuthUserData = (userId: string|null, email: string|null, login: string|null, isAuth: boolean) => ({type: 'SAMURAI-NETWORK/AUTH/SET_USER_DATE', payload: {userId: userId, email, login, isAuth} } as const)
export const getCaptchaUrlSuccess = (captchaUrl: string) => ({type: 'SAMURAI-NETWORK/AUTH/GET-CAPTCHA-URL-SUCCESS', payload: {captchaUrl}} as const)
export const setMyProfile = (profile: ProfilePropsType) => ({type: 'SAMURAI-NETWORK/AUTH/SET_MY_PROFILE', payload: {profile} } as const)

export const getAuthUserData = (): AppThunkType => async (dispatch) => {
    let response = await authAPI.me()
    if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const getUserProfile = (userID: string) => async (dispatch: Dispatch) => {
    let response = await profileAPI.getProfile(userID)
    dispatch(setUserProfile(response.data))
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string|null = null): AppThunkType => async (dispatch: Dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
        //@ts-ignore
        dispatch(getAuthUserData())
    } else  {
        if (response.data.resultCode === 10){
            //@ts-ignore
            dispatch(getCaptchaUrl())
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "some error"
        dispatch(stopSubmit("login", {_error: message}))
    }
}

export const getCaptchaUrl = (): AppThunkType => async (dispatch: Dispatch) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export const logout = (): AppThunkType => async (dispatch) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}

export default authReducer;