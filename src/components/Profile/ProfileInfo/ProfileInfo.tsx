import React, {ChangeEvent, useState} from "react";
import s from './ProfileInfo.module.css';
import {Preloader} from "../../common/preloader/Preloader";
import {ProfilePropsType} from "../ProfileContainer";
import {ProfileStatusWidthHooks} from "./ProfileStatusWidthHooks";
import userPhoto from "../../../Assets/Images/avatar.png"
import {ProfileDataForm, ProfileDataReduxForm} from "./ProfileDataForm";

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
        //console.log(formData)
        props.saveProfile(formData)
    }
    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large || userPhoto}/>
                {props.isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}
                {editMode
                    ? <ProfileDataReduxForm onSubmit={onSubmit} />
                    : <ProfileData profile={props.profile} status={props.status} updateStatus={props.updateStatus}
                                   isOwner={props.isOwner}
                                   goToEditMode={()=>{setEditMode(true)}}
                    />}
            </div>

        </div>
    )
}

type ProfileDataPropsType = {
    goToEditMode: ()=> void
    status: string
    updateStatus: (status: string)=> void
    isOwner: boolean
    profile: ProfilePropsType
}
const ProfileData = (props: ProfileDataPropsType) => {
    return (
        <>
            <ProfileStatusWidthHooks status={props.status} updateStatus={props.updateStatus}/>
            {props.isOwner && <div>
                <button onClick={props.goToEditMode}>Edit</button>
            </div>}
            <div><b>Full name: </b>{props.profile.fullName}</div>
            <div>
                <div>
                    <b>Looking for a job</b> : {props.profile.lookingForAJob ? "yes" : "no"}
                </div>
                {props.profile.lookingForAJob &&
                <div><b> My professional skills </b>{props.profile.lookingForAJobDescription}</div>
                }
                <span>{props.profile.aboutMe}</span>
                <div>
                    <b>Contacts: </b> {Object.keys(props.profile.contacts).map((key) => {
                    // @ts-ignore
                    return <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key]}/>
                })}
                </div>
            </div>
        </>
    )
}

const Contact: React.FC<ContactPropsType> = ({contactTitle, contactValue}) => {
    return <div className={s.contact}><b>{contactTitle}: </b> {contactValue}</div>
}
type ContactPropsType = {
    contactTitle: string,
    contactValue: string | null
}
export default ProfileInfo;