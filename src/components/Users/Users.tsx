import React, {useEffect} from 'react';
import {followUser, getUsers, setPageAC, unfollowUser} from "redux/usersReducer";
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
    const followButtonHandler = (userId: number) => {
        followUser(userId)(dispatch)
    }
    const unfollowButtonHandler = (userId: number) => {
        unfollowUser(userId)(dispatch)
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
                                 alt={u.name}
                                 onClick={() => {
                                     navigate(`/profile/${u.id}`)
                                 }}/>
                            {u.followed ?
                                <button disabled={u.inProgress}
                                        onClick={() => {isAuth ? unfollowButtonHandler(u.id) : navigate('/login')}}>UNFOLLOW
                                </button>
                                :
                                <button disabled={u.inProgress}
                                        onClick={() => {isAuth ? followButtonHandler(u.id) : navigate('/login')}}>FOLLOW
                                </button>
                            }
                        </div>
                        <div className={s.description}>
                            <div className={s.userName}>{u.name}</div>
                            <div className={s.userStatus}>{u.status}</div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
};
