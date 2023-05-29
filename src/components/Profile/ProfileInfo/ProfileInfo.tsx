import React, {ChangeEvent, useState} from 'react';
import s from "./ProfileInfo.module.css";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "redux/store";
import avatar from "assets/avatars/defaultAvatar.svg"
import {EditableStatus} from "common/components/EditableStatus";
import {updateAvatar, updateStatus} from "redux/profile/profileReducer";
import {EditModeProfileInfo} from "components/Profile/ProfileInfo/EditModeProfileInfo";
import {UserContacts} from "components/Profile/ProfileInfo/UserContacts";
import {FileInput} from "components/Profile/ProfileInfo/FileInput";

export const ProfileInfo: React.FC = () => {
    const dispatch = useAppDispatch()
    const profile = useSelector((store: AppRootStateType) => store.profile)
    const auth = useSelector((store: AppRootStateType) => store.auth)
    const isOwner = (profile.userId === auth.id)
    const isContactsEmpty = Object.values(profile.contacts).every((value) => {
        return value === null || value.trim() === '';
    });

    const [isEditMode, setEditMode] = useState<boolean>(false)

    const updateStatusHandler = (newTitle: string) => {
        updateStatus(newTitle)(dispatch)
    }

    const updateAvatarHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            updateAvatar(file)(dispatch)
        }
    }

    if (isEditMode) {
        return <EditModeProfileInfo/>
    } else {
        return (
            <div>
                <img className={s.profileWallpaper} src={profile.profileWallpaper} alt={"Profile's wallpaper"}/>
                {isOwner && <button className={s.editModeButton} onClick={() => setEditMode(true)}>Edit mode</button>}
                <div className={s.descriptionBlock}>
                    <div className={s.avaBlock}>
                        <img className={s.avaImg} src={profile.photos.small ? profile.photos.small : avatar}
                             alt={"Profile's avatar"}/>
                            {isOwner && <FileInput callback={updateAvatarHandler}/>}
                    </div>
                    <div className={s.userAndJobInfo}>
                    <span className={s.userInfo}>
                        <span className={s.userName} title={'Name'}>{profile.fullName}</span>
                        <span className={s.userAboutMe} title={`About`}>{profile.aboutMe}</span>
                    </span>
                        <span className={s.userJobInfo}>
                        <span
                            className={s.lookingForJob}>{profile.lookingForAJob ? 'Looking for job' : "Don't looking for job"}</span>
                        <span className={s.userAboutMe}>{profile.lookingForAJobDescription}</span>
                    </span>
                    </div>
                </div>
                <div className={s.userStatus} title={`Status`}>
                    {'Status: '}
                    {isOwner
                        ? profile.status
                            ? <EditableStatus oldTitle={profile.status} callBack={updateStatusHandler}/>
                            : <EditableStatus oldTitle={'You have no status'} callBack={updateStatusHandler}/>
                        : profile.status
                    }
                    {!isContactsEmpty && <UserContacts contacts={profile.contacts}/>}
                </div>
            </div>
        )
    }
}