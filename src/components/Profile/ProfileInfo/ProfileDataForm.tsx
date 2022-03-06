import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../../common/formControls/FormControls";


type ProfileDataType =  {
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

export const ProfileDataForm : React.FC<InjectedFormProps<ProfileDataType>> = (props)=> {
    return  <form onSubmit={props.handleSubmit}>
           <div> <button onClick={()=> {}}>Save</button></div>
        <div> <b>About me</b> <Field name={"aboutMe"} component={Input}/></div>
        <div><b>Full name: </b> <Field name={"fullName"} component={Input}/></div>
        <div>
            <div>
                <b>Looking for a job</b> : <Field type="checkbox" name={"lookingForAJob"} component={Input}/>
            </div>
            <div><b> My professional skills </b> <Field type="text" name={"lookingForAJobDescription"} component={Input}/></div>

            {/*<div>
                <b>Contacts: </b> {Object.keys(props.profile.contacts).map((key) => {
                // @ts-ignore
                return <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key]}/>
            })}
            </div>*/}
        </div>
    </form>
}

export const ProfileDataReduxForm = reduxForm<ProfileDataType>({
    form: "profileData"
}) (ProfileDataForm)