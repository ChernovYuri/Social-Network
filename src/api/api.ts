import axios from "axios"
import {UsersType} from "redux/users/usersReducer";
import {AuthType} from "redux/authReducer";
import {ContactsType} from "redux/profile/profileReducer";

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true
})

export const usersAPI = {
    getUsers(currentPage: number = 1) {
        return instance.get<UsersType>(`users?page=${currentPage}`)
    },
    followUser(userId: number) {
        return instance.post<BackEndResponseType>(`follow/${userId}`)
    },
    unfollowUser(userId: number) {
        return instance.delete<BackEndResponseType>(`follow/${userId}`)
    }
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get(`profile/${userId}`)
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put<BackEndResponseType>(`profile/status`, {status})
    },
    updateProfile(updatedProfileData: UpdatedProfileType) {
        return instance.put<BackEndResponseType>(`profile`, {...updatedProfileData})
    },
    updateAvatar(newAvatar: File) {
        const formData = new FormData()
        formData.append("image", newAvatar)
        return instance.put<BackEndResponseType<{ photos: { small: string, large: string } }>>(
            `profile/photo`,
            formData,
            {
                headers: {
                    "Content-Type": 'multipart/form-data'
                }
            })
    }
}

export const authAPI = {
    authMe() {
        return instance.get<BackEndResponseType<AuthType>>(`auth/me`)
    },
    logIn(data: LoginParamsType) {
        return instance.post<BackEndResponseType<{ userId: number }>>(`auth/login`, data)
    },
    logOut() {
        return instance.delete<BackEndResponseType>(`auth/login`)
    }
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

export type BackEndResponseType<T = {}> = {
    data: T
    messages: string[]
    resultCode: number
}

export type UpdatedProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    aboutMe: string | null
    contacts: ContactsType
}