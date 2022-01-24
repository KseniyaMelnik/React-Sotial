import React, {ChangeEvent, useState} from "react";

type ProfileStatusProps = {
    status: string
    updateStatus: (status: string)=> void
}

export const ProfileStatusWidthHooks  = (props: ProfileStatusProps) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [status, setStatus] = useState<string>(props.status)

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

        return <>
            {!editMode &&
                <div>
                    <span onDoubleClick={activateEditMode}><b>{props.status|| '----'}</b></span>
                </div>
            }
            {editMode &&
                <div>
                    <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} type="text" value={status}/>
                </div>
            }
        </>

}