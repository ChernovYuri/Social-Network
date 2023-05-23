import s from "../Messenger.module.css";
import React from "react";
import {MessageType} from "redux/messenger/messengerReducer";



export const Message = (props: MessageType) => {
    return (
        <div key={props.id} className={s.message}>{props.message}</div>
    )
}