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
    }
}