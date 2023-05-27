import React, {memo} from 'react';
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {addPostAC} from "redux/profile/profileReducer";
import {AppRootStateType, useAppDispatch} from "redux/store";
import {useSelector} from "react-redux";
import {Field, Form, Formik} from "formik";

export const MyPosts: React.FC = () => {
    const dispatch = useAppDispatch()
    const profile = useSelector((store: AppRootStateType) => store.profile)

    const addPost = (newPostText: string) => {
        dispatch(addPostAC(newPostText))
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <Formik
                        initialValues={{
                            newPostText: '',
                        }}
                        onSubmit={(values, actions) => {
                            actions.setSubmitting(true)
                            addPost(values.newPostText)
                            actions.resetForm()
                        }}
                    >
                        {({isSubmitting}) => (
                            <Form className={s.newPostBlock}>
                                <Field className={s.newPostInput} name="newPostText" placeholder="What's new?"
                                       type="newPostText"/>
                                <button type="submit" className={s.newPostButton} disabled={isSubmitting}>
                                    →
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
            <div className={s.posts}>
                {profile.posts.map(p => {
                    return (
                        <Post key={p.id}
                              postId={p.id}
                              message={p.text}
                              likesCount={p.likesCount}
                              userAvatar={profile.photos.small}/>
                    )
                })}
            </div>
        </div>
    )
}