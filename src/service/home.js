import axios  from "../utils/axios";

export const getReCommands = function () {
    return axios({
        method:'get',
        url:'http://backend-api-01.newbee.ltd/api/v1/index-infos',
    })
    // return axios.get('/index-infos');
}

export const getCategoryList = function() {
    return axios.get('/categoryList')
}

// export const getCascaderCategoryList = function() {
//     return axios.get('/getCascaderCategories')
// }