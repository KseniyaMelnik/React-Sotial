import {usersAPI} from "../api/api";
import {AppActionsType, AppThunkType} from "./redux-store";
import {updateObjectArray} from "../utils/object-helpers";

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

type UsersReducerType = typeof initialState

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 100,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as number[],
    filter: {
        term: '',
        friend: null as null | boolean
    }
};
export type FilterType = typeof initialState.filter

const usersReducer = (state = initialState, action: AppActionsType): UsersReducerType => {

    switch (action.type) {
        case 'SAMURAI-NETWORK/USERS/FOLLOW':
            return {
                ...state,
                users: updateObjectArray(state.users, action.userID, 'id', {followed: true})
            }
        case 'SAMURAI-NETWORK/USERS/UNFOLLOW':
            return {
                ...state,
                users: updateObjectArray(state.users, action.userID, 'id', {followed: false})
            }
        case 'SAMURAI-NETWORK/USERS/SET_USERS': {
            return { ...state, users: [...action.users]}
        }
        case 'SAMURAI-NETWORK/USERS/SET_CURRENT_PAGE': {
            return { ...state,  currentPage: action.currentPage }
        }
        case 'SAMURAI-NETWORK/USERS/SET_FILTER': {
            return {...state, filter: action.payload}
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
export const setFilter = (filter: FilterType) => ({type: 'SAMURAI-NETWORK/USERS/SET_FILTER', payload: filter} as const)

export const setTotalUsersCount = (totalUsersCount: number) => ({type: 'SAMURAI-NETWORK/USERS/SET_TOTAL_USERS_COUNT', totalUsersCount: totalUsersCount} as const)
export const toggleIsFetching = (isFetching: boolean) => ({type: 'SAMURAI-NETWORK/USERS/TOGGLE_IS_FETCHING', isFetching} as const)
export const toggleISFollowingProgress = (isFetching: boolean, userId: number) => ({type: 'SAMURAI-NETWORK/USERS/TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId} as const)

export const requestUsers = (page: number, pageSize: number, filter: FilterType):AppThunkType => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true))
        dispatch(setCurrentPage(page))
        dispatch(setFilter(filter))
        let data = await usersAPI.getUsers(page, pageSize, filter.term, filter.friend)
            dispatch(toggleIsFetching(false))
            dispatch(setUsers(data.items))
            dispatch(setTotalUsersCount(data.totalCount))
    }
}

export const follow = (userId: number): AppThunkType => {
    return async (dispatch) => {
        dispatch(toggleISFollowingProgress(true, userId))
        let response = await usersAPI.follow(userId)
        if (response.data.resultCode == 0) {
            dispatch(followSuccess(userId))
        }
        dispatch(toggleISFollowingProgress(false, userId))
    }
}

export const unfollow = (userId: number): AppThunkType => {
    return async (dispatch) => {
        dispatch(toggleISFollowingProgress(true, userId))
        let response = await usersAPI.unfollow(userId)
        if (response.data.resultCode == 0) {
            dispatch(unfollowSuccess(userId));
        }
        dispatch(toggleISFollowingProgress(false, userId))
    }
}
export default usersReducer;