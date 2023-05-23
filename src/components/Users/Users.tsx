import React, {useEffect} from 'react';
import {getUsers, setIsFollowUser, setPageAC} from "redux/users/usersReducer";
import s from './Users.module.css'
import {AppRootStateType, useAppDispatch} from "redux/store";
import avatar from '../.././assets/avatars/avatar.svg'
import {Pagination} from "common/components/Pagination";
import {UsersLoading} from "components/Users/UsersLoading";
import {useNavigate} from 'react-router-dom';
import {useSelector} from "react-redux";

export const Users = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const usersPage = useSelector((state: AppRootStateType) => state.users)
    const isAuth = useSelector((state: AppRootStateType) => state.auth.isAuth)

    useEffect(() => {
        getUsers(usersPage.currentPage)(dispatch)
    }, [usersPage.currentPage])

    const setPageHandler = (page: number) => {
        dispatch(setPageAC(page))
    }
    const totalPages = Math.ceil(usersPage.totalCount / usersPage.pageSize)

    const setIsFollowHandler = (userId: number, isFollowing: boolean) => {
        (setIsFollowUser(userId,isFollowing)(dispatch))
    }

    if (usersPage.isLoading) {
        return <UsersLoading/>
    } else {
        return (
            <div className={s.usersPageContainer}>
                <div className={s.pagination}>
                    <Pagination currentPage={usersPage.currentPage}
                                totalPages={totalPages}
                                onChangePage={setPageHandler}/>
                </div>
                <div className={s.users}>
                    {usersPage.items.map(u => (
                        <div key={u.id} className={s.userContainer}>
                            <div className={s.picAndFollow}>
                                <img className={s.userPic} src={u.photos.small !== null ? u.photos.small : avatar}
                                     alt={u.name}
                                     onClick={() => {
                                         navigate(`/profile/${u.id}`)
                                     }}/>
                                    <button disabled={u.inProgress} onClick={() => {isAuth ? setIsFollowHandler(u.id, u.followed) : navigate('/login')}}>
                                        {u.followed ? 'UNFOLLOW' : 'FOLLOW'}
                                    </button>

                            </div>
                            <div className={s.description}>
                                <div className={s.userName} onClick={() => {
                                    navigate(`/profile/${u.id}`)
                                }} >{u.name}</div>
                                <div className={s.userStatus}>{u.status}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}
