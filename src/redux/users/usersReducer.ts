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
        case 'FOLLOW/UNFOLLOW': {
            return {
                ...state,
                items: state.items.map(u => u.id === action.userId ? {...u, followed: !action.isFollowing} : u)
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
            return {
                ...state,
                items: state.items.map(u => u.id === action.userId ? {...u, inProgress: action.inProgress} : u)
            }
        }
        default: {
            return state
        }
    }
}


type setIsFollowUserACType = ReturnType<typeof setIsFollowUserAC>
export const setIsFollowUserAC = (userId: number, isFollowing: boolean) => {
    return {
        type: 'FOLLOW/UNFOLLOW',
        userId, isFollowing
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
    | setIsFollowUserACType
    | setUsersACType
    | setPageACType
    | setLoadingACType
    | setProgressACType

// thunks
export const getUsers = (currentPage: number) => async (dispatch: AppThunkDispatch) => {
    dispatch(setLoadingAC(true))
    try {
        const res = await usersAPI.getUsers(currentPage)
        dispatch(setUsersAC(res.data))
        dispatch(setLoadingAC(false))
    } catch (err: any) {
        alert(err.message ? err.message : 'Sorry, error occurred')
    }
}

export const setIsFollowUser = (userId: number, isFollowing: boolean) => async (dispatch: AppThunkDispatch) => {
    dispatch(setProgressAC(userId, true))
    try {
        const res = isFollowing ? await usersAPI.unfollowUser(userId) : await usersAPI.followUser(userId)
        if (res.data.resultCode === 0) {
            dispatch(setIsFollowUserAC(userId, isFollowing))
            dispatch(setProgressAC(userId, false))
        } else {
            alert(res.data.messages[0] ? res.data.messages[0] : 'Sorry, error occurred')
        }
    } catch (err: any) {
        alert(err.message ? err.message : 'Sorry, error occurred')
    }
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

export type UserDomainType = UserType & {
    inProgress: boolean
}

export type UsersType = {
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
