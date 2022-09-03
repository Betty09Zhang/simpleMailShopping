import axios from "../utils/axios"

export const addCart = (params) => {
    return axios.post('/cart/addCart', params)
}

export const getCart = (params) => {
    return axios.get('/cart/getCartDetail', params)
}

export const deleteCart = (params) => {
    return axios.delete('/cart/delete', params)
}

export const updateCart = (params) => {
    return axios.put('/cart/update', params)
}

export const getCartDetail = (params) => {
    return axios.get('/cart/getCartDetailsByProductIds', params)
}

export const getCartNum = (params) => {
    return axios.get('/cart/getCartNum', params)
}