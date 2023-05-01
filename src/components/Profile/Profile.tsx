import React from 'react';
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPosts} from "./Posts/MyPosts";
import {ProfilePageType} from "redux/store";


export const Profile = (props: ProfileProps) => {
    debugger
    return (
        <div>
            <ProfileInfo profileInfo={props.profilePage.profileInfo}/>
            {/*'https://cdn.wallpaperjam.com/c2b45a1d3e2100ab203b8f03ba3c50a247d48035/landscapes-roads-multiscreen.jpg'*/}
            <MyPosts
                    profilePage={props.profilePage}
            />
        </div>
    );
};

export type ProfileProps = {
    profilePage: ProfilePageType
    // dispatch: (action: ProfileActionsType) => void
    /*    /!*addPost: () => void
        onChangeCallback: (newText: string) => void*!/
        /!*profileInfo: ProfileInfoProps[]
        newPostText: string
        posts: PostType[]*!/*/
}