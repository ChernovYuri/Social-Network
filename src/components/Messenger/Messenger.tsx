import React, {ChangeEvent, useEffect} from 'react';
import s from './Messenger.module.css'
import {Message} from "./Message/Message";
import {ChatItem} from "./ChatItem/ChatItem";
import {AppRootStateType, store} from "redux/store";
import {onChangeNewMessageTextAC, sendMessageAC} from "redux/messengerReducer";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

export const Messenger = () => {
    const messengerPage = useSelector((state: AppRootStateType) => state.messenger)
    const isAuth = useSelector((state: AppRootStateType) => state.auth.isAuth)
    const navigate = useNavigate()

    const sendMessage = () => {
        store.dispatch(sendMessageAC())
    }
    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        store.dispatch(onChangeNewMessageTextAC(e.currentTarget.value))
    }

    useEffect(()=>{
        if (!isAuth) {
            navigate('/login')
        }
    },[isAuth])

    return (
        <div className={s.messenger}>
            <div className={s.chats}>
                <ul>
                    {messengerPage.chats.map(u => {
                        return (
                            <li key={u.id}>
                                <ChatItem id={u.id} name={u.name}/>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className={s.messages}>
                {messengerPage.messages.map(m => {
                    return (
                        <Message key={m.id} id={m.id} message={m.message}/>
                    )
                })}
                <textarea placeholder={'Write your message'}
                          onChange={onChangeHandler}
                          value={messengerPage.newMessageText}/>
                <button onClick={sendMessage}>Send message</button>
            </div>
        </div>
    )
}