let subscribers = [] as Array<SubscriberType>

let ws: WebSocket | null = null

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

const messageHandler = (e:MessageEvent)=> {
    let newMessages = JSON.parse(e.data)
    subscribers.forEach(s=>s(newMessages))
}



export const chatAPI = {
    subscribe(callback: SubscriberType){
        subscribers.push(callback)
        return ()=>{
            subscribers = subscribers.filter(s=> s !== callback)
        }
    },
    unsubscribe(callback: SubscriberType) {
        subscribers = subscribers.filter(s=> s !== callback)
    },
    sendMessage(message: string){
        ws?.send(message)
    }
}

type SubscriberType = (messages: ChatMessageType[])=> void

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string

}