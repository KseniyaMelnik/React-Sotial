import React from "react";
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/redux-store";
import {
    follow, requestUsers,
    setCurrentPage,
    toggleISFollowingProgress,
    unfollow,
    UserType
} from "../../Redux/users-reducer";
import Users from "./Users";
import {Preloader} from "../common/preloader/Preloader";
import {compose} from "redux";
import {
    getPageSize,
    getTotalUsersCount,
    getCurrentPage,
    getIsFetching,
    getFollowingInProgress, getUsers
} from "../../Redux/users-selectors";


type UsersAPIComponentPropsType = {
    users: Array<UserType>
    follow: (userID: number) => void,
    unfollow: (userID: number) => void,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    setCurrentPage: (p: number) => void,
    isFetching: boolean,
    toggleISFollowingProgress: (isFetching: boolean, userId: number) => void,
    followingInProgress: number[]
    requestUsers: (currentPage: number, pageSize: number) => void
}

class UsersContainer extends React.Component<UsersAPIComponentPropsType, any> {
    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber: number) => {
        this.props.requestUsers(pageNumber, this.props.pageSize);
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   setCurrentPage={this.props.setCurrentPage}
                   followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

// const mapStateToProps = (state: AppStateType) => {
//     return {
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingInProgress: state.usersPage.followingInProgress,
//     }
// }

const mapStateToProps = (state: AppStateType) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps,
        {
            follow, unfollow, setCurrentPage,
            toggleISFollowingProgress, requestUsers
        }),
)(UsersContainer)