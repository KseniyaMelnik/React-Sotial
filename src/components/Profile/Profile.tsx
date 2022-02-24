import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";


const Profile = (props: any) => {
    return <div>
        <ProfileInfo isOwner={props.isOwner}
                     profile={props.profile}
                     status={props.status}
                     updateStatus={props.updateStatus}
                     savePhoto={props.savePhoto}
        />
        <MyPostsContainer />
    </div>
}
export default Profile;