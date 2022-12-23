import store from '@/store'
import request from '@/utils/request'

export const registerApi = ({ username, password, repassword }) => {
  return request({
    url: '/api/reg',
    method: 'POST',
    data: { username, password, repassword }
  })
}
export const loginApi = ({ username, password }) => {
  return request({
    url: '/api/login',
    method: 'POST',
    data: { username, password }
  })
}
export const getuserInfoApi = () => {
  return request({
    url: '/my/userinfo',
    headers: {
      Authorization: store.state.token
    }
  })
}
