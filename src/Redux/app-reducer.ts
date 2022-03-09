import {AppActionsType, AppThunkType} from "./redux-store";
import {getAuthUserData} from "./auth-reducer";

let initialState = {
    initialized: false,
    globalError: null as string | null
};
type appReducerStateType = typeof initialState

const appReducer = (state = initialState, action: AppActionsType): appReducerStateType  => {

    switch (action.type) {
        case "SAMURAI-NETWORK/APP/INITIALIZED_SUCCESS":
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}

export const initializedSuccess = () => ({type: "SAMURAI-NETWORK/APP/INITIALIZED_SUCCESS"} as const)

export const initializeApp = (): AppThunkType => (dispatch) => {
    let promise = dispatch(getAuthUserData())
    //@ts-ignore
    promise.then(()=> {
            dispatch(initializedSuccess())
        })
}

export default appReducer;