import React from "react";
import {UserType} from "../../Redux/users-reducer";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import { Field, Form, Formik } from 'formik';


type UsersPropsType = {
    users: Array<UserType>
    follow: (userID: number) => void,
    unfollow: (userID: number) => void,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    setCurrentPage: (p: number) => void
    onPageChanged: (pageNumber: number) => void
    followingInProgress: number[]
}

const Users = (props: UsersPropsType) => {
    return <div>
        <UsersSearchForm />
        <Paginator onPageChanged={props.onPageChanged}
                   totalCount={props.totalUsersCount}
        />
        <div>
            {
                props.users.map(u => <User user={u}
                                           followingInProgress={props.followingInProgress}
                                           follow={props.follow}
                                           unfollow={props.unfollow}
                                           key={u.id}
                />)
            }
        </div>
    </div>

}
const usersSearchFormValidate = (values:any) => {
    const errors = {};
    return errors;
}
type UsersSearchFormObjectType = {
    term: string
}
const UsersSearchForm = ()=> {
    const submit = (values: UsersSearchFormObjectType, { setSubmitting }:{setSubmitting: (isSubmitting: boolean) => void}) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 400);
    }
    return <div>
        <Formik
            initialValues={{ term: '' }}
            validate={usersSearchFormValidate}
            onSubmit={submit}
        >
            {({isSubmitting}) => (
                <Form >
                    <Field
                        type="text"
                        name="term"
                    />
                    <button type="submit" disabled={isSubmitting}>
                        Find
                    </button>
                </Form>
            )}
        </Formik>
    </div>
}
export default Users