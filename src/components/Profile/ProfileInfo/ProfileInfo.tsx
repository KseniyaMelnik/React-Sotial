import React, {ChangeEvent} from "react";
import s from './ProfileInfo.module.css';
import {Preloader} from "../../common/preloader/Preloader";
import {ProfilePropsType} from "../ProfileContainer";
import {ProfileStatusWidthHooks} from "./ProfileStatusWidthHooks";
import userPhoto from "../../../Assets/Images/avatar.png"

type ProfileInfoPropsType = {
    profile: ProfilePropsType
    status: string
    updateStatus: (status: string)=> void
    isOwner: boolean
    savePhoto: any
}

const ProfileInfo = (props: ProfileInfoPropsType) => {
    if (!props.profile) {
        return <Preloader />
    }
    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
         if (e.target.files !== null) {
             props.savePhoto(e.target.files[0])
         }
    }
    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large || userPhoto}/>
                {props.isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}
                <ProfileStatusWidthHooks status = {props.status} updateStatus={props.updateStatus}/>
                <div>{props.profile.fullName}</div>
                <div>{props.profile.lookingForAJobDescription}</div>
                <span>{props.profile.aboutMe}</span>
                <div>
                    <ul>
                        <li><a>{props.profile.contacts.facebook}</a></li>
                        <li><a>{props.profile.contacts.github}</a></li>
                        <li><a>{props.profile.contacts.instagram}</a></li>
                        <li><a>{props.profile.contacts.mainLink}</a></li>
                        <li><a>{props.profile.contacts.twitter}</a></li>
                        <li><a>{props.profile.contacts.vk}</a></li>
                        <li><a>{props.profile.contacts.website}</a></li>
                        <li><a>{props.profile.contacts.youtube}</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default ProfileInfo;