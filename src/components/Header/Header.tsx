import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css';

const Header = (props: any) => {
    return <header className={s.header}>
        <img src={'https://pbs.twimg.com/profile_images/1063925348205821958/DlGcxdOl_400x400.jpg'}/>
        <div className={s.loginBlock}>

            { props.isAuth
                ? <div>{props.login} - <button onClick={props.logout}>Log out</button> </div>
            : <NavLink to={'/login'}>Login </NavLink>}
        </div>
    </header>
}

export default Header;