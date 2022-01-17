import React, {ComponentType} from "react";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../Redux/redux-store";
import {connect} from "react-redux";

type MapStatePropsType = {
    isAuth: boolean
}

const mapStateToPropsForRedirect = (state: AppStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth
})

export function withAuthRedirect  <T>(Component: ComponentType<T>) {
    class RedirectComponent extends React.Component<MapStatePropsType, MapStatePropsType> {
        render () {
            let {isAuth, ...restProps} = this.props
                if (!this.props.isAuth) return <Redirect to={'/login'} />
                return <Component {...restProps as T} />
        }
    }

    const ConnectedRedirectComponent = connect (mapStateToPropsForRedirect)(RedirectComponent);
    return ConnectedRedirectComponent;
}