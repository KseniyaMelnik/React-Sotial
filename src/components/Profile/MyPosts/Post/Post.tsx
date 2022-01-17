import React from "react";
import s from './Post.module.css';

export type PostPropsType = {
    id?: number,
    message: string;
    likesCount: number;
    image: string;
}

const Post = (props: PostPropsType) => {
    return (
        <div className={s.item}>
            <img src={props.image}/>
            {props.message}
            <div>
                <span>like</span> {props.likesCount}
            </div>
        </div>
    )
}
export default Post;