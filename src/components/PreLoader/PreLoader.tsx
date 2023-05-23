import React from 'react';
import {CircularProgress} from "@mui/material";
import s from './PreLoader.module.css'

export const PreLoader = () => {
    return (
        <div className={s.circular}>
            <CircularProgress color="inherit" size="10%"/>
        </div>
    )
}