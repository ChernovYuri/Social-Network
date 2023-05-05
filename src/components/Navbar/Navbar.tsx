import React from 'react';
import s from './Navbar.module.css'
import {NavLink} from "react-router-dom";

export const Navbar: React.FC = () => {
    const classNameHandler = (navData: any) => navData.isActive ? s.active : s.item
    return (
        <nav className={s.nav}>
            <div className={s.item}>
                <NavLink to='/profile/2' className={classNameHandler}>Profile</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/messenger' className={classNameHandler}>Messages</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/users' className={classNameHandler}>Users</NavLink>
            </div>
        </nav>
    );
};