import React from "react";
import Friend, {FriendPropsType} from "./Friend/Friend";
import s from "./Friends.module.css"

export type FriendsPropsType = {
    state: {
        friends: Array<FriendPropsType>
    }
}

const Friends = (/*props: FriendsPropsType*/) => {

/*
    let friendsElements = props.state.friends.map((f:FriendPropsType) => <Friend name={f.name} id={f.id} avatar={f.avatar}/>)
*/

    return <div className={s.friendsContainer}>


{/*
        {friendsElements}
*/}


    </div>
}

export default Friends;