import React, {ChangeEvent, FC, memo, useState} from 'react';
import {useSelector} from "react-redux";
import {AppRootStateType} from "redux/store";

type Props = {
    oldTitle: string
    callBack: (newTitle: string) => void
}

export const EditableStatus: FC<Props> = memo(({oldTitle, callBack}) => {
    const [edit, setEdit] = useState<boolean>(false)
    const [newTitle, setNewTitle] = useState<string>('')
    const profile = useSelector((state: AppRootStateType)=>state.profile)

    const focusHandler = () => {
        setEdit(!edit);
        if (edit) {
            updateOnBlurHandler();
        } else {
            if (oldTitle === 'You have no status' && profile.status !== 'You have no status') {
                setNewTitle('');
            } else {
                setNewTitle(oldTitle);
            }
        }
    };

    const updateOnBlurHandler = () => {
        callBack(newTitle)
    }
    const onChangeLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
         if(e.currentTarget.value.length > 300) {
             return alert('Max length (300)')
         }
        setNewTitle(e.currentTarget.value)
    }

    return (
        edit
            ? <input placeholder={'Set your status'}
                     onChange={onChangeLocalTitleHandler}
                     autoFocus
                     value={newTitle}
                     onBlur={focusHandler}/>
            : <span onDoubleClick={focusHandler}>{oldTitle}</span>
    );
})

