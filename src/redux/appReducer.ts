const initialState = {
    isInitialized: false,
    isAppLoading: true
}

type InitialStateType = typeof initialState

export const appReducer = (state:InitialStateType = initialState, action: AuthActionsType) => {
    switch (action.type) {
        case 'SET-IS-INITIALIZED': {
            return {...state, isInitialized: action.isInitialized}
        }
        case 'SET-IS-LOADING': {
            return {...state, isAppLoading: action.isAppLoading}
        }
        default: {
            return state
        }
    }
}

type setInitializedACType = ReturnType<typeof setInitializedAC>
export const setInitializedAC = (isInitialized: boolean) => {
    return {
        type: 'SET-IS-INITIALIZED',
        isInitialized
    } as const
}

type setLoadingACType = ReturnType<typeof setAppLoadingAC>
export const setAppLoadingAC = (isAppLoading: boolean) => {
    return {
        type: 'SET-IS-LOADING',
        isAppLoading
    } as const
}

export type AuthActionsType =
    | setInitializedACType
    | setLoadingACType

