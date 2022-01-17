import React from "react";
import s from './Friend.module.css';

export type FriendPropsType = {
    avatar: string,
    name: string,
    id?: number
}

const Friend = (props:FriendPropsType) => {
   return (
       <div className={s.friendItem}>
           <div><img className={s.avatar} src={props.avatar}/></div>
           <div className={s.name}>{props.name}</div>
       </div>
   )
}
export default Friend;