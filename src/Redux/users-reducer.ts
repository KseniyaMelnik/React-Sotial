import {usersAPI} from "../api/api";
import {Dispatch} from "redux";
import {AppActionsType, AppThunkType} from "./redux-store";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE '
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'


export type UserType = {
    id: number,
    photos: {
        small: string,
        large: string
    }
    followed: boolean
    name: string,
    status: string,
    /*location: {
        city: string,
        country: string
    }*/
}

type usersReducerType = {
    users: Array<UserType>
    pageSize: number,
    totalUsersCount: number
    currentPage: number
    isFetching: boolean,
    followingInProgress: number[]
}
let initialState: usersReducerType = {
    users: [],
    pageSize: 100,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
};

const usersReducer = (state = initialState, action: AppActionsType): usersReducerType => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => u.id === action.userID ? {...u, followed: true} : u)
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => u.id === action.userID ? {...u, followed: false} : u)
            }
        case SET_USERS: {
            return { ...state, users: [...action.users]}
        }
        case SET_CURRENT_PAGE: {
            return { ...state,  currentPage: action.currentPage }
        }
        case SET_TOTAL_USERS_COUNT: {
            return { ...state,  totalUsersCount: action.totalUsersCount }
        }
        case TOGGLE_IS_FETCHING : {
            return { ...state,  isFetching: action.isFetching }
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS : {
            return {...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }

        default:
            return state;
    }
}

export const followSuccess = (userID: number) => ({type: FOLLOW, userID: userID} as const)
export const unfollowSuccess = (userID: number) =>
    ({type: UNFOLLOW, userID: userID} as const)
export const setUsers = (users: Array<UserType>) => ({type: SET_USERS, users: users} as const)
export const setCurrentPage = (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage: currentPage} as const)
export const setTotalUsersCount = (totalUsersCount: number) => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount: totalUsersCount} as const)
export const toggleIsFetching = (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching} as const)
export const toggleISFollowingProgress = (isFetching: boolean, userId: number) => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId} as const)

export const getUsers = (currentPage: number, pageSize: number):AppThunkType => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true))
        usersAPI.getUsers(currentPage, pageSize).then(data => {
            dispatch(toggleIsFetching(false))
            dispatch(setUsers(data.items))
            dispatch(setTotalUsersCount(data.totalCount))
        });
    }
}

export const follow = (userId: number):AppThunkType => {
    return (dispatch) => {
       dispatch(toggleISFollowingProgress(true, userId))
        usersAPI.follow(userId)
            .then(response => {
                if (response.data.resultCode == 0){
                    dispatch(followSuccess(userId))
                }
                dispatch(toggleISFollowingProgress(false, userId))
            });
    }
}

export const unfollow = (userId: number):AppThunkType => {
    return (dispatch) => {
        dispatch(toggleISFollowingProgress(true,userId))
        usersAPI.unfollow(userId)
            .then(response => {
                if (response.data.resultCode == 0){
                    dispatch(unfollowSuccess(userId));
                }
                dispatch(toggleISFollowingProgress(false, userId))
            });
    }
}
export default usersReducer;