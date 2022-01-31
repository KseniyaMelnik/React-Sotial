import React from "react";
import s from './MyPosts.module.css';
import Post, {PostPropsType} from "./Post/Post";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/formControls/FormControls";


export type PostsPropsType = {
    posts: Array<PostPropsType>
    addPost: (newPostBody: string)=>void
}

const MyPosts: React.FC<PostsPropsType> = React.memo((props) => {

    const postsElement = props.posts.map((p: PostPropsType) => <Post message={p.message} likesCount={p.likesCount}
                                                                   image={p.image}/>)

    const addNewPost = (values: any) => {
        props.addPost(values.newPostBody)

    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <PostFormRedux onSubmit={addNewPost}/>
            </div>
            <div className={s.posts}>
                {postsElement}
            </div>
        </div>

    )
});
export default MyPosts;

const maxLength10 = maxLengthCreator(10);
const PostForm: React.FC<InjectedFormProps> = (props)=> {
    return <form onSubmit={props.handleSubmit}>
            <Field component={Textarea}
                   name ={"newPostBody"}
                   placeholder={"Enter your message"}
                   validate={[required, maxLength10]}
            />
            <button>Add post</button>
    </form>
}

const PostFormRedux = reduxForm({
    form: "PostForm"
}) (PostForm)