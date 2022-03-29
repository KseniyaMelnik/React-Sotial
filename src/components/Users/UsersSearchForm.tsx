import {Field, Form, Formik} from "formik";
import React from "react";
import {FilterType} from "../../Redux/users-reducer";
import s from './Users.module.css'
import {Button} from "antd";

const usersSearchFormValidate = (values: any) => {
    const errors = {};
    return errors;
}
type FormType = {
    term: string
    friend: "true" | "false" | "null"
}
type PropsType = {
   onFilterChanged: (filter: FilterType) => void
}

export const UsersSearchForm: React.FC<PropsType> = React.memo((props ) => {
    const submit = (values: FormType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
     const filter: FilterType = {
         term: values.term,
         friend: values.friend === "null"? null : values.friend === "true" ? true: false
     }
        props.onFilterChanged(filter);
     setSubmitting(false)
    }
    return <div className={s.search}>
        <Formik
            initialValues={{term: '', friend: "null"}}
            validate={usersSearchFormValidate}
            onSubmit={submit}
        >
            {({isSubmitting}) => (
                <Form className={s.form}>
                    <Field type="text" name="term"/>
                    <Field name="friend" as="select" >
                        <option value="null">All</option>
                        <option value="true">Only followed</option>
                        <option value="false">Only unfollowed</option>
                    </Field>
                    <Button htmlType="submit" disabled={isSubmitting}>
                        Find
                    </Button>
                </Form>
            )}
        </Formik>
    </div>
})