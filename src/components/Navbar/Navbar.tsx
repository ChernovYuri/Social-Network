import React from 'react';
import s from './Navbar.module.css'
import {NavLink} from "react-router-dom";

type NavbarType = {}
// className={`${s.item} ${s.active}`}
export const Navbar: React.FC<NavbarType> = (props: NavbarType) => {
    const classNameHandler = (navData: any) => navData.isActive ? s.active : s.item
    return (
        <nav className={s.nav}>
            <div className={s.item}>
                <NavLink to='/profile' className={classNameHandler}>Profile</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/messenger' className={classNameHandler}>Messages</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/news' className={classNameHandler}>News</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/music' className={classNameHandler}>Music</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/users' className={classNameHandler}>Users</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/settings' className={classNameHandler}>Settings</NavLink>
            </div>
        </nav>
    );
};