import {Dispatch} from "redux";
import {AppActionsType, AppThunkType} from "./redux-store";
import {chatAPI, ChatMessageApiType} from "../api/chat-api";
import {v1} from "uuid"

export type ChatReducerType = typeof initialState;

export type StatusType = 'pending'| 'ready' | 'error'

export type ChatMessageType = ChatMessageApiType & {id: string}

let initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
};

const chatReducer = (state = initialState, action: AppActionsType):ChatReducerType  => {

    switch (action.type) {
        case 'SAMURAI-NETWORK/CHAT/MESSAGES-RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.map(m=>({...m, id: v1()}))].filter((m ,index, array)=> index >= (array.length - 100))
            }
            case 'SAMURAI-NETWORK/CHAT/STATUS-CHANGED':
                return {
                    ...state,
                    status: action.payload
                }
        case 'SAMURAI-NETWORK/CHAT/MESSAGES-DELETED':
            return { ...state,
            messages: []
            }

        default:
            return state;
    }
}

export const messagesReceived = (messages: ChatMessageApiType[]) => ({type: 'SAMURAI-NETWORK/CHAT/MESSAGES-RECEIVED', payload: messages}  as const)
export const statusChanged = (status: StatusType) => ({type: 'SAMURAI-NETWORK/CHAT/STATUS-CHANGED', payload: status}  as const)
export const messagesDeleted = () => ({type: 'SAMURAI-NETWORK/CHAT/MESSAGES-DELETED'}  as const)

let _newMessageHandler: ((messages: ChatMessageApiType[])=> void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages: ChatMessageApiType[]) => {
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