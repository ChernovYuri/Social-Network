import s from "../Messenger.module.css";
import {NavLink} from "react-router-dom";
import React, {memo} from "react";
import {UserType} from "redux/messenger/messengerReducer";


export const ChatItem = memo((props: UserType) => {
    const classNameHandler = (navData: any) => navData.isActive ? s.active : s.chat
    return (
        <div className={s.chat}>
            <NavLink to={'/messenger/' + props.id} className={classNameHandler}>{props.name}</NavLink>
        </div>
    )
})
