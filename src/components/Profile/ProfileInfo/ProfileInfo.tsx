import React, {memo} from 'react';
import s from "./ProfileInfo.module.css";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "redux/store";
import avatar from "../../.././assets/avatars/avatar.svg"
import {EditableStatus} from "common/components/EditableStatus";
import {updateStatus} from "redux/profile/profileReducer";

export const ProfileInfo = () => {
    const dispatch = useAppDispatch()
    const profile = useSelector((store: AppRootStateType) => store.profile)
    const auth = useSelector((store: AppRootStateType) => store.auth)

    const updateStatusHandler = (newTitle: string) => {
        updateStatus(newTitle)(dispatch)
    }

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
            <div className={s.userStatus}>
                {profile.userId === auth.id
                    ? profile.status
                        ? <EditableStatus oldTitle={profile.status} callBack={updateStatusHandler}/>
                        : <EditableStatus oldTitle={'You have no status'} callBack={updateStatusHandler}/>
                    : profile.status
                }
            </div>
        </div>
    )
}