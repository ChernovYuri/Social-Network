import {usersAPI} from "api/api";
import {AppThunkDispatch} from "redux/store";

const initialState = {
    items: [] as UserDomainType[],
    totalCount: 0,
    error: null,
    pageSize: 20,
    currentPage: 100,
    isLoading: true,
}

export const usersReducer = (state: UsersDomainType = initialState, action: UsersActionsType) => {
    switch (action.type) {
        case 'FOLLOW': {
            return {
                ...state,
                items: state.items.map(u => u.id === action.userId ? {...u, followed: true} : u)
            }
        }
        case 'UNFOLLOW': {
            return {
                ...state,
                items: state.items.map(u => u.id === action.userId ? {...u, followed: false} : u)
            }
        }
        case 'SET-USERS': {
            return {...state, ...action.state, items: action.state.items.map(u => ({...u, inProgress: false}))}
        }
        case 'SET-PAGE': {
            return {...state, currentPage: action.page}
        }
        case 'SET-LOADING': {
            return {...state, isLoading: action.isLoading}
        }
        case 'SET-PROGRESS': {
            return {...state,
                items: state.items.map(u => u.id === action.userId ? {...u, inProgress: action.inProgress} : u)}
        }
        default: {
            return state
        }
    }
}


type followUserACType = ReturnType<typeof followUserAC>
export const followUserAC = (userId: number) => {
    return {
        type: 'FOLLOW',
        userId
    } as const
}
type unfollowUserACType = ReturnType<typeof unfollowUserAC>
export const unfollowUserAC = (userId: number) => {
    return {
        type: 'UNFOLLOW',
        userId
    } as const
}
type setUsersACType = ReturnType<typeof setUsersAC>
export const setUsersAC = (state: UsersType) => {
    return {
        type: 'SET-USERS',
        state
    } as const
}
type setPageACType = ReturnType<typeof setPageAC>
export const setPageAC = (page: number) => {
    return {
        type: 'SET-PAGE',
        page
    } as const
}
type setLoadingACType = ReturnType<typeof setLoadingAC>
export const setLoadingAC = (isLoading: boolean) => {
    return {
        type: 'SET-LOADING',
        isLoading
    } as const
}
type setProgressACType = ReturnType<typeof setProgressAC>
export const setProgressAC = (userId: number, inProgress: boolean) => {
    return {
        type: 'SET-PROGRESS',
        userId,
        inProgress
    } as const
}

export type UsersActionsType =
    | followUserACType
    | unfollowUserACType
    | setUsersACType
    | setPageACType
    | setLoadingACType
    | setProgressACType
// thunks
export const getUsers = (currentPage: number) => (dispatch: AppThunkDispatch) => {
    dispatch(setLoadingAC(true))
    usersAPI.getUsers(currentPage)
        .then(res => {
        dispatch(setUsersAC(res.data))
        dispatch(setLoadingAC(false))
    }).catch((err)=>{
        alert(err.data.messages[0] ? err.data.messages[0] : 'Sorry, error occurred')
    })
}

export const followUser = (userId: number)  => (dispatch: AppThunkDispatch) => {
        dispatch(setProgressAC(userId, true))
        usersAPI.followUser(userId).then(res => {
            if (res.data.resultCode === 0) {
                dispatch(followUserAC(userId))
                dispatch(setProgressAC(userId, false))
            }
    }).catch((err)=>{
        alert(err.data.messages[0] ? err.data.messages[0] : 'Sorry, error occurred')
    })
}

export const unfollowUser = (userId: number)  => (dispatch: AppThunkDispatch) => {
    dispatch(setProgressAC(userId, true))
    usersAPI.unfollowUser(userId).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(unfollowUserAC(userId))
            dispatch(setProgressAC(userId, false))
        } else {
            alert(res.data.messages[0] ? res.data.messages[0] : 'Sorry, error occurred')
        }
    }).catch((err)=>{
        alert(err.data.messages[0] ? err.data.messages[0] : 'Sorry, error occurred')
    })
}

// types

type UserType = {
    name: string
    id: number
    photos: {
        small: string | null
        large: string | null
    }
    status: null
    followed: boolean
}


type UserDomainType = UserType & {
    inProgress: boolean
}

type UsersType = {
    items: UserType[]
    totalCount: number
    error: string | null
}

type UsersDomainType = {
    items: UserDomainType[]
    totalCount: number
    error: string | null
    pageSize: number
    currentPage: number
    isLoading: boolean
}
export type UsersPageType = typeof initialState
