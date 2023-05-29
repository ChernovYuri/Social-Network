import {AppThunkDispatch} from "redux/store";
import {authAPI, LoginParamsType, securityAPI} from "api/api";
import {FormikHelpers} from "formik";
import {setAppLoadingAC, setInitializedAC} from "redux/appReducer";

const initialState = {
    id: 0,
    email: '',
    login: '',
    isAuth: false,
    captchaUrl: ''
}

export const authReducer = (state: AuthDomainType = initialState, action: AuthActionsType) => {
    switch (action.type) {
        case 'SET-AUTH-DATA': {
            return {...state, ...action.data}
        }
        case 'SET-IS-AUTH': {
            return {...state, isAuth: action.isAuth}
        }
        case 'SET-CAPTCHA': {
            return {...state, captchaUrl: action.captchaUrl}
        }
        default: {
            return state
        }
    }
}

// thunks
export const authMe = () => async (dispatch: AppThunkDispatch) => {
    try {
        dispatch(setAppLoadingAC(true))
        const res = await authAPI.authMe()
        dispatch(setAuthDataAC(res.data.data))
        if (res.data.resultCode === 0) {
            dispatch(setIsAuthAC(true))
        } else {
            alert(res.data.messages[0] ? res.data.messages[0] : 'Sorry, error occurred')
        }
    } catch (err: any) {
        alert(err.message ? err.message : 'Sorry, error occurred')
    } finally {
        dispatch(setInitializedAC(true))
        dispatch(setAppLoadingAC(false))
    }
}

export const logIn = (data: LoginParamsType) => async (dispatch: AppThunkDispatch, {setErrors}: FormikHelpers<LoginParamsType>) => {
    debugger
    try {
        const res = await authAPI.logIn(data)
        if (res.data.resultCode === 0) {
            dispatch(setIsAuthAC(true))
            await authMe()(dispatch)
        } else if (res.data.resultCode === 10) {
            getCaptcha()(dispatch)
        } else {
            const errorMessage = res.data.messages[0] ? res.data.messages[0] : 'Sorry, an error occurred';
            setErrors({password: errorMessage}); // Установка ошибки в поле password
        }
    } catch (err: any) {
        const errorMessage = err.message ? err.message : 'Sorry, error occurred'
        setErrors({password: errorMessage}); // Установка ошибки в поле password
    }
}


export const getCaptcha = () => async (dispatch:AppThunkDispatch) => {
    debugger
    const captchaUrl = await securityAPI.getCaptcha()
    dispatch(setCaptchaUrlAC(captchaUrl.data.url))
}

export const logOut = () => async (dispatch: AppThunkDispatch) => {
    dispatch(setAppLoadingAC(true))
    try {
        const res = await authAPI.logOut()
        if (res.data.resultCode === 0) {
            dispatch(setAuthDataAC(initialState))
            dispatch(setIsAuthAC(false))
            dispatch(setAppLoadingAC(false))
        } else {
            alert(res.data.messages[0] ? res.data.messages[0] : 'Sorry, error occurred')
        }
    } catch (err: any) {
        alert(err.message ? err.message : 'Sorry, error occurred')
    }
}

// types

type setAuthDataACType = ReturnType<typeof setAuthDataAC>
export const setAuthDataAC = (data: AuthType) => {
    return {
        type: 'SET-AUTH-DATA',
        data
    } as const
}
type setCaptchaUrlACType = ReturnType<typeof setCaptchaUrlAC>
export const setCaptchaUrlAC = (captchaUrl: string) => {
    return {
        type: 'SET-CAPTCHA',
        captchaUrl
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
    | setCaptchaUrlACType

export type AuthType = {
    id: number
    email: string
    login: string
}

type AuthDomainType = AuthType & {
    isAuth: boolean
    captchaUrl: string
}