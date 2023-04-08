import {useState} from "react";


// TYPES:

//header
export type HeaderType = {
    title: string
}

//profile
export type ProfilePageType = {
    profileInfo: ProfileInfoProps[]
    newPostText: string
    posts: PostType[]
}
export type ProfileProps = {
    profilePage: ProfilePageType
    dispatch: (action: ActionsTypes ) => void
    /*addPost: () => void
    onChangeCallback: (newText: string) => void*/
    /*profileInfo: ProfileInfoProps[]
    newPostText: string
    posts: PostType[]*/
}
export type ProfileInfoProps = {
    profileWallpaper: string
    ava: string
}
export type MyPostsProps = {
    profilePage: ProfilePageType
    dispatch: (action: ActionsTypes ) => void
    /*posts: PostType[]
    ava: string
    newPostText: string*/

    /*addPost: () => void
    onChangeCallback: (newText: string) => void*/
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
    dispatch: (action: ActionsTypes ) => void
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
}
export type StoreType = {
    _state: RootStateType
    _callSubscriber: (store: StoreType) => void
    /*addPost: () => void
    onChangeCallback: (newText: string) => void*/
    subscribe: (observer: (store: StoreType) => void) => void
    getState: () => RootStateType
    dispatch: (action: ActionsTypes ) => void
}

type ActionsTypes = addPostACType |
    onChangeNewPostTextACType |
    onChangeNewMessageTextACType |
    sendMessageACType

type onChangeNewPostTextACType = ReturnType<typeof onChangeNewPostTextAC>
export const onChangeNewPostTextAC = (newPostText: string) => {
    return {
        type: 'ON-CHANGE-NEW-POST-TEXT',
        newPostText
    }as const
}

type addPostACType = ReturnType<typeof addPostAC>
export const addPostAC = () => {
    return {
        type: 'ADD-POST'
    } as const
}

type onChangeNewMessageTextACType = ReturnType<typeof onChangeNewMessageTextAC>
export const onChangeNewMessageTextAC = (newMessageText: string) => {
    return {
        type: 'ON-CHANGE-NEW-MESSAGE-TEXT',
        newMessageText
    }as const
}
type sendMessageACType = ReturnType<typeof sendMessageAC>
export const sendMessageAC = () => {
    return {
        type: 'SEND-MESSAGE'
    } as const
}
/*const [posts, setPosts] = useState<PostType[]>([
    {id: 1, text: 'Post 1', likesCount: 10},
    {id: 2, text: 'Post 2', likesCount: 5}
],)*/

// DATA:

export let store: StoreType = {
    _state: {
        profilePage: {
            profileInfo: [
                {
                    profileWallpaper: 'https://cdn.wallpaperjam.com/c2b45a1d3e2100ab203b8f03ba3c50a247d48035/landscapes-roads-multiscreen.jpg',
                    ava: 'https://ionicframework.com/docs/img/demos/avatar.svg',
                }
            ],
            newPostText: '',
            posts: [
                {
                    id: 1,
                    text: 'Хочу, бля, сказать этому ёбаному Обэме нахуй, блять: ебомбаный... Ёбаный ты козёл нахуй, черножопый, блять, был бы ты человек нахуй. Твою дочку ебут нахуй, где-нибудь, нахуй, блять, она, наверно, учится хуй знает где нахуй, бля, а дети гибнут на Украине нахуй, почему так нахуй? Почему дети должны... Они даже дети... Вечные дети нахуй, это наше будущее нахуй, и хули ты пиздишь ц-сука, залупаешься, блять, ты живёшь где-то на континенте, хуй через знает где, блять, хули ты сюда лезешь... К русским нахуй. Запомни — у меня есть, блять, хороший, бля, человек, я его, сука, блять, отдам деньги, чтоб те, сука, в мозгу въебал пулю нахуй, и чтобы ты закрылся нахуй, и никогда сюда не лез, понял? Быдло ты ебаное, блять! Всё нахуй.',
                    likesCount: 10
                },
                {
                    id: 2,
                    text: 'Ну такой вот примерно рецепт усредненный, потому что вариаций масса. Берется суп, он не греется, греть - это не про моего батю. Он берет это суп, вываливает его на сковороду и начинает жарить. Добавляет в него огромное количество лука, чеснока, перца черного и красного МУКИ! для вязкости, томатная паста сверху. Все это жарится до дыма. Потом снимается с огня и остужается на балконе. Потом батя заносит и щедро полив майонезом начинает есть. При этом ест со сковороды шкрябая по ней ложкой. Ест и приговаривает полушепотом ух бля. При этом у него на лбу аж пот выступает. Любезно мне иногда предлагает, но я отказываюсь. Надо ли говорить о том какой дичайший пердеж потом? Вонища такая, что обои от стен отклеиваются.',
                    likesCount: 5
                }
            ]
        },
        messengerPage: {
            chats: [
                {id: 1, name: 'Dimych'},
                {id: 2, name: 'Leha'},
                {id: 3, name: 'Viktor'},
                {id: 4, name: 'Gulnaz'},
                {id: 5, name: 'Igor'},
            ],
            messages: [
                {id: 1, message: 'Hi, how are you'},
                {id: 2, message: 'Hi, nice'},
                {id: 3, message: 'Good'},
                {id: 4, message: 'Nice'},
                {id: 5, message: 'yo'},
            ],
            newMessageText: '',
        },
        // sidebar: {}
    },
    _callSubscriber(store: StoreType) {
        console.log('state changed')
    },
    /*addPost() {
        let newPost: PostType = {
            id: 5,
            text: this._state.profilePage.newPostText,
            likesCount: 0
        }
        // setPosts([...state.profilePage.posts, newPost])
        this._state = {
            ...this._state,
            profilePage: {...this._state.profilePage, posts: [newPost, ...this._state.profilePage.posts]}
        }
        this._state.profilePage.newPostText = ''
        this._callSubscriber(store)
    },
    onChangeCallback(newText: string) {
        this._state.profilePage.newPostText = newText;
        this._callSubscriber(store)
    },*/
    subscribe(observer: (store: StoreType) => void) {
        this._callSubscriber = observer
    },
    getState() {
        return this._state
    },
    dispatch(action) {
        switch (action.type) {
            case 'ADD-POST': {
                let newPost: PostType = {
                    id: 5,
                    text: this.getState().profilePage.newPostText,
                    likesCount: 0
                }
                if (this.getState().profilePage.newPostText) {
                this._state = {
                    ...this.getState(),
                    profilePage: {...this.getState().profilePage, posts: [newPost, ...this.getState().profilePage.posts]}
                }}
                this.getState().profilePage.newPostText = ''
                this._callSubscriber(store)
                break
            }
            case 'ON-CHANGE-NEW-POST-TEXT': {
                this.getState().profilePage.newPostText = action.newPostText;
                this._callSubscriber(store)
                break
            }
            case 'SEND-MESSAGE': {
                let newMessage: MessagePropsType = {
                    id: 6,
                    message: this.getState().messengerPage.newMessageText
                }
                if (this.getState().messengerPage.newMessageText) {
                this._state = {
                    ...this.getState(),
                    messengerPage: {...this.getState().messengerPage, messages: [...this.getState().messengerPage.messages, newMessage]}
                }}
                this._state.messengerPage.newMessageText = ''
                this._callSubscriber(store)
                break
            }
            case 'ON-CHANGE-NEW-MESSAGE-TEXT': {
                this._state.messengerPage.newMessageText = action.newMessageText;
                this._callSubscriber(store)
                break
            }
            default:
                this.getState()
        }
    }
}

/*
export let state: RootStateType = {
    profilePage: {
        profileInfo: [
            {
                profileWallpaper: 'https://cdn.wallpaperjam.com/c2b45a1d3e2100ab203b8f03ba3c50a247d48035/landscapes-roads-multiscreen.jpg',
                ava: 'https://ionicframework.com/docs/img/demos/avatar.svg',
            }
        ],
        newPostText: '',
        posts: [
            {id: 1, text: 'Post 1', likesCount: 10},
            {id: 2, text: 'Post 2', likesCount: 5}
        ]
    },
    messengerPage: {
        chats: [
            {id: 1, name: 'Dimych'},
            {id: 2, name: 'Leha'},
            {id: 3, name: 'Viktor'},
            {id: 4, name: 'Gulnaz'},
            {id: 5, name: 'Igor'},
        ],
        messages: [
            {id: 1, message: 'Hi, how are you'},
            {id: 2, message: 'Hi, nice'},
            {id: 3, message: 'Good'},
            {id: 4, message: 'Nice'},
            {id: 5, message: 'yo'},
        ],
    },
    // sidebar: {}
}

let rerenderApp = (state: RootStateType) => {
    console.log('state changed')
}
export const addPost = () => {
    let newPost: PostType = {
        id: 5,
        text: state.profilePage.newPostText,
        likesCount: 0
    }
    // setPosts([...state.profilePage.posts, newPost])
    state = {...state, profilePage: {...state.profilePage, posts: [newPost, ...state.profilePage.posts]}}
    state.profilePage.newPostText = ''
    rerenderApp(state)
}
export const onChangeCallback = (newText: string) => {
    state.profilePage.newPostText = newText;
    rerenderApp(state)
}

export const subscribe = (observer: (state: RootStateType)=>void) => {
    rerenderApp = observer
}
*/

// OLD DATA
/*
let ava = 'https://ionicframework.com/docs/img/demos/avatar.svg'
let profileWallpaper='https://cdn.wallpaperjam.com/c2b45a1d3e2100ab203b8f03ba3c50a247d48035/landscapes-roads-multiscreen.jpg'
*/
/*export let posts = [
    {id: 1, text: 'Post 1', likesCount: 10},
    {id: 2, text: 'Post 2', likesCount: 5}
]

let chats: UserType[] = [
    {id: 1, name: 'Dimych'},
    {id: 2, name: 'Leha'},
    {id: 3, name: 'Viktor'},
    {id: 4, name: 'Gulnaz'},
    {id: 5, name: 'Igor'},
]

let messages: MessagePropsType[] = [
    {id: 1, message: 'Hi, how are you'},
    {id: 2, message: 'Hi, nice'},
    {id: 3, message: 'Good'},
    {id: 4, message: 'Nice'},
    {id: 5, message: 'yo'},
]*/

//