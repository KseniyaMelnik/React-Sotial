import React, {useEffect, useState} from "react";
import {Button, Image} from "antd";
import { Input } from 'antd';

const { TextArea } = Input;


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
    const [wsChannel, setWsChannel] = useState<WebSocket|null>(null)

    useEffect(()=>{
        function createChannel() {
            setWsChannel(new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"))
        }
        createChannel();
    },[])

    useEffect(()=>{
        wsChannel?.addEventListener('close', ()=>{
            console.log('CLOSE WS')
        })
    }, [wsChannel])

     return <div>
         <Messages wsChannel={wsChannel}/>
         <AddMessageForm wsChannel={wsChannel}/>
     </div>
}

const Messages: React.FC<{wsChannel:WebSocket|null}> = ({wsChannel}) => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])
    useEffect(()=>{
        wsChannel?.addEventListener('message', (e)=> {
            let newMessages = JSON.parse(e.data)
            setMessages((prevMessages)=> [...prevMessages, ...newMessages])
        })
        return ()=> {
            wsChannel?.removeEventListener('message', (e)=> {
                let newMessages = JSON.parse(e.data)
                setMessages((prevMessages)=> [...prevMessages, ...newMessages])
            })
        }
    },[wsChannel])

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

const AddMessageForm: React.FC<{wsChannel:WebSocket|null}> = ({wsChannel}) => {
    const [message, setMessage] = useState('')
    const [ReadyStatus, setReadyStatus] = useState<'pending'|'ready'>('pending')

    useEffect(()=> {
        wsChannel?.addEventListener('open', ()=>{
            setReadyStatus('ready')
        })
        return ()=> {
            wsChannel?.removeEventListener('open', ()=>{
                setReadyStatus('ready')
            })
        }
    }, [wsChannel])

    const sendMessage = () => {
        if (!message) {
            return
        }
        wsChannel?.send(message)
        setMessage('')
    }
    return <div>
    <TextArea rows={2}
              placeholder="enter your message"
              value={message}
              onChange={(e)=> setMessage(e.currentTarget.value)}
              style={{width: 400}}
    />
        <Button onClick={sendMessage} disabled={wsChannel == null || ReadyStatus !== 'ready'}>Send</Button>
    </div>
}
export default ChatPage