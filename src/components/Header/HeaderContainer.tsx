import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {getAuthUserData, logout} from "../../Redux/auth-reducer";
import {AppStateType} from "../../Redux/redux-store";
//import {setUserProfile} from "../../Redux/profile-reducer";

class HeaderContainer extends React.Component <any, any>{
    componentDidMount() {
       this.props.getAuthUserData()
    }
    render () {
        return <Header {...this.props} />
    }
}

export type HeaderPropsType = {
    isAuth: boolean,
    login: string| null,
}

const mapStateToProps = (state: AppStateType): HeaderPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
})

export default connect(mapStateToProps, {getAuthUserData, logout})(HeaderContainer);