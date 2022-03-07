import {Dispatch} from "redux";
import {profileAPI} from "../api/api";
import {AppActionsType, AppThunkType} from "./redux-store";
import {ProfilePropsType} from "../components/Profile/ProfileContainer";
import {PostType, ProfileType} from "../types/types";
import {stopSubmit} from "redux-form";

type profileReducerType = typeof initialState;

let initialState = {
    posts: [
        {
            id: 1,
            message: 'Hi, how are you',
            likesCount: 5,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQblpU20ze2Vsusvi7MmRwzZYanB0cVwNJHg&usqp=CAU'
        },
        {
            id: 2,
            message: 'It\'s my first post',
            likesCount: 20,
            image: 'https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg'
        }
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: "",
    newPostText: ""
};

const profileReducer = (state = initialState, action: AppActionsType):profileReducerType => {

    switch (action.type) {
        case 'SAMURAI-NETWORK/PROFILE/ADD_POST':
            return {...state,
                posts: [...state.posts, {
                    id: 5,
                    message: action.newPostBody,
                    likesCount: 0,
                    image: 'https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg'
                }],
                newPostText:  ''
            }

        case 'SAMURAI-NETWORK/PROFILE/SET_USER_PROFILE': {
            return {...state,
                profile: action.profile
            }
        }
        case 'SAMURAI-NETWORK/PROFILE/SET_STATUS': {
            return {...state,
                status: action.status
            }
        }
        case 'SAMURAI-NETWORK/PROFILE/DELETE_POST': {
            return {...state,
                posts: state.posts.filter(p=> p.id !== action.id)
            }
        }
        case "SAMURAI-NETWORK/PROFILE/SAVE_PHOTO": {
            //@ts-ignore
            return {...state, profile: {...state.profile, photos: action.photos}}
        }

    }
    return state;
}

export const addPostActionCreator = (newPostBody: string) => ({type: 'SAMURAI-NETWORK/PROFILE/ADD_POST', newPostBody} as const)
export const setStatus = (status: string) => ({type: 'SAMURAI-NETWORK/PROFILE/SET_STATUS', status } as const)
export const setUserProfile = (profile: ProfilePropsType) => ({type: 'SAMURAI-NETWORK/PROFILE/SET_USER_PROFILE', profile } as const)
export const deletePost = (id: number)=> ({type: 'SAMURAI-NETWORK/PROFILE/DELETE_POST', id} as const)
export const savePhotoSuccess = (photos: any) => ({type: 'SAMURAI-NETWORK/PROFILE/SAVE_PHOTO', photos} as const)

export const getUserProfile = (userID: string) => async (dispatch: Dispatch) => {
    let response = await profileAPI.getProfile(userID)
        dispatch(setUserProfile(response.data))
}
export const getStatus = (userID: string):AppThunkType => async (dispatch) => {
    let response = await profileAPI.getStatus(userID)
        dispatch(setStatus(response.data))
 }

export const updateStatus = (status: string):AppThunkType => async (dispatch) => {
    let response = await profileAPI.updateStatus(status)
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status))
            }
}

export const savePhoto = (file: any):AppThunkType => async (dispatch) => {
    let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}

export const saveProfile = (profile: any):AppThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId
    let response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === 0) {
        userId && dispatch(getUserProfile(userId))
    } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "some error"
        dispatch(stopSubmit("profileData", {_error: message}))
        return Promise.reject(message);
    }
}

export default profileReducer;