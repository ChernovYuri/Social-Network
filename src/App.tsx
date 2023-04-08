import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {Navbar} from "./components/Navbar/Navbar";
import {Profile} from "./components/Profile/Profile";
import {Messenger} from "./components/Messenger/Messenger";
import {Route, Routes} from 'react-router-dom';
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {Settings} from "./components/Settings/Settings";
import {RootStateType, store, StoreType} from "./redux/state";

type PropsType = {
    store: StoreType
    /*    state: RootStateType
    addPost: () => void
    onChangeCallback: (newText: string) => void*/
}

const App: React.FC<PropsType> = (props) => {
    return (
        <div className='appWrapper'>
            <Header title={'SOCIAL WEB'}/>
            <Navbar/>
            <div className={'appWrapperContent'}>
                <Routes>
                    {/*<Route path="/"
                           element={<Profile profilePage={props.state.profilePage}
                                             onChangeCallback={props.onChangeCallback}
                                             addPost={props.addPost}/>}/>*/}
                    <Route path="/profile"
                           element={<Profile profilePage={props.store.getState().profilePage}
                                             dispatch={props.store.dispatch.bind(store)}/>}/>
                    <Route path="/messenger/*"
                           element={<Messenger messengerPage={props.store.getState().messengerPage}
                                               dispatch={props.store.dispatch.bind(store)}/>}/>
                    <Route path="/news"
                           element={<News/>}/>
                    <Route path="/music"
                           element={<Music/>}/>
                    <Route path="/settings"
                           element={<Settings/>}/>
                </Routes>
            </div>
        </div>
    );
}
export default App;
