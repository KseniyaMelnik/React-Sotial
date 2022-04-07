import React, {useEffect, useState} from "react";
import { Typography } from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../Redux/redux-store";
import {updateStatus} from "../../../Redux/profile-reducer";
const { Paragraph } = Typography;


type ProfileStatusProps = {
    status: string
    updateStatus: (status: string)=> void
}

export const ProfileStatusWidthHooks  = React.memo((props: ProfileStatusProps) => {
    const dispatch = useDispatch()
    const myId = useSelector<AppStateType, string|null>(state => state.auth.userId)
    const userId = useSelector<AppStateType, number|undefined>( state=> state.profilePage.profile?.userId)
    const isMyStatus = (myId == userId?.toString())
    const status = useSelector<AppStateType, string>(state => state.profilePage.status)

    const [newStatus, setNewStatus] = useState<string>(status)

    useEffect(()=>{
        isMyStatus && dispatch(updateStatus(newStatus))
    }, [newStatus])


    return <>
        { !isMyStatus && <Paragraph strong editable={false} style={{fontSize: 20, width: 250}}>{status}</Paragraph>}
        { isMyStatus && <Paragraph strong editable={{ onChange: setNewStatus }} style={{fontSize: 20, width: 250}}>{status}</Paragraph>}
    </>
})