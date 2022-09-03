import axios from "../utils/axios"

export const getDetail = (id) => {
    return axios.get(`/product/${id}`)
}

export const getProduct = (param) => {
    return axios.get(`/product/queryProduct`, param)
}

export const getProductListByCategory = (param) => {
    return axios.get(`/product/queryProductByCategory`, param)
}