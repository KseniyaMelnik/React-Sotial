import React from "react";
import s from './DialogItem.module.css';
import {NavLink} from "react-router-dom";

export type DialogItemPropsType = {
    name: string,
    id: number,
    avatar: string,
}
const DialogItem = (props: DialogItemPropsType) => {
    return <div className={`${s.dialog}`}>
            <NavLink to={`dialogs/${props.id}`}><img className={s.avatar} src={props.avatar} alt={props.name}/>{props.name}</NavLink>
        </div>
}


export default DialogItem;