let initialState = {
    items: [] as UserType[],
    totalCount: 0,
    error: null,
    pageSize: 20,
    currentPage: 100
}

export type UsersType = {
    items: UserType[]
    totalCount: number
    error: string | null
}
export type UsersDomainType = UsersType & {
    pageSize: number
    currentPage: number
}

export type UserType = {
    name: string
    id: number
    photos: {
        small: string | null
        large: string | null
    }
    status: null
    followed: boolean
}

export type UsersPageType = typeof initialState

export const usersReducer = (state: UsersDomainType = initialState, action: UsersActionsType) => {
    switch (action.type) {
        case 'FOLLOW/UNFOLLOW': {
            return {
                ...state,
                users: state.items.map(u => u.id === action.userId ? {...u, followed: !action.isFollowed} : u)
            }
        }
        case 'SET-USERS': {
            return {
                ...state, ...action.state
            }
        }
        case 'SET-PAGE': {
            return {
                ...state, currentPage: action.page
            }
        }
        default: {
            return state
        }
    }
}


type followUserACType = ReturnType<typeof followUserAC>
export const followUserAC = (userId: number, isFollowed: boolean) => {
    return {
        type: 'FOLLOW/UNFOLLOW',
        userId, isFollowed
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


export type UsersActionsType = followUserACType | setUsersACType | setPageACType

