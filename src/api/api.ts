import * as axios from "axios";

const instance = axios.default.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "1860b8e8-5b0f-42e3-b73c-7abd28b78fff"
    }
})


export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10, term= '', friend: null | boolean = null) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}&term=${term}`+ (friend === null ? "" : `&friend=${friend}`))
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
    },
    savePhoto(photoFile: any){
        const formData = new FormData()
        formData.append("image", photoFile)
        return instance.put(`profile/photo`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    },
    saveProfile(profile: any){
        return instance.put(`profile`, profile);
    }
}

export const authAPI = {
    me() {
        return instance.get(`auth/me`)
    },
   login (email: string, password: string, rememberMe = false, captcha: string|null) {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha})
   },
    logout () {
        return instance.delete(`auth/login`)
    }
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`)
    }
}
