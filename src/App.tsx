import React from 'react';
import './App.css';
import {Header} from "components/Header/Header";
import {Navbar} from "components/Navbar/Navbar";
import {Profile} from "components/Profile/Profile";
import {Messenger} from "components/Messenger/Messenger";
import {Route, Routes} from 'react-router-dom';
import {AppRootStateType, store} from "redux/store";
import {Users} from "components/Users/Users";

type PropsType = {
    store: AppRootStateType
}

export const App = () => {
    const messenger = store.getState().messenger
    return (
        <div className='appWrapper'>
            <Header/>
            <Navbar/>
            <div className={'appWrapperContent'}>
                <Routes>
                    <Route path="/profile/:userId"
                           element={<Profile/>}/>
                    <Route path="/messenger/*"
                           element={<Messenger messengerPage={messenger}
                           />}/>
                    <Route path="/Users"
                           element={<Users/>}/>
                </Routes>
            </div>
        </div>
    );
}