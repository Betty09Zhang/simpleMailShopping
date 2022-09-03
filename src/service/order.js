import axios from "../utils/axios"

export const addOrder = (params) => {
    return axios.post('/order/create', params)
}

export const getOrderDetail = (params) => {
    return axios.get('/orderDetail/getOrderDetail', params)
}

export const updateOrderStatus = (params) => {
    // return axios.post('/order/updateStatus', params)
    return axios.post('/order/fireTcc', params)
}

export const notifyWareHouse = (params) => {
    return axios.get('/notify/sendMsg', params)
}

