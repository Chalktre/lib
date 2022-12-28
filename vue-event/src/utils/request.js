import store from '@/store'
import axios from 'axios'
import router from 'vue-router'
// 创建axios实例
const myAxios = axios.create({
  baseURL: 'http://big-event-vue-api-t.itheima.net'
  // baseURL: 'http://127.0.0.1:8081'
})

// 请求拦截器：除白名单地址以外的请求都携带token
const whiteAPIList = ['/api/login', '/api/reg']
myAxios.interceptors.request.use(function (config) {
  if (!whiteAPIList.includes(config.url)) {
    // 为请求头挂载 Authorization 字段
    config.headers.Authorization = localStorage.getItem('token')
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
// 响应拦截器
myAxios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error.response.status === 401) {
    store.commit('updateToken', '')
    router.push('/login')
  }
  return Promise.reject(error)
})

export default myAxios

export const baseURL = 'http://big-event-vue-api-t.itheima.net'
