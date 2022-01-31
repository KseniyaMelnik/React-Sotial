import {usersAPI} from "../api/api";
import {AppActionsType, AppThunkType} from "./redux-store";

export type UserType = {
    id: number,
    photos: {
        small: string,
        large: string
    }
    followed: boolean
    name: string,
    status: string,
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
        case 'SAMURAI-NETWORK/USERS/FOLLOW':
            return {
                ...state,
                users: state.users.map(u => u.id === action.userID ? {...u, followed: true} : u)
            }
        case 'SAMURAI-NETWORK/USERS/UNFOLLOW':
            return {
                ...state,
                users: state.users.map(u => u.id === action.userID ? {...u, followed: false} : u)
            }
        case 'SAMURAI-NETWORK/USERS/SET_USERS': {
            return { ...state, users: [...action.users]}
        }
        case 'SAMURAI-NETWORK/USERS/SET_CURRENT_PAGE': {
            return { ...state,  currentPage: action.currentPage }
        }
        case 'SAMURAI-NETWORK/USERS/SET_TOTAL_USERS_COUNT': {
            return { ...state,  totalUsersCount: action.totalUsersCount }
        }
        case 'SAMURAI-NETWORK/USERS/TOGGLE_IS_FETCHING' : {
            return { ...state,  isFetching: action.isFetching }
        }
        case 'SAMURAI-NETWORK/USERS/TOGGLE_IS_FOLLOWING_PROGRESS' : {
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

export const followSuccess = (userID: number) => ({type: 'SAMURAI-NETWORK/USERS/FOLLOW', userID: userID} as const)
export const unfollowSuccess = (userID: number) =>
    ({type: 'SAMURAI-NETWORK/USERS/UNFOLLOW', userID: userID} as const)
export const setUsers = (users: Array<UserType>) => ({type: 'SAMURAI-NETWORK/USERS/SET_USERS', users: users} as const)
export const setCurrentPage = (currentPage: number) => ({type: 'SAMURAI-NETWORK/USERS/SET_CURRENT_PAGE', currentPage: currentPage} as const)
export const setTotalUsersCount = (totalUsersCount: number) => ({type: 'SAMURAI-NETWORK/USERS/SET_TOTAL_USERS_COUNT', totalUsersCount: totalUsersCount} as const)
export const toggleIsFetching = (isFetching: boolean) => ({type: 'SAMURAI-NETWORK/USERS/TOGGLE_IS_FETCHING', isFetching} as const)
export const toggleISFollowingProgress = (isFetching: boolean, userId: number) => ({type: 'SAMURAI-NETWORK/USERS/TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId} as const)

export const requestUsers = (page: number, pageSize: number):AppThunkType => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true))
        dispatch(setCurrentPage(page))
        usersAPI.getUsers(page, pageSize).then(data => {
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