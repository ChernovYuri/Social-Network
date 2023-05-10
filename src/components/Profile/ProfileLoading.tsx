import React from 'react';
import {Skeleton} from "@mui/material";
import s from "components/Profile/ProfileLoading.module.css";

export const ProfileLoading = () => {
    return (
        <div>
            <div className={s.wallpaperLoading}>
                <Skeleton variant="rectangular" height={150}/>
            </div>
            <div className={s.profileInfoLoading}>
                <Skeleton variant="rounded" width={80} height={80}/>
                <span className={s.userNameLoading}>
                    <Skeleton variant="rounded" width={180} height={40}/>
                </span>
            </div>
            <div>
            </div>
        </div>
    )
}