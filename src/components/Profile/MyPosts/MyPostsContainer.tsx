import React from "react";
import {addPostActionCreator} from "../../../Redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../Redux/redux-store";
import {PostPropsType} from "./Post/Post";
import {Dispatch} from "redux";

type mapStateToPropsType = {
    posts: Array<PostPropsType>
}
const mapStateToProps = (state: AppStateType):mapStateToPropsType => {
    return {
        posts: state.profilePage.posts
    }
}
type mapDispatchToPropsType = {
    addPost: (newPostBody: string)=>void
}
const mapDispatchToProps = (dispatch: Dispatch):mapDispatchToPropsType => {
    return {
        addPost: (newPostBody) => {
            dispatch(addPostActionCreator(newPostBody))
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;