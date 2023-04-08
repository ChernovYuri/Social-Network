import React from 'react';
import s from './Post.module.css'

type PostPropsType = {
    id: number
    message: string
    likesCount: number
    ava: string
}

export const Post = (props: PostPropsType) => {
    return (
            <div className={s.item}>
                <img src={props.ava} alt={"Author's avatar"}/>
                <span className={s.postMessage}>{props.message}</span>
                <b/>
                <div className={s.likesItem}>
                    <span>Like</span><span> {props.likesCount}</span>
                </div>
            </div>
    );
};
