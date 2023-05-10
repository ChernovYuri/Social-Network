import React from 'react';
import s from './Navbar.module.css'
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppRootStateType} from "redux/store";

export const Navbar: React.FC = () => {
    const classNameHandler = (navData: any) => navData.isActive ? s.active : s.item
    const userId = useSelector((state:AppRootStateType)=>state.auth.id)
    const isAuth = useSelector((state: AppRootStateType) => state.auth.isAuth)


    return (
        <nav className={s.nav}>
            <div className={s.item}>
                <NavLink to={isAuth ? `/profile/${userId}` : '/login'} className={classNameHandler}>Profile</NavLink>
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