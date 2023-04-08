import React, {ChangeEvent, useRef} from 'react';
import s from './Messenger.module.css'
import {Message} from "./Message/Message";
import {ChatItem} from "./ChatItem/ChatItem";
import {MessengerPropsType, onChangeNewMessageTextAC, sendMessageAC} from "../../redux/state";

export const Messenger = (props: MessengerPropsType) => {
    let newMessage = useRef<HTMLTextAreaElement>(null)
    const sendMessage = () => {
        props.dispatch(sendMessageAC())
    }
    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.dispatch(onChangeNewMessageTextAC(e.currentTarget.value))
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