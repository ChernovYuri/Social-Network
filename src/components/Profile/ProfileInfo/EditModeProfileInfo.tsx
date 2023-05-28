import React, {ChangeEvent, useState} from 'react';
import s from "./ProfileInfo.module.css";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "redux/store";
import avatar from "assets/avatars/defaultAvatar.svg"
import {ContactsType, updateProfile} from "redux/profile/profileReducer";
import {Checkbox} from "@mui/material";
import {UpdatedProfileType} from "api/api";
import {useNavigate} from "react-router-dom";

export const EditModeProfileInfo = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const profile = useSelector((store: AppRootStateType) => store.profile)
    const userId = useSelector((store: AppRootStateType) => store.auth.id)

    const [isLookingForJobCheckbox, setIsLookingForJobCheckbox] = useState<boolean>(profile.lookingForAJob)
    const [jobDescription, setJobDescription] = useState<string>(profile.lookingForAJobDescription)
    const [fullName, setFullName] = useState<string>(profile.fullName)
    const [aboutMe, setAboutMe] = useState<string>(profile.aboutMe)
    const [contactValues, setContactValues] = useState<ContactsType>(profile.contacts);


    const setContactHandler = (e: ChangeEvent<HTMLInputElement>, contact: string) => {
        const newContactValues = {
            ...contactValues,
            [contact]: e.currentTarget.value,
        };

        setContactValues(newContactValues);
    };


    const updatedProfile: UpdatedProfileType = {
        userId: userId,
        lookingForAJob: isLookingForJobCheckbox,
        lookingForAJobDescription: jobDescription,
        fullName: fullName,
        aboutMe: aboutMe,
        contacts: {...contactValues}
    }

    const updateProfileHandler = () => {
        updateProfile(updatedProfile)(dispatch).then(res => {
            if (res) {
                res.data.resultCode === 0 && navigate('/profile')
            }
        })
    }

    return (
        <div>
            <img className={s.profileWallpaper} src={profile.profileWallpaper} alt={"Profile's wallpaper"}/>
            <button className={s.editModeButton} onClick={() => updateProfileHandler()}>SAVE</button>
            <div className={s.descriptionBlock}>
                <img className={s.avaImg} src={profile.photos.small ? profile.photos.small : avatar}
                     alt={"Profile's avatar"}/>
                <div className={s.userAndJobInfo}>
                    <span className={s.userInfo}>
                        Name:<input className={s.userName} value={fullName}
                                    placeholder={'Set your name'}
                                    onChange={e => setFullName(e.currentTarget.value)}/>
                        About me:<input className={s.userAboutMe} value={aboutMe}
                                        placeholder={'Set information about you'}
                                        onChange={e => setAboutMe(e.currentTarget.value)}/>
                    </span>
                    <span className={s.userJobInfo}>
                        <span className={s.lookingForJob}>
                            <Checkbox checked={isLookingForJobCheckbox}
                                      title={'Looking for job?'}
                                      onChange={() => setIsLookingForJobCheckbox(!isLookingForJobCheckbox)}/>
                            Looking for job?
                        </span>
                        <input className={s.userAboutMe} value={jobDescription}
                               onChange={e => setJobDescription(e.currentTarget.value)}
                               placeholder={'Description for job'}/>
                    </span>
                </div>
            </div>
            <div className={s.userStatus}>
                {profile.status}
                <div className={s.contacts}>
                    Contacts: {Object.keys(profile.contacts).map((key, i) => {
                    return <div key={i}><b>{key}</b>:
                        <input value={contactValues[key]}
                               onChange={e => setContactHandler(e, key)}/>
                    </div>
                })}
                </div>
            </div>
        </div>
    )
}