import React from 'react';
import s from './Header.module.css'
import {AppRootStateType, useAppDispatch} from "redux/store";
import {logOut} from "redux/authReducer";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import SWLogo from "../../assets/logos/SWLogo.png"
import loginIcon from "../../assets/icons/loginIcon.png"
import logoutIcon from "../../assets/icons/logoutIcon.png"

export const Header: React.FC = () => {
    const dispatch = useAppDispatch()
    const auth = useSelector((store: AppRootStateType) => store.auth)
    const navigate = useNavigate()

    const loginHandler = () => {
        if (!auth.isAuth) {
            navigate('/login')
        } else {
            logOut()(dispatch).then(() => navigate('/login'))
        }
    }

    return (
        <header className={s.header}>
            <img className={s.projectLogo}
                 src={SWLogo}
                 alt={"Social Web"}/>
            <span>SOCIAL WEB</span>
            <div className={s.loginBlock}
                 onClick={loginHandler}
                 title={auth.isAuth ? "Log out" : "Log in"}>
                <span className={s.log}>
                    {auth.isAuth ? auth.login : 'Log in'}
                </span>
                <img className={s.logIcon} alt={auth.isAuth ? 'Log out' : 'Log in'}
                     src={auth.isAuth ? logoutIcon : loginIcon}/>
            </div>
        </header>
    )
}