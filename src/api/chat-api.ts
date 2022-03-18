import {StatusType} from "../Redux/chat-reducer";

const subscribers = {
    "messages-received": [] as Array<MessagesReceivedSubscriberType>,
    "status-changed": [] as Array<StatusChangedSubscriberType>
}

let ws: WebSocket | null = null
type EventsNameType = "messages-received" | "status-changed"

const closeHandler = () => {
    setTimeout(createChannel, 3000)
}
const messageHandler = (e:MessageEvent)=> {
    let newMessages = JSON.parse(e.data)
    subscribers["messages-received"].forEach(s=>s(newMessages))
}
const cleanUp = () => {
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
}

function createChannel() {
    cleanUp()
    ws?.close()
    ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
}

export const chatAPI = {
    start(){
        createChannel()
    },
    stop(){
        subscribers["messages-received"]=[]
        subscribers["status-changed"]=[]
        cleanUp()
        ws?.close()
    },
    subscribe(eventName: EventsNameType, callback: MessagesReceivedSubscriberType|StatusChangedSubscriberType){
        // @ts-ignore
        subscribers[eventName].push(callback)
        return ()=>{
            // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s=> s !== callback)
        }
    },
    unsubscribe(eventName: EventsNameType, callback: MessagesReceivedSubscriberType|StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s=> s !== callback)
    },

    sendMessage(message: string){
        ws?.send(message)
    }
}

type MessagesReceivedSubscriberType = (messages: ChatMessageType[])=> void
type StatusChangedSubscriberType = (status: StatusType) => void
export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string

}