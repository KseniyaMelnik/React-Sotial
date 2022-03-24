import {Field, Form, Formik} from "formik";
import React from "react";

const usersSearchFormValidate = (values: any) => {
    const errors = {};
    return errors;
}
type UsersSearchFormObjectType = {
    term: string
}
export const UsersSearchForm = () => {
    const submit = (values: UsersSearchFormObjectType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {

    }
    return <div>
        <Formik
            initialValues={{term: ''}}
            validate={usersSearchFormValidate}
            onSubmit={submit}
        >
            {({isSubmitting}) => (
                <Form>
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