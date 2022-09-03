import axios from 'axios'

const token_type = 'Bearer'
// axios.defaults.baseURL = process.env.NODE_ENV == 'development' ? 'http://backend-api-01.newbee.ltd/api/v1' : 'http://backend-api-01.newbee.ltd/api/v1'
axios.defaults.baseURL = process.env.NODE_ENV == 'development' ? 'http://127.0.0.1:3333' : 'http://127.0.0.1:3333'
axios.defaults.withCredentials = true
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
// axios.defaults.headers['token'] = localStorage.getItem('tokenUser').token || ''
axios.defaults.headers.post['Content-Type'] = 'application/json'

//设置axios请求头加入token
axios.interceptors.request.use(config => { 
      if (localStorage.getItem('tokenUser')) { 
        //在请求头加入token，名字要和后端接收请求头的token名字一样 
        config.headers.Authorization  = token_type + ' ' + JSON.parse(localStorage.getItem('tokenUser')).token;  
      } 
     
      return config; 
    }, 
    error => { 
     return Promise.reject(error);
    }
);

axios.interceptors.response.use(response => {
    if (response.status === 401) {
        window.location.pathname = '/login'
    }
    return response
}, error => {
    return Promise.reject(error)
})
  
export default axios