const subscribers = [] as Array<SubscriberType>

let ws: WebSocket

const closeHandler = () => {
    setTimeout(createChannel, 3000)
}
function createChannel() {
    if(ws){
        ws.removeEventListener('close', closeHandler)
        ws.close()
    }
    ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
    ws.addEventListener('close', closeHandler)
}
export const chatAPI = {
    subscribe(callback: SubscriberType){
        subscribers.push(callback)
    }
}

type SubscriberType = (messages: ChatMessageType[])=> void

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string

}