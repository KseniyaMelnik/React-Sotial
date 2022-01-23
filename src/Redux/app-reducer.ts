import {AppActionsType, AppThunkType} from "./redux-store";
import {getAuthUserData} from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'

let initialState = {
    initialized: false
};
type appReducerStateType = typeof initialState

const appReducer = (state = initialState, action: AppActionsType): appReducerStateType  => {

    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}

export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS} as const)

export const initializeApp = (): AppThunkType => (dispatch) => {
    let promise = dispatch(getAuthUserData())
    //@ts-ignore
    promise.then(()=> {
            dispatch(initializedSuccess())
        })
}

export default appReducer;