import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, updateStatus} from "../../Redux/profile-reducer";
import {AppStateType} from "../../Redux/redux-store";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";

export type ProfilePropsType =  {
    aboutMe: string;
    contacts : {
        facebook: string | null,
            website: string | null,
            vk: string | null,
            twitter: string | null,
            instagram: string | null,
            youtube: string | null,
            mainLink: string | null,
            github: string | null,
    },
    fullName: string,
        lookingForAJob: boolean,
        photos: {
        small: string,
            large: string
    }
    userId: number
    lookingForAJobDescription: string
}

type PathParamsType = {
    userId: string
}

type MapStatePropsType = {
    profile: ProfilePropsType | null
    status: string
    authorizedUserId: string | null,
    isAuth: boolean,
}


type MapDispatchPropsType = {
    getUserProfile: (userId: string) => void
    getStatus: (userId: string) => void
    updateStatus: (status: string) => void
}

type OwnPropsType = MapStatePropsType & MapDispatchPropsType
type PropsType = RouteComponentProps<PathParamsType>& OwnPropsType

type StateType = {
    // описываем локальный стейт
    userId: string
}

class ProfileContainer extends React.Component<PropsType, StateType> {

    componentDidMount() {
        let userId: string = this.props.match.params.userId
        if (!userId) {
            //@ts-ignore
            userId = this.props.authorizedUserId;
            if (!userId) {
                this.props.history.push("/login")
            }
        }
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus}/>
        )
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus}),
    withRouter,
    //withAuthRedirect
)(ProfileContainer);


