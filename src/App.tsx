import React, {useEffect} from 'react';
import s from './App.module.css'
import {Header} from "components/Header/Header";
import {Navbar} from "components/Navbar/Navbar";
import {Profile} from "components/Profile/Profile";
import {Messenger} from "components/Messenger/Messenger";
import {Navigate, Route, Routes} from 'react-router-dom';
import {AppRootStateType, useAppDispatch} from "redux/store";
import {Users} from "components/Users/Users";
import {Login} from "components/Login/Login";
import {useSelector} from "react-redux";
import {PreLoader} from "components/PreLoader/PreLoader";
import {authMe} from "redux/authReducer";
import {CircularProgress} from "@mui/material";


export const App = () => {
    const {isInitialized, isAppLoading} = useSelector((state: AppRootStateType) => state.app)
    const userId = useSelector((state: AppRootStateType) => state.auth.id)
    const dispatch = useAppDispatch()

    useEffect(() => {
        authMe()(dispatch)
    }, [])

    if (!isInitialized) {
        return (
            <div>
                <PreLoader/>
            </div>
        )
    } else {
        return (
            <div className={s.appWrapper}>
                <div className={s.header}>
                    <Header/>
                </div>
                <div className={s.appWrapperContent}>
                    <div className={s.navBar}>
                        <Navbar/>
                    </div>

                    <div className={s.appContent}>
                        {isAppLoading ?
                            <CircularProgress />
                            :
                        <Routes>
                            <Route path="/profile"
                                   element={<Navigate to={`/profile/${userId}`}/>}/>
                            <Route path="/profile/:userId"
                                   element={<Profile/>}/>
                            <Route path="/messenger/*"
                                   element={<Messenger/>}/>
                            <Route path="/users"
                                   element={<Users/>}/>
                            <Route path="/login"
                                   element={<Login/>}/>
                            <Route path="/loading"
                                   element={<PreLoader/>}/>
                            <Route path="/"
                                   element={<Navigate to={'/login'}/>}/>
                        </Routes>
                        }
                    </div>
                </div>
            </div>
        )
    }
}