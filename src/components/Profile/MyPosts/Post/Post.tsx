import React, {createElement, useState} from "react";
import s from './Post.module.css';
import {Comment, Tooltip, Avatar} from 'antd';
import moment from 'moment';
import {DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled} from '@ant-design/icons';

export type PostPropsType = {
    id?: number,
    message: string;
    likesCount: number;
    image: string;
}

const Post = (props: PostPropsType) => {

    const [likes, setLikes] = useState<number>(props.likesCount);
    const [dislikes, setDislikes] = useState(0);
    const [action, setAction] = useState<string | null>(null);

    const like = () => {
        setLikes(1);
        setDislikes(0);
        setAction('liked');
    };

    const dislike = () => {
        setLikes(0);
        setDislikes(1);
        setAction('disliked');
    };

    const actions = [
        <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
          <span className="comment-action">{likes}</span>
      </span>
        </Tooltip>,
        <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
          <span className="comment-action">{dislikes}</span>
      </span>
        </Tooltip>,
        <span key="comment-basic-reply-to">Reply to</span>,
    ];

    return <>
        <Comment
            actions={actions}
            author={<a>Han Solo</a>}
            avatar={<Avatar src={props.image} alt="Han Solo"/>}
            content={
                <p>{props.message}</p>
            }
            datetime={
                <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                    <span>{moment().fromNow()}</span>
                </Tooltip>
            }
        />
    </>
}

export default Post;