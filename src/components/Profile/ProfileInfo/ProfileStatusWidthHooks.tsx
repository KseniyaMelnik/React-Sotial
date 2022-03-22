import React, {useEffect, useState} from "react";
import { Typography } from 'antd';
const { Paragraph } = Typography;


type ProfileStatusProps = {
    status: string
    updateStatus: (status: string)=> void
}

export const ProfileStatusWidthHooks  = (props: ProfileStatusProps) => {

    const [status, setStatus] = useState<string>(props.status)

    useEffect (()=>{
        setStatus(props.status)
    }, [props.status])
    useEffect(()=>{
        props.updateStatus(status)
    }, [status])

    return <>
        <Paragraph editable={{ onChange: setStatus }}>{status}</Paragraph>
    </>

}