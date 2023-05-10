import axios from 'axios';

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true
})

export const usersAPI = {
    getUsers(currentPage: number = 1) {
        return instance.get(`users?page=${currentPage}`)
    },
    followUser(userId: number) {
        return instance.post(`follow/${userId}`)
    },
    unfollowUser(userId: number) {
        return instance.delete(`follow/${userId}`)
    }
}
export const profileAPI = {
    getProfile(userId: number) {
        return instance.get(`profile/${userId}`)
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, {status})
    }

}
export const authAPI = {
    authMe() {
        return instance.get(`auth/me`)
    },
    login(data: LoginParamsType) {
        return instance.post(`auth/login`, data)
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