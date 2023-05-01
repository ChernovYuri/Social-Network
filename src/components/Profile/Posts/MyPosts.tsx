import React, {ChangeEvent} from 'react';
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {addPostAC, onChangeNewPostTextAC} from "redux/profileReducer";
import {ProfilePageType, store, useAppDispatch} from "redux/store";

export type MyPostsProps = {
    profilePage: ProfilePageType
    // dispatch: (action: ProfileActionsType) => void
    /*    /!*posts: PostType[]
        ava: string
        newPostText: string*!/

        /!*addPost: () => void
        onChangeCallback: (newText: string) => void*!/*/
}

export const MyPosts = (props: MyPostsProps) => {
    debugger
    const dispatch = useAppDispatch()

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
                              value={props.profilePage.newPostText}/>
                </div>
                {/*<div><textarea ref={newPostElement}></textarea></div>
                <div><textarea ref={postMessageRef}></textarea></div>*/}
                <div>
                    <button onClick={addPost}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {props.profilePage.posts.map(p => {
                    return (
                        <Post key={p.id} id={p.id}
                              message={p.text}
                              likesCount={p.likesCount}
                              ava={props.profilePage.profileInfo[0].ava}/>
                    )
                })}
            </div>
        </div>
    );
};
