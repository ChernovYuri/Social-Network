import React from 'react';
import s from './Navbar.module.css'
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppRootStateType} from "redux/store";

export const Navbar: React.FC = () => {
    const classNameHandler = (navData: any) => navData.isActive ? s.active : s.item
    const userId = useSelector((state: AppRootStateType) => state.auth.id)
    const isAuth = useSelector((state: AppRootStateType) => state.auth.isAuth)


    return (
        <div className={s.nav}>
            <div>
                <div className={s.item} title='Profile'>
                    <NavLink to={isAuth ? `/profile/${userId}` : '/login'} className={classNameHandler}>Profile</NavLink>
                </div>
                <div className={s.item} title='Messenger'>
                    <NavLink to='/messenger' className={classNameHandler}>Messages</NavLink>
                </div>
                <div className={s.item} title='Users'>
                    <NavLink to='/users' className={classNameHandler}>Users</NavLink>
                </div>
            </div>
            <div className={s.item} title='Author of project'>
                <NavLink to='/profile/27640' className={classNameHandler}>
                    <div className={s.author}>Author:</div>
                    @ChernovYuri
                </NavLink>
            </div>
        </div>
    )
}