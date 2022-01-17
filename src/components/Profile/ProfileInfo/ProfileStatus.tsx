import React, {ChangeEvent} from "react";

type StateType = {
    editMode: boolean
    status: string
}
type ProfileStatusProps = {
    status: string
    updateStatus: (status: string)=> void
}

export class ProfileStatus extends React.Component<ProfileStatusProps, StateType> {

    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }
    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status)
    }
    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })

    }
    componentDidUpdate(prevProps: Readonly<ProfileStatusProps>, prevState: Readonly<StateType>, snapshot?: any) {
        if(prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return <>
            {!this.state.editMode &&
                <div>
                    <span onDoubleClick={this.activateEditMode}><b>{this.props.status || '----'}</b></span>
                </div>
            }
            {this.state.editMode &&
                <div>
                    <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode} type="text" value={this.state.status}/>
                </div>
            }
        </>
    }
}