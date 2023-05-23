import {profileReducer} from "redux/profile/profileReducer";
import {messengerReducer} from "redux/messenger/messengerReducer";
import {AnyAction, combineReducers, legacy_createStore} from "redux";
import {useDispatch} from "react-redux";
import {usersReducer} from "redux/users/usersReducer";
import {authReducer} from "redux/authReducer";
import {ThunkDispatch} from "redux-thunk";
import {appReducer} from "redux/appReducer";

export const rootReducer = combineReducers({
    profile: profileReducer,
    messenger: messengerReducer,
    users: usersReducer,
    auth: authReducer,
    app: appReducer
})

export const store = legacy_createStore(rootReducer)
export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppThunkDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export const useAppDispatch = () => useDispatch<AppThunkDispatch>()

// @ts-ignore
window.store = store;