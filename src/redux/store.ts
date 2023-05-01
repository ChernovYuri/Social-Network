import {profileReducer} from "redux/profileReducer";
import {messengerReducer} from "redux/messengerReducer";
import {sidebarReducer} from "redux/sidebarReducer";
import {combineReducers, legacy_createStore} from "redux";
import {useDispatch} from "react-redux";
import {usersReducer} from "redux/usersReducer";

export const rootReducer = combineReducers({
    profile: profileReducer,
    messenger: messengerReducer,
    users: usersReducer,
    sidebar: sidebarReducer
})

export const store = legacy_createStore(rootReducer)
// window.store = store
export type AppRootStateType = ReturnType<typeof rootReducer>

export const useAppDispatch = () => useDispatch()

// TYPES:
// header
export type HeaderType = {
    title: string
}

//profile
export type ProfilePageType = {
    profileInfo: ProfileInfoType[]
    newPostText: string
    posts: PostType[]
}

export type ProfileInfoType = {
    profileWallpaper: string
    ava: string
}

export type PostType = {
    id: number
    text: string
    likesCount: number
}

//messenger
export type MessengerPageType = {
    chats: UserType[]
    messages: MessagePropsType[]
    newMessageText: string
}
export type MessengerPropsType = {
    messengerPage: MessengerPageType
    // dispatch: (action: MessengerActionsType) => void
}
export type UserType = {
    id: number
    name: string
}

export type MessagePropsType = {
    id: number
    message: string
}

//root
export type RootStateType = {
    profilePage: ProfilePageType
    messengerPage: MessengerPageType
    sidebar: {}
}
export type StoreType = {
    _state: RootStateType
    _callSubscriber: (store: StoreType) => void
/*    /!*addPost: () => void
    onChangeCallback: (newText: string) => void*!/*/
    subscribe: (observer: (store: StoreType) => void) => void
    getState: () => RootStateType
    dispatch: (action: any) => void
}