import React, {memo, useEffect} from 'react';
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPosts} from "./Posts/MyPosts";
import {AppRootStateType, useAppDispatch} from "redux/store";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {getStatus, getUserProfile} from "redux/profile/profileReducer";
import {ProfileLoading} from "components/Profile/ProfileLoading";
import s from './Profile.module.css'

export const Profile: React.FC = () => {

    const dispatch = useAppDispatch()
    const {userId} = useParams();
    const isLoading = useSelector((store: AppRootStateType) => store.profile.isLoading)

    useEffect(() => {
        getUserProfile(userId ? Number(userId) : 2)(dispatch)
        getStatus(userId ? Number(userId) : 0)(dispatch)
    }, [userId])

    if (isLoading) {
        return (
            <div className={s.profilePage}>
                <ProfileLoading/>
            </div>
        )
    } else {
        return (
            <div className={s.profilePage}>
                <ProfileInfo/>
                <MyPosts/>
            </div>
        )
    }
}