import React, {ChangeEvent, useRef} from 'react';
import s from "./ProfileInfo.module.css";

type Props = {
    callback: (e: ChangeEvent<HTMLInputElement>)=>void
}

export const FileInput: React.FC<Props> = ({callback}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <div className={s.avaInput}>
            <button onClick={() => fileInputRef.current?.click()}>Choose Image</button>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={e=>callback(e)}
            />
        </div>
    )
}