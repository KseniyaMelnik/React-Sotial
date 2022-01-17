import React, {ComponentType} from "react";
import {DialogsReducerType, sendMessageCreator} from "../../Redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/redux-store";
import {compose, Dispatch} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect.";


type MapStatePropsType = {
    dialogsPage: DialogsReducerType
}
let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
      dialogsPage: state.dialogsPage,
    }
}
type mapDispatchToPropsType = {
    sendMessage: (newMessageBody: string)=> void
}
export type DialogsPropsType = mapDispatchToPropsType & MapStatePropsType

let mapDispatchToProps = (dispatch: Dispatch):mapDispatchToPropsType => {
    return {
        sendMessage: (newMessageBody: string)=>{
            dispatch(sendMessageCreator(newMessageBody))
        }
    }
}

export default compose<ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs)