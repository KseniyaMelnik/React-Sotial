export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string

}
const subscribers = [] as Array<(messages: ChatMessageType[])=> void>

export const chatAPI = {
    subscribe(callback: (messages: ChatMessageType[])=> void){

    }
}