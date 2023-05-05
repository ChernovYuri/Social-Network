import React from 'react';
import s from "./ProfileInfo.module.css";
import {useSelector} from "react-redux";
import {AppRootStateType} from "redux/store";
import avatar from "../../.././assets/avatars/avatar.svg"

export const ProfileInfo = () => {
    const profile = useSelector((store: AppRootStateType) => store.profile)

    return (
        <div>
            <img className={s.profileWallpaper} src={profile.profileWallpaper} alt={"Profile's wallpaper"}/>
            <div className={s.descriptionBlock}>
                <img className={s.avaImg} src={profile.photos.small ? profile.photos.small : avatar}
                     alt={"Profile's avatar"}/>
                <div className={s.userAndJobInfo}>
                    <span className={s.userInfo}>
                        <span className={s.userName}>{profile.fullName}</span>
                        <span className={s.userAboutMe}>{profile.aboutMe}</span>
                    </span>
                    <span className={s.userJobInfo}>
                        <span className={s.userName}>{profile.lookingForAJob ? 'Looking for job' : "Don't looking for job"}</span>
                        <span className={s.userAboutMe}>{profile.lookingForAJobDescription}</span>
                    </span>
                </div>
            </div>
        </div>
    )
}