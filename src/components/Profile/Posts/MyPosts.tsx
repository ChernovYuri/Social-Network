import React, {ChangeEvent} from 'react';
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {addPostAC, onChangeNewPostTextAC} from "redux/profileReducer";
import {AppRootStateType, useAppDispatch} from "redux/store";
import {useSelector} from "react-redux";

export const MyPosts = () => {
    const dispatch = useAppDispatch()
    const profile = useSelector((store: AppRootStateType) => store.profile)

    const addPost = () => {
        dispatch(addPostAC())
    }
    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(onChangeNewPostTextAC(e.currentTarget.value))
    }
    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea placeholder={"What's new?"}
                        onChange={onChangeHandler}
                              value={profile.newPostText}/>
                </div>

                <div>
                    <button onClick={addPost}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {profile.posts.map(p => {
                    return (
                        <Post key={p.id}
                              message={p.text}
                              likesCount={p.likesCount}
                              ava={profile.photos.small}/>
                    )
                })}
            </div>
        </div>
    );
};
