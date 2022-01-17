import React from 'react';
import {Field,InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../common/formControls/FormControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../Redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../Redux/redux-store";
import s from "../common/formControls/FormControls.module.css"

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Email"}
                       name={"email"}
                       component={Input}
                       validate={[required]}
                />
            </div>
            <div>
                <Field placeholder={"password"}
                       name={"password"}
                       type={"password"}
                       component={Input}
                       validate={[required]}
                />
            </div>
            <div>
                <Field type="checkbox" name={"remember me"} component={Input}/> remember me
            </div>
            { props.error && <div className={s.formSummaryError}>
                {props.error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<FormDataType>({
    form: "login"
}) (LoginForm)

const Login = (props: any) => {
    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }
    
    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    } else {
        return <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    }

}

type MapStatePropsType = {
    isAuth: boolean
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
    isAuth: state.auth.isAuth
}}
export default connect(mapStateToProps, {login})(Login);