import React, {ChangeEvent, useRef} from 'react';
import s from './Messenger.module.css'
import {Message} from "./Message/Message";
import {ChatItem} from "./ChatItem/ChatItem";
import {MessengerPropsType, store, useAppDispatch} from "redux/store";
import {onChangeNewMessageTextAC, sendMessageAC} from "redux/messengerReducer";

export const Messenger = (props: MessengerPropsType) => {
    // const dispatch = useAppDispatch()

    const sendMessage = () => {
        store.dispatch(sendMessageAC())
    }
    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        debugger
        store.dispatch(onChangeNewMessageTextAC(e.currentTarget.value))
    }
    return (
        <div className={s.messenger}>
            <div className={s.chats}>
                <ul>
                    {props.messengerPage.chats.map(u => {
                        return (
                            <li key={u.id}>
                                <ChatItem id={u.id} name={u.name}/>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className={s.messages}>
                {props.messengerPage.messages.map(m => {
                    return (
                        <Message key={m.id} id={m.id} message={m.message}/>
                    )
                })}
                <textarea placeholder={'Write your message'}
                          onChange={onChangeHandler}
                          value={props.messengerPage.newMessageText}/>
                <button onClick={sendMessage}>Send message</button>
            </div>

        </div>
    );
};