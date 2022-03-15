import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../../common/formControls/FormControls";
import s from "../../common/formControls/FormControls.module.css";
import {Button} from "antd";


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
        { props.error && <div className={s.formSummaryError}>
            {props.error}
        </div> }
        <div> <b>About me</b> <Field name={"aboutMe"} component={Input}/></div>
        <div><b>Full name: </b> <Field name={"fullName"} component={Input}/></div>
        <div>
            <div>
                <b>Looking for a job</b> : <Field type="checkbox" name={"lookingForAJob"} component={Input}/>
            </div>
            <div><b> My professional skills </b> <Field type="text" name={"lookingForAJobDescription"} component={Input}/></div>

            <div>

                <b>Contacts: </b> {
                // @ts-ignore
                Object.keys(props.initialValues.contacts).map((key) => {
                return <div key={key}>
                    <b>{key}</b> <Field name={`contacts.${key}`} component={Input}/>
                </div>
            })}
            </div>
        </div>
    </form>
}

export const ProfileDataReduxForm = reduxForm<ProfileDataType>({
    form: "profileData"
}) (ProfileDataForm)