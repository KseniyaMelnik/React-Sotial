import React from "react";
import {FilterType, UserType} from "../../Redux/users-reducer";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UsersSearchForm} from "./UsersSearchForm";


type UsersPropsType = {
    users: Array<UserType>
    follow: (userID: number) => void,
    unfollow: (userID: number) => void,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    setCurrentPage: (p: number) => void
    onPageChanged: (pageNumber: number) => void
    onFilterChanged: (filter: FilterType)=> void
    followingInProgress: number[]
}

const Users = React.memo((props: UsersPropsType) => {
    return <div>
        <UsersSearchForm onFilterChanged = {props.onFilterChanged}/>
        <Paginator onPageChanged={props.onPageChanged}
                   totalCount={props.totalUsersCount}
        />
        <div>
            {
                props.users.map(u => <User user={u}
                                           followingInProgress={props.followingInProgress}
                                           follow={props.follow}
                                           unfollow={props.unfollow}
                                           key={u.id}
                />)
            }
        </div>
    </div>

})
export default Users