import {PostPropsType} from "../components/Profile/MyPosts/Post/Post";
import {Dispatch} from "redux";
import {profileAPI} from "../api/api";
import {AppActionsType, AppThunkType} from "./redux-store";
import {ProfilePropsType} from "../components/Profile/ProfileContainer";

type PostType = {
    id: number,
    message: string,
    likesCount: number,
    image: string
}

 type ProfileType =  {
    aboutMe: string;
    contacts : {
        facebook: string | null,
        website: string | null,
        vk: string | null,
        twitter: string | null,
        instagram: string | null,
        youtube: string | null,
        mainLink: string | null,
        github: string | null,
    },
    fullName: string,
    lookingForAJob: boolean,
    photos: {
        small: string,
        large: string
    }
    userId: number
    lookingForAJobDescription: string
}

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

    }
    return state;
}

export const addPostActionCreator = (newPostBody: string) => ({type: 'SAMURAI-NETWORK/PROFILE/ADD_POST', newPostBody} as const)
export const setStatus = (status: string) => ({type: 'SAMURAI-NETWORK/PROFILE/SET_STATUS', status } as const)
export const setUserProfile = (profile: ProfilePropsType) => ({type: 'SAMURAI-NETWORK/PROFILE/SET_USER_PROFILE', profile } as const)
export const deletePost = (id: number)=> ({type: 'SAMURAI-NETWORK/PROFILE/DELETE_POST', id} as const)

export const getUserProfile = (userID: string) => (dispatch: Dispatch) => {
    profileAPI.getProfile(userID).then(response => {
        dispatch(setUserProfile(response.data))
    });
}
export const getStatus = (userID: string):AppThunkType => (dispatch) => {
    profileAPI.getStatus(userID)
        .then(response => {
        dispatch(setStatus(response.data))
    });
}

export const updateStatus = (status: string):AppThunkType => (dispatch) => {
    profileAPI.updateStatus(status)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status))
            }
        });
}

export default profileReducer;