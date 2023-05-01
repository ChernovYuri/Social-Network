import React from 'react';
import s from "./ProfileInfo.module.css";
import {ProfileInfoType} from "redux/store";

export type ProfileInfoProps = {
    profileInfo: ProfileInfoType[]
}

export const ProfileInfo = (props: ProfileInfoProps) => {
    debugger
    return (
        <div>
            <img className={s.profileWallpaper} src={props.profileInfo[0].profileWallpaper} alt={"Profile's wallpaper"}/>
            <div className={s.descriptionBlock}>
                <img className={s.avaImg} src={props.profileInfo[0].ava} alt={"Profile's avatar"}/> Name Surname
            </div>
        </div>
    );
};