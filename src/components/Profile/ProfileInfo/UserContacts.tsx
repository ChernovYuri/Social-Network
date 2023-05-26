import React, {FC, memo} from 'react';
import s from "components/Profile/ProfileInfo/ProfileInfo.module.css";
import {ContactsType} from "redux/profile/profileReducer";

type Props = {
    contacts: ContactsType
}

export const UserContacts: FC<Props> = memo(({contacts}) => {
    return (
        <div className={s.contacts}>
            Contacts: {Object.keys(contacts).map(key => {
            if (contacts[key]) {
                return <div><b>{key}</b>:
                    <a href={contacts[key].startsWith("http") ? contacts[key] : `https://${contacts[key]}`}
                       target="_blank" rel="noopener noreferrer">
                        {contacts[key]}
                    </a>
                </div>
            }
        })}
        </div>
    )
})