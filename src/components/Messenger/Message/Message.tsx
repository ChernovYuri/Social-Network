import s from "../Messenger.module.css";
import React from "react";
import {MessagePropsType} from "redux/store";



export const Message = (props: MessagePropsType) => {
    return (
        <div key={props.id} className={s.message}>{props.message}</div>
    )
}