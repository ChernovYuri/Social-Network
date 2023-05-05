const initialState = {
    userId: 0,
    lookingForAJob: false,
    lookingForAJobDescription: '',
    fullName: '',
    contacts: {} as ContactsType,
    photos: {
        small: null,
        large: null
    },
    profileWallpaper: 'https://cdn.wallpaperjam.com/c2b45a1d3e2100ab203b8f03ba3c50a247d48035/landscapes-roads-multiscreen.jpg',
    newPostText: '',
    posts: [
        {
            id: 1,
            text: 'Теория — это когда все известно, но ничего не работает. Практика — это когда все работает, но никто не знает почему. Мы же объединяем теорию и практику: ничего не работает... и никто не знает почему!',
            likesCount: 10
        },
        {
            id: 2,
            text: 'Все мы гении. Но если вы будете судить рыбу по её способности взбираться на дерево, она проживёт всю жизнь, считая себя дурой.',
            likesCount: 5
        }
    ],
    isLoading: true
}

export const profileReducer = (state: ProfileDomainType = initialState, action: ProfileActionsType) => {
    switch (action.type) {
        case 'ADD-POST': {
            let newPost: PostType = {
                id: 5,
                text: state.newPostText,
                likesCount: 0
            }
            if (state.newPostText) {
                state = {
                    ...state,
                    posts: [newPost, ...state.posts]
                }
            }
            state.newPostText = ''
            return state
        }
        case 'ON-CHANGE-NEW-POST-TEXT': {
            return {...state, newPostText: action.newPostText}
        }
        case 'SET-PROFILE': {
            return {...state, ...action.profile}
        }
        case 'SET-LOADING': {
            return {...state, isLoading: action.isLoading}
        }
        default : {
            return state
        }
    }
}

type onChangeNewPostTextACType = ReturnType<typeof onChangeNewPostTextAC>
export const onChangeNewPostTextAC = (newPostText: string) => {
    return {
        type: 'ON-CHANGE-NEW-POST-TEXT',
        newPostText
    } as const
}

type addPostACType = ReturnType<typeof addPostAC>
export const addPostAC = () => {
    return {
        type: 'ADD-POST',
    } as const
}

type setProfileACType = ReturnType<typeof setProfileAC>
export const setProfileAC = (profile: ProfileType) => {
    return {
        type: 'SET-PROFILE',
        profile
    } as const
}

type setLoadingACType = ReturnType<typeof setLoadingAC>
export const setLoadingAC = (isLoading: boolean) => {
    return {
        type: 'SET-LOADING',
        isLoading
    } as const
}

export type ProfileActionsType =
    | onChangeNewPostTextACType
    | addPostACType
    | setProfileACType
    | setLoadingACType

//profile
export type ProfileDomainType = ProfileType & {
    profileWallpaper: string
    newPostText: string
    posts: PostType[]
}

export type PostType = {
    id: number
    text: string
    likesCount: number
}

type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: {
        small: string | null
        large: string | null
    }
    isLoading: boolean
}