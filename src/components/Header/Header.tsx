import React, {useEffect} from 'react';
import s from './Header.module.css'
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {AppRootStateType, useAppDispatch} from "redux/store";
import {setAuthDataAC, setIsAuthAC} from "redux/authReducer";
import {useSelector} from "react-redux";

export const Header: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const auth = useSelector((store: AppRootStateType) => store.auth)

    useEffect(()=>{
        loginHandler()
    },[])

    const loginHandler = () => {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`,{
            withCredentials: true
        }).then(res => {
            dispatch(setAuthDataAC(res.data.data))
            return res.data
        }).then((data)=>{
            if (data.resultCode === 0) {
                dispatch(setIsAuthAC(true))
            } else{
                console.log(data)
                alert(data.messages[0])
            }
        })
    }
    console.log(auth)
    return (
        <header className={s.header}>
            <img className={s.companyLogo}
                 src='https://www.sweet-lavka.ru/upload/iblock/0e9/6wg7yre7thjjifwyfcxargegzpuyji1n.png'
                 alt={"company's logo"}/>
            <span>SOCIAL WEB</span>
            <div className={s.loginBlock}>
                <span className={s.login} onClick={() => {
                    // navigate('/login')
                    loginHandler()
                }}>{auth.isAuth ? auth.login : 'Log in'}</span>
            </div>
        </header>
    );
};

export type HeaderType = {
    title: string
}