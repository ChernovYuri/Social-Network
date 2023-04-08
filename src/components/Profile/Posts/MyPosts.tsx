import React, {ChangeEvent, ChangeEventHandler} from 'react';
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {addPostAC, MyPostsProps, onChangeNewPostTextAC} from "../../../redux/state";


export const MyPosts = (props: MyPostsProps) => {

    /*let newPostTextRef = useRef<HTMLTextAreaElement>(null)
    const addNewPost = () => {
        if (newPostTextRef.current !== null) {
            props.addPost(newPostTextRef.current.value)
            // newPostText.current.value = ''
            console.log(state.profilePage.posts)
        }
    }*/
    // два способа добавить ref
    /* let newPostElement = useRef<HTMLTextAreaElement>(null)
     let postMessageRef = React.createRef<HTMLTextAreaElement>()
     */
    /*const addPost = () => {
        if (newPostElement.current !== null) {
            let newPostText = newPostElement.current?.value
            return (
                alert(newPostText + postMessageRef.current?.value)
            )}
    }*/
    const addPost = () => {
        props.dispatch(addPostAC())
    }
    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.dispatch(onChangeNewPostTextAC(e.currentTarget.value))
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
