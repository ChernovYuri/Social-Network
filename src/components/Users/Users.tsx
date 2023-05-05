import React, {useEffect} from 'react';
import {followUserAC, setLoadingAC, setPageAC, setUsersAC, unfollowUserAC} from "redux/usersReducer";
import s from './Users.module.css'
import {AppRootStateType, useAppDispatch} from "redux/store";
import avatar from '../.././assets/avatars/avatar.svg'
import {Pagination} from "common/components/Pagination";
import {UsersLoading} from "components/Users/UsersLoading";
import {useNavigate} from 'react-router-dom';
import {usersAPI} from "api/api";
import {useSelector} from "react-redux";

export const Users = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const usersPage = useSelector((store: AppRootStateType) => store.users)

    useEffect(() => {
        usersAPI.getUsers(usersPage.currentPage).then(res => {
            dispatch(setUsersAC(res.data))
        }).then(() => {
            dispatch(setLoadingAC(false))
        })
    }, [usersPage.currentPage])

    const followButtonHandler = (userId: number) => {
        usersAPI.followUser(userId).then(res => {
            if (res.data.resultCode === 0) {
                dispatch(followUserAC(userId))
            }
        })
    }
    const unfollowButtonHandler = (userId: number) => {
        usersAPI.unfollowUser(userId).then(res => {
            if (res.data.resultCode === 0) {
                dispatch(unfollowUserAC(userId))
            }
        })
    }


    const setPageHandler = (page: number) => {
        dispatch(setPageAC(page))
    }

    const totalPages = Math.ceil(usersPage.totalCount / usersPage.pageSize)
    if (usersPage.isLoading) {
        return <UsersLoading/>
    } else {
        return (
            <div className={s.usersPageContainer}>
                <Pagination currentPage={usersPage.currentPage}
                            totalPages={totalPages}
                            onChangePage={setPageHandler}/>
                {usersPage.items.map(u => (
                    <div key={u.id} className={s.userContainer}>
                        <div className={s.picAndFollow}>
                            <img className={s.userPic} src={u.photos.small !== null ? u.photos.small : avatar}
                                 alt={u.name} onClick={() => {
                                navigate(`/profile/${u.id}`)
                            }}/>
                            {u.followed ?
                                <button
                                    onClick={() => unfollowButtonHandler(u.id)}>UNFOLLOW
                                </button>
                                :
                                <button
                                    onClick={() => followButtonHandler(u.id)}>FOLLOW
                                </button>
                            }
                        </div>
                        <div className={s.description}>
                                <span>
                                    <div className={s.userName}>{u.name}</div>
                                    <div className={s.userStatus}>{u.status}</div>
                                </span>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
};
