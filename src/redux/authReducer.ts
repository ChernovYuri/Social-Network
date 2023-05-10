import {AppThunkDispatch} from "redux/store";
import {authAPI, LoginParamsType} from "api/api";

const initialState = {
    id: 2,
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

export const authMe = () => (dispatch: AppThunkDispatch) => {
    authAPI.authMe().then(res => {
        dispatch(setAuthDataAC(res.data.data))
        return res.data
    }).then((data) => {
        if (data.resultCode === 0) {
            dispatch(setIsAuthAC(true))
        } else {
            alert(data.messages[0] ? data.messages[0] : 'Sorry, error occurred')
        }
    }).catch((err) => {
        alert(err.data.messages[0] ? err.data.messages[0] : 'Sorry, error occurred')
    })
}

export const logIn = (data: LoginParamsType) => (dispatch: AppThunkDispatch) => {
    authAPI.login(data).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsAuthAC(true))
        } else {
            alert(res.data.messages[0] ? res.data.messages[0] : 'Sorry, error occurred')
        }
    }).catch((err) => {
        alert(err.data.messages[0] ? err.data.messages[0] : 'Sorry, error occurred')
    })
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

