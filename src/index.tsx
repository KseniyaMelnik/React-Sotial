import reportWebVitals from './reportWebVitals';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import  {SamuraiJSApp} from './App';
import {DialogItemPropsType} from "./components/Dialogs/DialogItem/DialogItem";
import {MessagePropsType} from "./components/Dialogs/Message/Message";
import {PostPropsType} from "./components/Profile/MyPosts/Post/Post";
import {FriendPropsType} from "./components/Friends/Friend/Friend";

export type statePropsType = {
    dialogsPage: {
        dialogs: Array<DialogItemPropsType>,
        messages: Array<MessagePropsType>,
        newMessageBody: string
    },
    profilePage: {
        posts: Array<PostPropsType>
        newPostText: string,
        profile: any
    },
    sideBar: {
        friends: Array<FriendPropsType>
    }
}

    ReactDOM.render(
        <SamuraiJSApp />, document.getElementById('root')
    );





// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
