import React, {useEffect} from 'react';
import {followUserAC, setLoadingAC, setPageAC, setUsersAC, UsersDomainType} from "redux/usersReducer";
import s from './Users.module.css'
import {useAppDispatch} from "redux/store";
import axios from 'axios';
import avatar from '../.././assets/avatars/avatar.svg'
import {Pagination} from "common/components/Pagination";
import {UsersLoading} from "components/Users/UsersLoading";
import { useNavigate } from 'react-router-dom';
import {setProfileAC} from "redux/profileReducer";

type usersPageProps = {
    usersPage: UsersDomainType
}

export const Users = (props: usersPageProps) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        // if(props.usersPage.items.length === 0) {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${props.usersPage.currentPage}`).then(res => {
            dispatch(setUsersAC(res.data))
        }).then(()=>{
            dispatch(setLoadingAC(false))
        })
        // }
    }, [props.usersPage.currentPage])

    // const openProfileHandler = (userId: number) => {
    //
    //     axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`).then(res => {
    //         dispatch(setProfileAC(res.data))
    //     }).then(()=>{navigate(`/profile/${userId}`)
    //     })
    // }
    const followButtonHandler = (userId: number, isFollowed: boolean) => {

        dispatch(followUserAC(userId, isFollowed))
    }
    const setPageHandler = (page: number) => {
        dispatch(setPageAC(page))
    }
    let totalPages = Math.ceil(props.usersPage.totalCount / props.usersPage.pageSize)
    if (props.usersPage.isLoading) {
        return <UsersLoading/>
    }
    else{
    return (
        <div className={s.usersPageContainer}>
            <Pagination currentPage={props.usersPage.currentPage}
                        totalPages={totalPages}
                        onChangePage={setPageHandler}/>
            {props.usersPage.items.map(u => (
                <div key={u.id} className={s.userContainer}>
                    <div className={s.picAndFollow}>
                        <img className={s.userPic} src={u.photos.small !== null ? u.photos.small : avatar}
                             alt={u.name} onClick={()=>{navigate(`/profile/${u.id}`)}}/>
                        <button
                            onClick={() => followButtonHandler(u.id, u.followed)}>{u.followed ? 'UNFOLLOW' : 'FOLLOW'}
                        </button>
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
}};
