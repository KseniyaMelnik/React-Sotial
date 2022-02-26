import React from "react";

export const ProfileDataForm= (props: any) => {
    return  <form onSubmit={props.onSubmit}>
           <div> <button onClick={()=> {}}>Save</button></div>

        <div><b>Full name: </b> <input type="text"/></div>
        <div>
            <div>
                <b>Looking for a job</b> : <input type="checkbox"/>
            </div>
            <div><b> My professional skills </b> <input type="text"/></div>

            <span>{props.profile.aboutMe}</span>
            {/*<div>
                <b>Contacts: </b> {Object.keys(props.profile.contacts).map((key) => {
                // @ts-ignore
                return <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key]}/>
            })}
            </div>*/}
        </div>
    </form>
}