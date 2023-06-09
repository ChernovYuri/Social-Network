import {AppThunkDispatch} from "redux/store";
import {profileAPI, UpdatedProfileType} from "api/api";

const initialState = {
    userId: 2,
    aboutMe: '',
    lookingForAJob: false,
    lookingForAJobDescription: '',
    fullName: '',
    contacts: {
        github: '',
        vk: '',
        facebook: '',
        instagram: '',
        twitter: '',
        website: '',
        youtube: '',
        mainLink: '',
    },
    photos: {
        small: null,
        large: null
    },
    profileWallpaper: 'https://cdn.wallpaperjam.com/c2b45a1d3e2100ab203b8f03ba3c50a247d48035/landscapes-roads-multiscreen.jpg',
    newPostText: '',
    posts: [
        {
            id: 2,
            text: 'Теория — это когда все известно, но ничего не работает. Практика — это когда все работает, но никто не знает почему. Мы же объединяем теорию и практику: ничего не работает... и никто не знает почему!',
            likesCount: 10
        },
        {
            id: 1,
            text: 'Все мы гении. Но если вы будете судить рыбу по её способности взбираться на дерево, она проживёт всю жизнь, считая себя дурой.',
            likesCount: 5
        }
    ],
    isLoading: true,
    status: ''
}

export const profileReducer = (state: ProfileDomainType = initialState, action: ProfileActionsType) => {
    switch (action.type) {
        case 'ADD-POST': {
            let newPost: PostType = {
                id: 5,
                text: action.newPostText,
                likesCount: 0
            }
            if (action.newPostText) {
                state = {
                    ...state,
                    posts: [newPost, ...state.posts]
                }
            }
            return state
        }
        case 'LIKE-POST': {
            return {
                ...state,
                posts: state.posts.map(post => post.id === action.postId ? {
                    ...post,
                    likesCount: post.likesCount + (action.isLiked ? -1 : +1)
                } : post)
            }
        }
        case 'SET-PROFILE': {
            return {...state, ...action.profile}
        }
        case 'SET-STATUS': {
            return {...state, status: action.status}
        }
        case 'SET-PHOTOS': {

            const {large,small} = action.photos
            debugger
            return {
                ...state, photos: {
                    small: small,
                    large: large,
                }
            }
        }
        case 'SET-UPDATED-PROFILE': {
            return {...state, state: action.updatedProfile}
        }
        case 'SET-LOADING': {
            return {...state, isLoading: action.isLoading}
        }
        default : {
            return state
        }
    }
}

// thunks
export const getUserProfile = (userId: number) => async (dispatch: AppThunkDispatch) => {
    dispatch(setLoadingAC(true))
    try {
        const res = await profileAPI.getProfile(userId ? Number(userId) : 2)
        dispatch(setProfileAC(res.data))
        dispatch(setLoadingAC(false))
    } catch (err: any) {
        alert(err.message ? err.message : 'Sorry, error occurred')
    }
}

export const getStatus = (userId: number) => async (dispatch: AppThunkDispatch) => {
    dispatch(setLoadingAC(true))
    try {
        const res = await profileAPI.getStatus(userId ? userId : 0)
        dispatch(setStatusAC(res.data))
        dispatch(setLoadingAC(false))
    } catch (err: any) {
        alert(err.message ? err.message : 'Sorry, error occurred')
        dispatch(setLoadingAC(false))
    }
}

export const updateStatus = (status: string) => async (dispatch: AppThunkDispatch) => {
    try {
        const res = await profileAPI.updateStatus(status)
        if (res.data.resultCode === 0) {
            dispatch(setStatusAC(status))
        } else {
            alert(res.data.messages[0] ? res.data.messages[0] : 'Sorry, error occurred')
        }
    } catch (err: any) {
        alert(err.message ? err.message : 'Sorry, error occurred')
    }
}
export const updateAvatar = (newAvatar: File) => async (dispatch: AppThunkDispatch) => {
    try {
        const res = await profileAPI.updateAvatar(newAvatar)
        if (res.data.resultCode === 0) {

            dispatch(setPhotosAC(res.data.data.photos))
        } else {
            alert(res.data.messages[0] ? res.data.messages[0] : 'Sorry, error occurred')
        }
    } catch (err: any) {
        alert(err.message ? err.message : 'Sorry, error occurred')
    }
}
export const updateProfile = (updatedProfile: UpdatedProfileType) => async (dispatch: AppThunkDispatch) => {
    debugger
    try {
        const res = await profileAPI.updateProfile(updatedProfile)
        if (res.data.resultCode === 0) {
            dispatch(setUpdatedProfileAC(updatedProfile))
        } else {
            alert(res.data.messages ? res.data.messages.map(message=>message) : 'Sorry, error occurred')
        }
        return res
    } catch (err: any) {
        alert(err.message ? err.message : 'Sorry, error occurred')
    }
}

// types
type onLikePostACType = ReturnType<typeof onLikePostAC>
export const onLikePostAC = (postId: number, isLiked: boolean) => {
    return {
        type: 'LIKE-POST',
        postId, isLiked
    } as const
}

type addPostACType = ReturnType<typeof addPostAC>
export const addPostAC = (newPostText: string) => {
    return {
        type: 'ADD-POST',
        newPostText
    } as const
}

type setProfileACType = ReturnType<typeof setProfileAC>
export const setProfileAC = (profile: ProfileType) => {
    return {
        type: 'SET-PROFILE',
        profile
    } as const
}

type setStatusACType = ReturnType<typeof setStatusAC>
export const setStatusAC = (status: string) => {
    return {
        type: 'SET-STATUS',
        status
    } as const
}

type setPhotosACType = ReturnType<typeof setPhotosAC>
export const setPhotosAC = (photos: { small: string | null, large: string | null }) => {
    return {
        type: 'SET-PHOTOS',
        photos: { ...photos }
    } as const
}

type setUpdatedProfileACType = ReturnType<typeof setUpdatedProfileAC>
export const setUpdatedProfileAC = (updatedProfile: UpdatedProfileType) => {
    return {
        type: 'SET-UPDATED-PROFILE',
        updatedProfile
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
    | onLikePostACType
    | addPostACType
    | setProfileACType
    | setLoadingACType
    | setStatusACType
    | setPhotosACType
    | setUpdatedProfileACType

export type ProfileDomainType = ProfileType & {
    profileWallpaper: string
    newPostText: string
    posts: PostType[]
    status: string
}

export type PostType = {
    id: number
    text: string
    likesCount: number
}

export type ContactsType = {
    [key: string]: string
}

export type ProfileType = {
    userId: number
    aboutMe: string
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