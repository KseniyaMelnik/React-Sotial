import {Dispatch} from "redux";
import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {AppActionsType, AppThunkType} from "./redux-store";
import {chatAPI, ChatMessageType} from "../api/chat-api";


export type ChatReducerType = typeof initialState;

export type StatusType = 'pending'| 'ready' | 'error'

let initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
};

const chatReducer = (state = initialState, action: AppActionsType):ChatReducerType  => {

    switch (action.type) {
        case 'SAMURAI-NETWORK/CHAT/MESSAGES-RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload]
            }
            case 'SAMURAI-NETWORK/CHAT/STATUS-CHANGED':
                return {
                    ...state,
                    status: action.payload
                }
        default:
            return state;
    }
}

export const messagesReceived = (messages: ChatMessageType[]) => ({type: 'SAMURAI-NETWORK/CHAT/MESSAGES-RECEIVED', payload: messages}  as const)
export const statusChanged = (status: StatusType) => ({type: 'SAMURAI-NETWORK/CHAT/STATUS-CHANGED', payload: status}  as const)


let _newMessageHandler: ((messages: ChatMessageType[])=> void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages: ChatMessageType[]) => {
            dispatch(messagesReceived(messages))
        }

    }
    return _newMessageHandler
}
let _statusChangedHandler: ((status: StatusType)=> void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status: StatusType) => {
            dispatch(statusChanged(status))
        }
    }
    return _statusChangedHandler
}

export const startMessagesListening = (): AppThunkType => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe("messages-received", newMessageHandlerCreator(dispatch))
    chatAPI.subscribe("status-changed", statusChangedHandlerCreator(dispatch))

}
export const stopMessagesListening = (): AppThunkType => async (dispatch) => {
    chatAPI.unsubscribe("messages-received", newMessageHandlerCreator(dispatch))
    chatAPI.unsubscribe("status-changed", statusChangedHandlerCreator(dispatch))
    chatAPI.stop()
}
export const sendMessage = (message: string): AppThunkType => async (dispatch) => {
    chatAPI.sendMessage(message)
}


export default chatReducer;