import React from 'react';
import s from './Header.module.css'

export const Header: React.FC<HeaderType> = (props) => {
    return (
        <header className={s.header}>
            <img className={s.companyLogo} src='https://www.sweet-lavka.ru/upload/iblock/0e9/6wg7yre7thjjifwyfcxargegzpuyji1n.png' alt={"company's logo"}/><span>{props.title}</span>
        </header>
    );
};

export type HeaderType = {
    title: string
}