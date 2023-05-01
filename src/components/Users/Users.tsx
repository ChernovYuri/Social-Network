import React from 'react';
import {followUserAC, UsersPageType} from "redux/usersReducer";
import s from './Users.module.css'
import {useAppDispatch} from "redux/store";

type usersPageProps = {
    usersPage: UsersPageType
}

export const Users = (props: usersPageProps) => {
    const dispatch = useAppDispatch()

    const followButton = (userId: number, isFollowed: boolean) => {
        debugger
        dispatch(followUserAC(userId, isFollowed))
    }

    return (
        <div>
            {props.usersPage.users.map(u => (
                <div>
                        <span key={u.id}>
                            <div>
                                <img className={s.userPic} src={u.userPic} alt={u.name}/>
                                <button
                                    onClick={() => followButton(u.id, u.followed)}>{u.followed ? 'UNFOLLOW' : 'FOLLOW'}
                                </button>
                            </div>
                            <div>
                                <span>
                                    <div>{u.name}</div>
                                    <div>{u.description}</div>
                                    <div>{u.location.country + ', ' + u.location.city}</div>
                                </span>
                            </div>
                        </span>
                </div>
            ))}
        </div>
    );
};
