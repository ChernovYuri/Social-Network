import React, {useEffect} from 'react';
import './App.css';
import {Header} from "components/Header/Header";
import {Navbar} from "components/Navbar/Navbar";
import {Profile} from "components/Profile/Profile";
import {Messenger} from "components/Messenger/Messenger";
import {Route, Routes} from 'react-router-dom';
import {News} from "components/News/News";
import {Music} from "components/Music/Music";
import {Settings} from "components/Settings/Settings";
import {AppRootStateType, store} from "redux/store";
import {Users} from "components/Users/Users";

type PropsType = {
    store: AppRootStateType
}

export const App = () => {
    const profile = store.getState().profile
    const messenger = store.getState().messenger
    const users = store.getState().users
    return (
        <div className='appWrapper'>
            <Header title={'SOCIAL WEB'}/>
            <Navbar/>
            <div className={'appWrapperContent'}>
                <Routes>
                    <Route path="/profile/:userId"
                           element={<Profile/>}/>
                    <Route path="/messenger/*"
                           element={<Messenger messengerPage={messenger}
                           />}/>
                    <Route path="/news"
                           element={<News/>}/>
                    <Route path="/music"
                           element={<Music/>}/>
                    <Route path="/Users"
                           element={<Users usersPage={users}/>}/>
                    <Route path="/settings"
                           element={<Settings/>}/>
                </Routes>
            </div>
        </div>
    );
}