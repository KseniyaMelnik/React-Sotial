import React, {useEffect, useRef, useState} from "react";
import {Button, Image} from "antd";
import { Input } from 'antd';
import {ChatMessageType} from "../../api/chat-api";
import {useDispatch, useSelector} from "react-redux";
import {
    sendMessage,
    startMessagesListening,
    StatusType,
    stopMessagesListening
} from "../../Redux/chat-reducer";
import {AppStateType} from "../../Redux/redux-store";
const { TextArea } = Input;



 const ChatPage: React.FC = () => {
    return <div>
        <Chat />
    </div>
}

const Chat: React.FC = () => {
    const status = useSelector<AppStateType, StatusType>(state=> state.chat.status)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(startMessagesListening());
        return () => {
            dispatch(stopMessagesListening());

        }
    }, [])

    return <div>
        {status === 'error' && <div>Some error occurred. Please refresh the page</div>}
        <>
            <Messages/>
            <AddMessageForm/>
        </>

    </div>
}

const Messages: React.FC= () => {
    const messages = useSelector<AppStateType, ChatMessageType[]>(state=> state.chat.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null);
    const [isAutoScroll, setIsAutoScroll] = useState(true)
    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        let element = e.currentTarget
        if(Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 300){
           !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    useEffect(()=> {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages])

    return <div style={{height: '400px', overflow: 'auto'}} onScroll={scrollHandler}>
        {messages.map((m: ChatMessageType, index)=> <Message key={index} message={m}/>)}
        <div ref={messagesAnchorRef}></div>
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

const AddMessageForm: React.FC<{}> = () => {
    const [message, setMessage] = useState('')
    const status = useSelector<AppStateType, StatusType>(state=> state.chat.status)
    const dispatch = useDispatch()

    const sendMessageHandler = () => {
        if (!message) {
            return
        }
     dispatch(sendMessage(message))
        setMessage('')
    }
    return <div>
    <TextArea rows={2}
              placeholder="enter your message"
              value={message}
              onChange={(e)=> setMessage(e.currentTarget.value)}
              style={{width: 400}}
    />
        <Button onClick={sendMessageHandler} disabled={status !== 'ready'}>Send</Button>
    </div>
}
export default ChatPage