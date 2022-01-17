import React from "react";
import s from './Dialogs.module.css';
import DialogItem, {DialogItemPropsType} from "./DialogItem/DialogItem"
import Message, {MessagePropsType} from "./Message/Message"
import {DialogsPropsType} from "./DialogsContainer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../common/formControls/FormControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";

const Dialogs = (props: DialogsPropsType) => {
    let state = props.dialogsPage

    let dialogsElements = state.dialogs.map((d: DialogItemPropsType) => <DialogItem name={d.name} id={d.id}
                                                                                          avatar={d.avatar}/>)
    let messageElements = state.messages.map((m: MessagePropsType) => <Message id={m.id} message={m.message}
                                                                                     avatar={m.avatar}/>)
    const addNewMessage = (values: any) => {
        props.sendMessage(values.newMessageBody)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messageElements}</div>
                <AddMessageFormRedux onSubmit={addNewMessage}/>

            </div>
        </div>
    )
}
export default Dialogs;

const maxLength = maxLengthCreator(50)
const AddMessageForm:React.FC<InjectedFormProps> = (props)=> {
    return <form onSubmit={props.handleSubmit}>
        <Field component={Textarea}
               name ={"newMessageBody"}
               placeholder={"Enter your message"}
               validate={[required, maxLength]}
        />
    <button >Send</button>
    </form>
}

const AddMessageFormRedux = reduxForm({
    form: "DialogsAddMessageForm"
}) (AddMessageForm)