import React from "react";
import {UserType} from "../../Redux/users-reducer";
import s from "./Users.module.css"
import userPhoto from "../../Assets/Images/avatar.png"
import {NavLink} from "react-router-dom";
import Paginator from "../common/Paginator/Paginator";

type UsersPropsType = {
    users: Array<UserType>
    follow: (userID: number) => void,
    unfollow: (userID: number) => void,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    setCurrentPage: (p: number) => void
    onPageChanged: (pageNumber: number) => void
    followingInProgress: number[]
}

const Users = (props: UsersPropsType) => {
    return <div>
        <Paginator currentPage={props.currentPage}
                   onPageChanged={props.onPageChanged}
                   totalUsersCount={props.totalUsersCount}
                   pageSize={props.pageSize}
        />
        {
            props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <NavLink to={'/profile/' + u.id}>
                        <img src={u.photos.small !== null ? u.photos.small : userPhoto} alt={u.name}
                             className={s.userPhoto}/>
                        </NavLink>
                    </div>
                    <div>
                        {u.followed
                            ? <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                props.unfollow(u.id)
                            }}>UNFOLLOW</button>
                            : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                props.follow(u.id)
                            }}>FOLLOW</button>}
                    </div>
                </span>
                <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{'u.location.country'}</div>
                        <div>{'u.location.city'}</div>
                    </span>
                </span>
            </div>)
        }
    </div>

}

export default Users