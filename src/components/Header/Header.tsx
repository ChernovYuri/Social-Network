import React, {useEffect} from 'react';
import s from './Header.module.css'
import {AppRootStateType, useAppDispatch} from "redux/store";
import {authMe} from "redux/authReducer";
import {useSelector} from "react-redux";

export const Header: React.FC = () => {
    const dispatch = useAppDispatch()
    const auth = useSelector((store: AppRootStateType) => store.auth)

    useEffect(()=>{
        loginHandler()
    },[])

    const loginHandler = () => {
        authMe()(dispatch)
    }
    return (
        <header className={s.header}>
            <img className={s.companyLogo}
                 src='https://www.sweet-lavka.ru/upload/iblock/0e9/6wg7yre7thjjifwyfcxargegzpuyji1n.png'
                 alt={"company's logo"}/>
            <span>SOCIAL WEB</span>
            <div className={s.loginBlock}>
                <span className={s.login} onClick={() => {
                    loginHandler()
                }}>{auth.isAuth ? auth.login : 'Log in'}</span>
            </div>
        </header>
    )
}