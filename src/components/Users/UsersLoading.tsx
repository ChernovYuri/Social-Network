import React from 'react';
import {Skeleton} from "@mui/material";
import s from "components/Users/Users.module.css";

export const UsersLoading = () => {
    return (
        <div className={s.usersPageContainer}>
            <div>
                <Skeleton className={s.paginationLoading} variant="rounded" />
            </div>
            <div>
                    <Skeleton className={s.userLoading} variant="rounded" height={'130px'}/>
            </div>
            <div>
                    <Skeleton className={s.userLoading} variant="rounded" height={'130px'} />
            </div>
            <div>
                    <Skeleton className={s.userLoading} variant="rounded" height={'130px'} />
            </div>
            <div>
                    <Skeleton className={s.userLoading} variant="rounded" height={'130px'} />
            </div>
        </div>
    );
};
