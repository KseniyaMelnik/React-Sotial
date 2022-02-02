import React from "react";
import {UserType} from "../../Redux/users-reducer";
import s from "./Users.module.css"
import userPhoto from "../../Assets/Images/avatar.png"
import {NavLink} from "react-router-dom";

type UserPropsType = {
    user: UserType,
    followingInProgress: number[],
    unfollow: (userID: number) => void,
    follow: (userID: number) => void,
}

const User = (props: UserPropsType) => {
    let user = props.user
    return  <div>
                <span>
                    <div>
                        <NavLink to={'/profile/' + user.id}>
                        <img src={user.photos.small !== null ? user.photos.small : userPhoto} alt={user.name}
                             className={s.userPhoto}/>
                        </NavLink>
                    </div>
                    <div>
                        {user.followed
                            ? <button disabled={props.followingInProgress.some(id => id === user.id)} onClick={() => {
                                props.unfollow(user.id)
                            }}>UNFOLLOW</button>
                            : <button disabled={props.followingInProgress.some(id => id === user.id)} onClick={() => {
                                props.follow(user.id)
                            }}>FOLLOW</button>}
                    </div>
                </span>
                <span>
                    <span>
                        <div>{user.name}</div>
                        <div>{user.status}</div>
                    </span>
                </span>
            </div>

}

export default User