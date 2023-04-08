import React from 'react';
import s from "./ProfileInfo.module.css";
import {ProfileInfoProps} from "../../../redux/state";

export const ProfileInfo = (props: ProfileInfoProps) => {
    return (
        <div>
            <img className={s.profileWallpaper} src={props.profileWallpaper} alt={"Profile's wallpaper"}/>
            <div className={s.descriptionBlock}>
                <img className={s.avaImg} src={props.ava} alt={"Profile's avatar"}/> + description
            </div>
        </div>
    );
};