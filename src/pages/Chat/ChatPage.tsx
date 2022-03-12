import React, {useEffect, useState} from "react";
import {Button, Image} from "antd";
import { Input } from 'antd';

const { TextArea } = Input;

const ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string

}
 const ChatPage: React.FC = () => {
    return <div>
        <Chat />
    </div>
}

const Chat: React.FC = () => {
     return <div>
         <Messages />
         <AddMessageForm />
     </div>
}

const Messages: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])
    useEffect(()=>{
        ws.addEventListener('message', (e)=> {
            let newMessages = JSON.parse(e.data)
            setMessages((prevMessages)=> [...prevMessages, ...newMessages])
        })
    },[])

    return <div style={{height: '400px', overflow: 'auto'}}>
        {messages.map((m: ChatMessageType, index)=> <Message key={index} message={m}/>)}
    </div>
}
const Message: React.FC<{message: ChatMessageType}> = ({message}) => {
     return <div>
         <Image  width={30} src={message.photo} /> <b>{message.userName}</b>
         <br/>
         {message.message}
         <hr />
     </div>
}

const AddMessageForm: React.FC = () => {
    const [message, setMessage] = useState('')

    const sendMessage = () => {
        if (!message) {
            return
        }
        ws.send(message)
        setMessage('')
    }
    return <div>
    <TextArea rows={4}
              placeholder="enter your message"
              value={message}
              onChange={(e)=> setMessage(e.currentTarget.value)}
    />
        <Button onClick={sendMessage}>Send</Button>
    </div>
}
export default ChatPage