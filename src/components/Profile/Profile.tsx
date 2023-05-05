import React, {useEffect} from 'react';
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPosts} from "./Posts/MyPosts";
import {AppRootStateType, useAppDispatch} from "redux/store";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import axios from "axios";
import {setLoadingAC, setProfileAC} from "redux/profileReducer";
import {ProfileLoading} from "components/Profile/ProfileLoading";

export const Profile = () => {

    const dispatch = useAppDispatch()
    const { userId } = useParams();
    const isLoading = useSelector((store:AppRootStateType)=>store.profile.isLoading)

    useEffect(() => {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`).then(res => {
            dispatch(setProfileAC(res.data))
        }).then(()=>{
            dispatch(setLoadingAC(false))
        })
    }, [userId])

    if (isLoading) {
        return <ProfileLoading/>
    }
    else{
    return (
        <div>
            <ProfileInfo/>
            {/*'https://cdn.wallpaperjam.com/c2b45a1d3e2100ab203b8f03ba3c50a247d48035/landscapes-roads-multiscreen.jpg'*/}
            <MyPosts/>
        </div>
    )
}}