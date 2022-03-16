import React, {ChangeEvent, useState} from "react";
import s from './ProfileInfo.module.css';
import {Preloader} from "../../common/preloader/Preloader";
import {ProfilePropsType} from "../ProfileContainer";
import {ProfileStatusWidthHooks} from "./ProfileStatusWidthHooks";
import userPhoto from "../../../Assets/Images/avatar.png"
import {ProfileDataReduxForm} from "./ProfileDataForm";
import {Button, Collapse, Input} from "antd";

const { Panel } = Collapse;

type ProfileInfoPropsType = {
    profile: ProfilePropsType
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: any
    saveProfile: any
}

const ProfileInfo = (props: ProfileInfoPropsType) => {
    const [editMode, setEditMode] = useState(false)

    if (!props.profile) {
        return <Preloader/>
    }
    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files !== null) {
            props.savePhoto(e.target.files[0])
        }
    }
    const onSubmit = (formData: any) => {
        props.saveProfile(formData).then(
            ()=> {
                setEditMode(false)
            }
        )
    }
    return (
        <div>
            <div className={s.descriptionBlock}>
                <h2>{props.profile.fullName}</h2>
                <img src={props.profile.photos.large || userPhoto}/>
                {props.isOwner && <Input type={"file"} onChange={onMainPhotoSelected} style={{ width: 250 }}/>}
                {editMode
                    ? <ProfileDataReduxForm initialValues={props.profile} onSubmit={onSubmit}/>
                    : <ProfileData profile={props.profile} status={props.status} updateStatus={props.updateStatus}
                                   isOwner={props.isOwner}
                                   goToEditMode={() => {
                                       setEditMode(true)
                                   }}
                    />}
            </div>

        </div>
    )
}

type ProfileDataPropsType = {
    goToEditMode: () => void
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    profile: ProfilePropsType
}
const ProfileData = (props: ProfileDataPropsType) => {
    return (
        <>
            <ProfileStatusWidthHooks status={props.status} updateStatus={props.updateStatus}/>
            {props.isOwner && <div>
                <Button onClick={props.goToEditMode}>Edit</Button>
            </div>}
            <Collapse style={{width: 300}}>
                <Panel header="About me" key="1">
                    <div>
                        <b>Looking for a job</b> : {props.profile.lookingForAJob ? "yes" : "no"}
                    </div>
                    {props.profile.lookingForAJob &&
                    <div><b> My professional skills </b>{props.profile.lookingForAJobDescription}</div>
                    }
                    <span>{props.profile.aboutMe}</span>
                </Panel>

                <Panel header="Contacts" key="2">
                    {Object.keys(props.profile.contacts).map((key) => {
                        // @ts-ignore
                        return <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key]}/>
                    })}
                </Panel>
            </Collapse>
        </>
    )
}

export const Contact: React.FC<ContactPropsType> = ({contactTitle, contactValue}) => {
    return <div className={s.contact}><b>{contactTitle}: </b> {contactValue}</div>
}
type ContactPropsType = {
    contactTitle: string,
    contactValue: string | null
}
export default ProfileInfo;