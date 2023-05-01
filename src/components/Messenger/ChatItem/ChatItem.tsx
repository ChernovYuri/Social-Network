import s from "../Messenger.module.css";
import {NavLink} from "react-router-dom";
import React from "react";
import {UserType} from "redux/store";


export const ChatItem = (props: UserType) => {
    const classNameHandler = (navData: any) => navData.isActive ? s.active : s.chat
    return (
        <div className={s.chat}>
            <NavLink to={'/messenger/' + props.id} className={classNameHandler}>{props.name}</NavLink>
        </div>
    )
}
