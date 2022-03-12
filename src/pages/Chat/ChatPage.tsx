import React from "react";
import {Button, Image} from "antd";
import { Input } from 'antd';

const { TextArea } = Input;

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
     const messages = [1,2,3,4,5,6,7,8]
    return <div style={{height: '400px', overflow: 'auto'}}>
        {messages.map((m: any)=> <Message />)}
    </div>
}
const Message: React.FC = () => {
     const message = {
         url: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png',
         author: 'Someone',
         text: 'Something'
     }
     return <div>
         <Image  width={30} src={message.url} /> <b>{message.author}</b>
         <br/>
         {message.text}
         <hr />
     </div>
}

const AddMessageForm: React.FC = () => {
    return <div>
    <TextArea rows={4}
              maxLength={4}
              placeholder="enter your message"
    />
        <Button>Send</Button>
    </div>
}
export default ChatPage