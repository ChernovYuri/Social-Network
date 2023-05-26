import React, {ChangeEvent, useState} from 'react';
import s from "./ProfileInfo.module.css";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "redux/store";
import avatar from "../../.././assets/avatars/avatar.svg"
import {updateProfile} from "redux/profile/profileReducer";
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
    const [contactValues, setContactValues] = useState(profile.contacts);
    // const [github, setGithub] = useState<string>(profile.contacts.github)
    // const [vk, setVk] = useState<string>(profile.contacts.vk)
    // const [facebook, setFacebook] = useState<string>(profile.contacts.facebook)
    // const [instagram, setInstagram] = useState<string>(profile.contacts.instagram)
    // const [twitter, setTwitter] = useState<string>(profile.contacts.twitter)
    // const [website, setWebsite] = useState<string>(profile.contacts.website)
    // const [youtube, setYoutube] = useState<string>(profile.contacts.youtube)
    // const [mainLink, setMainLink] = useState<string>(profile.contacts.mainLink)

    const setContactHandler = (e: ChangeEvent<HTMLInputElement>, contact: string) => {
        setContactValues(prevState => ({
            ...prevState,
            [contact]: e.currentTarget.value
        }));
    }

    const updatedProfile: UpdatedProfileType = {
        userId: userId,
        lookingForAJob: isLookingForJobCheckbox,
        lookingForAJobDescription: jobDescription,
        fullName: fullName,
        aboutMe: aboutMe,
        contacts: {...contactValues}
    }

    // const setContactHandler = (e: ChangeEvent<HTMLInputElement>, contact: string) => {
    //     switch (contact) {
    //         case 'github':
    //             setGithub(e.currentTarget.value);
    //             break;
    //         case 'vk':
    //             setVk(e.currentTarget.value);
    //             break;
    //         case 'facebook':
    //             setFacebook(e.currentTarget.value);
    //             break;
    //         case 'instagram':
    //             setInstagram(e.currentTarget.value);
    //             break;
    //         case 'twitter':
    //             setTwitter(e.currentTarget.value);
    //             break;
    //         case 'website':
    //             setWebsite(e.currentTarget.value);
    //             break;
    //         case 'youtube':
    //             setYoutube(e.currentTarget.value);
    //             break;
    //         case 'mainLink':
    //             setMainLink(e.currentTarget.value);
    //             break;
    //         default:
    //             break;
    //     }
    // }

    const updateProfileHandler = () => {
        updateProfile(updatedProfile)(dispatch)
            .then(() => navigate('/profile'))
    }

    return (
        <div>
            <img className={s.profileWallpaper} src={profile.profileWallpaper} alt={"Profile's wallpaper"}/>
            <button onClick={() => updateProfileHandler()}>SAVE</button>
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
                        Looking for job?
                        <Checkbox checked={isLookingForJobCheckbox} title={'Looking for job?'}
                                  onChange={() => setIsLookingForJobCheckbox(!isLookingForJobCheckbox)}/>
                        <input className={s.userAboutMe} value={jobDescription}
                               onChange={e => setJobDescription(e.currentTarget.value)}
                               placeholder={'Description for job'}/>
                    </span>
                </div>
            </div>
            <div className={s.userStatus}>
                {profile.status}
                <div className={s.contacts}>
                    Contacts: {Object.keys(profile.contacts).map((key,i) => {
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