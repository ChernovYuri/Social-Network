import React, {useEffect} from 'react';
import {followUserAC, setPageAC, setUsersAC, UsersDomainType, UsersPageType, UsersType} from "redux/usersReducer";
import s from './Users.module.css'
import {useAppDispatch} from "redux/store";
import axios from 'axios';
import avatar from '../.././assets/avatars/avatar.svg'
import {Pagination} from "common/components/Pagination";

type usersPageProps = {
    usersPage: UsersDomainType
}

export const Users = (props: usersPageProps) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        // if(props.usersPage.items.length === 0) {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${props.usersPage.currentPage}`).then(res => {
            dispatch(setUsersAC(res.data))
        })
        // }
    }, [props.usersPage.currentPage])

    const followButtonHandler = (userId: number, isFollowed: boolean) => {
        debugger
        dispatch(followUserAC(userId, isFollowed))
    }
    const setPageHandler = (page: number) => {
        debugger
        dispatch(setPageAC(page))
    }
    let totalPages = Math.ceil(props.usersPage.totalCount / props.usersPage.pageSize)

    return (
        <div className={s.usersPageContainer}>
            <Pagination currentPage={props.usersPage.currentPage}
                        totalPages={totalPages}
                        onChangePage={setPageHandler}/>
            {props.usersPage.items.map(u => (
                <div key={u.id} className={s.userContainer}>
                    <div className={s.picAndFollow}>
                        <img className={s.userPic} src={u.photos.small !== null ? u.photos.small : avatar}
                             alt={u.name}/>
                        <button
                            onClick={() => followButtonHandler(u.id, u.followed)}>{u.followed ? 'UNFOLLOW' : 'FOLLOW'}
                        </button>
                    </div>
                    <div className={s.description}>
                                <span>
                                    <div className={s.userName}>{u.name}</div>
                                    <div>{u.status}</div>
                                    {/*<div>{u.description}</div>*/}
                                    {/*<div>{u.location.country + ', ' + u.location.city}</div>*/}
                                </span>
                    </div>
                </div>
            ))}
        </div>
    );
};
