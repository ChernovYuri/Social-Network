import React, {useEffect} from 'react';
import s from './Messenger.module.css'
import {Message} from "./Message/Message";
import {AppRootStateType, useAppDispatch} from "redux/store";
import {MessageType, sendMessageAC, UserType} from "redux/messenger/messengerReducer";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Field, Form, Formik, FormikErrors, FormikHelpers} from "formik";
import {ChatItem} from "components/Messenger/ChatItem/ChatItem";

export const Messenger = () => {
    const messengerPage = useSelector((state: AppRootStateType) => state.messenger)
    const isAuth = useSelector((state: AppRootStateType) => state.auth.isAuth)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const sendMessage = (message: string) => {
        dispatch(sendMessageAC(message))
    }

    useEffect(() => {
        if (!isAuth) {
            navigate('/login')
        }
    }, [isAuth])
    return (
        <div className={s.messenger}>
            <div className={s.chats}>
                <ul>
                    {messengerPage.chats.map((u: UserType) => {
                        return (
                            <li key={u.id}>
                                <ChatItem id={u.id} name={u.name}/>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className={s.messages}>

                {messengerPage.messages.map((m: MessageType) => {
                    return (
                        <Message key={m.id} id={m.id} message={m.message}/>
                    )
                })}

                <div className={s.newMessageForm}>
                    <Formik
                        initialValues={{
                            message: '',
                        }}
                        onSubmit={(values, actions) => {
                            actions.setSubmitting(true)
                            sendMessage(values.message)
                            actions.resetForm()
                        }}
                    >
                        {({isSubmitting}) => (
                            <Form>
                                <Field name="message" placeholder="Write your message" type="message"/>

                                <button type="submit" disabled={isSubmitting}>
                                    Submit
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}