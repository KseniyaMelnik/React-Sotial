import {Dispatch} from "redux";
import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {AppActionsType, AppThunkType} from "./redux-store";
import {chatAPI, ChatMessageType} from "../api/chat-api";


export type ChatReducerType = typeof initialState;

let initialState = {
    messages: [] as ChatMessageType[],
};

const chatReducer = (state = initialState, action: AppActionsType):ChatReducerType  => {

    switch (action.type) {
        case 'SAMURAI-NETWORK/CHAT/MESSAGES-RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload]
            }
        default:
            return state;
    }
}

export const messagesReceived = (messages: ChatMessageType[]) => ({type: 'SAMURAI-NETWORK/CHAT/MESSAGES-RECEIVED', payload: messages}  as const)

let _newMessageHandler: ((messages: ChatMessageType[])=> void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages: ChatMessageType[]) => {
            dispatch(messagesReceived(messages))
        }

    }
    return _newMessageHandler
}

export const startMessagesListening = (): AppThunkType => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe(newMessageHandlerCreator(dispatch))
}
export const stopMessagesListening = (): AppThunkType => async (dispatch) => {
    chatAPI.unsubscribe(newMessageHandlerCreator(dispatch))
    chatAPI.stop()
}
export const sendMessage = (message: string): AppThunkType => async (dispatch) => {
    chatAPI.sendMessage(message)
}


export default chatReducer;