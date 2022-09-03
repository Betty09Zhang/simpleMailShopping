import axios from "../utils/axios"

export const getCurrentUser = () => {
    return {
        userId: 1
    }
}

export const createUser = (param) => {
    return axios.post(`/user/create`, param)
}

export const login =(param) => {
    return axios.post(`/user/login`, param)
}

export const logout =(param) => {
    return axios.post(`/user/logout`, param)
}