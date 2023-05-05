const initialState = {
    id: 0,
    email: '',
    login: '',
    isAuth: false
}

export const authReducer = (state: AuthDomainType = initialState, action: AuthActionsType) => {
    switch (action.type) {
        case 'SET-AUTH-DATA': {
            return {...state, ...action.data}
        }
        case 'SET-IS-AUTH': {
            return {...state, isAuth: action.isAuth}
        }
        default: {
            return state
        }
    }
}

type setAuthDataACType = ReturnType<typeof setAuthDataAC>
export const setAuthDataAC = (data: AuthType) => {
    return {
        type: 'SET-AUTH-DATA',
        data
    } as const
}
type setIsAuthACType = ReturnType<typeof setIsAuthAC>
export const setIsAuthAC = (isAuth: boolean) => {
    return {
        type: 'SET-IS-AUTH',
        isAuth
    } as const
}
export type AuthActionsType =
    | setAuthDataACType
    | setIsAuthACType


type AuthType = {
    id: number
    email: string
    login: string
}

type AuthDomainType = AuthType & {
    isAuth: boolean
}
