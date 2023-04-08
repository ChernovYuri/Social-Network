import React from 'react';
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPosts} from "./Posts/MyPosts";
import {ProfileProps} from "../../redux/state";


export const Profile = (props: ProfileProps) => {
    return (
        <div>
            <ProfileInfo profileWallpaper={props.profilePage.profileInfo[0].profileWallpaper}
                         ava={props.profilePage.profileInfo[0].ava}/>
            {/*'https://cdn.wallpaperjam.com/c2b45a1d3e2100ab203b8f03ba3c50a247d48035/landscapes-roads-multiscreen.jpg'*/}
            <MyPosts
                    profilePage={props.profilePage}
                    dispatch={props.dispatch}
                /*onChangeCallback={props.onChangeCallback}*/
                // posts={props.profilePage.posts}
                //      ava={props.profilePage.profileInfo[0].ava}
                     /*addPost={props.addPost}*/
                     // newPostText={props.profilePage.newPostText}
            />
        </div>
    );
};
