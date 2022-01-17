import * as axios from "axios";

const instance = axios.default.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "22f8a0e5-ae9d-464b-9c50-12afa6acaa39"
    }
})



export const usersAPI = {
    getProfile(userId: string) {
        console.warn("Obsolete method. Please profileAPI object")
        return profileAPI.getProfile(userId)
    },
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data);
    },
    follow(userID: number) {
        return instance.post(`follow/${userID}`)
    },
    unfollow(userID: number) {
        return instance.delete(`follow/${userID}`)
    }

}

export const profileAPI = {
    getProfile(userId: string) {
        return instance.get(`profile/` + userId);
    },
    getStatus(userId: string) {
        return instance.get(`profile/status/` + userId);
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, {status: status});
    }
}

export const authAPI = {
    me() {
        return instance.get(`auth/me`)
    },
   login (email: string, password: string, rememberMe = false) {
        return instance.post(`auth/login`, {email, password, rememberMe})
   },
    logout () {
        return instance.delete(`auth/login`)
    }
}