import reportWebVitals from './reportWebVitals';

import {store} from "./Redux/redux-store";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {DialogItemPropsType} from "./components/Dialogs/DialogItem/DialogItem";
import {MessagePropsType} from "./components/Dialogs/Message/Message";
import {PostPropsType} from "./components/Profile/MyPosts/Post/Post";
import {FriendPropsType} from "./components/Friends/Friend/Friend";
import {Provider} from "react-redux";

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
        <BrowserRouter>
            <Provider store={store}>
            <App />
            </Provider>
        </BrowserRouter>, document.getElementById('root')
    );





// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
