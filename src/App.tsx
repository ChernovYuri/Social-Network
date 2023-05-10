import React from 'react';
import './App.css';
import {Header} from "components/Header/Header";
import {Navbar} from "components/Navbar/Navbar";
import {Profile} from "components/Profile/Profile";
import {Messenger} from "components/Messenger/Messenger";
import {Route, Routes} from 'react-router-dom';
import {AppRootStateType, store} from "redux/store";
import {Users} from "components/Users/Users";
import {Login} from "components/Login/Login";

export const App = () => {
    return (
        <div className='appWrapper'>
            <Header/>
            <Navbar/>
            <div className={'appWrapperContent'}>
                <Routes>
                    <Route path="/profile/:userId"
                           element={<Profile/>}/>
                    <Route path="/messenger/*"
                           element={<Messenger/>}/>
                    <Route path="/users"
                           element={<Users/>}/>
                    <Route path="/login"
                           element={<Login/>}/>
                </Routes>
            </div>
        </div>
    );
}