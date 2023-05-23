import React, {FC, memo, useCallback, useState} from 'react';
import s from './Post.module.css'
import avatar from "assets/avatars/avatar.svg"
import {onLikePostAC} from "redux/profile/profileReducer";
import {useAppDispatch} from "redux/store";

type Props = {
    postId: number
    message: string
    likesCount: number
    ava: string | null
}

export const Post: FC<Props> = memo(({postId, message, ava, likesCount}) => {

    const [isLiked, setIsLiked] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const onLikePost = useCallback((postId: number, isLiked: boolean) => {
        setIsLiked(!isLiked)
        dispatch(onLikePostAC(postId, isLiked))
    },[postId])

    return (
        <div className={s.item}>
            <img src={ava ? ava : avatar} alt={"Author's avatar"}/>
            <div className={s.messageAndLikes}>
                <span className={s.postMessage}>{message}</span>
                <div className={s.likesItem} onClick={()=>onLikePost(postId, isLiked)}>
                    <span className={`${s.like} ${isLiked ? s.liked : ''}`}>❤</span>
                    <span className={s.likesCount}>{likesCount}</span>
                </div>
            </div>
        </div>
    )
})
