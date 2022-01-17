import React from "react";
import s from './Message.module.css';
import {NavLink} from "react-router-dom";


export type MessagePropsType = {
    id: number,
    message: string,
    avatar: string,
}

const Message = (props: MessagePropsType) => {
    return (
        <div className={s.message}>
            <div className={s.messageContent}>
                <img className={s.avatar} src={props.avatar}/><span>{props.message}</span>
            </div>
        </div>
    )
}

export default Message;