import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer, {addPostActionCreator, setStatus, setUserProfile} from "./profile-reducer";
import dialogsReducer, {sendMessageCreator} from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer, {
    followSuccess,
    setCurrentPage,
    setTotalUsersCount,
    setUsers, toggleIsFetching, toggleISFollowingProgress,
    unfollowSuccess
} from "./users-reducer";
import authReducer, {setAuthUserData} from "./auth-reducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk"
import {reducer as formReducer} from "redux-form"

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sideBar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer
});

export type AppStateType = ReturnType<typeof rootReducer>

export type AppActionsType = ReturnType<typeof addPostActionCreator>
    | ReturnType<typeof sendMessageCreator>
    | ReturnType<typeof followSuccess>
    | ReturnType<typeof unfollowSuccess>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalUsersCount>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setAuthUserData>
    | ReturnType<typeof setStatus>
    | ReturnType<typeof toggleISFollowingProgress>

export type AppThunkType <ReturnType = void> = ThunkAction<void, AppStateType, unknown, AppActionsType>

export let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

declare var window: any; //refactor
window.store = store