import React from 'react';
import s from './Post.module.css'
import avatar from "assets/avatars/avatar.svg"

type PostPropsType = {
    message: string
    likesCount: number
    ava: string | null
}

export const Post = (props: PostPropsType) => {
    return (
        <div className={s.item}>
            <img src={props.ava ? props.ava : avatar} alt={"Author's avatar"}/>
            <div className={s.messageAndLikes}>
                <span className={s.postMessage}>{props.message}</span>
                <div className={s.likesItem}>
                    <span>Like</span><span> {props.likesCount}</span>
                </div>
            </div>
        </div>
    );
};
