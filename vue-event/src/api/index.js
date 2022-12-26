// import store from '@/store'
import request from '@/utils/request'
// 注册
export const registerApi = ({ username, password, repassword }) => {
  return request({
    url: '/api/reg',
    method: 'POST',
    data: { username, password, repassword }
  })
}
// 登陆
export const loginApi = ({ username, password }) => {
  return request({
    url: '/api/login',
    method: 'POST',
    data: { username, password }
  })
}
// 获取用户信息（侧边栏使用）
export const getuserInfoApi = () => {
  return request({
    url: '/my/userinfo'
  })
}
// 获取侧边栏列表（自动铺设路由使用）
export const getMenusApi = () => {
  return request({
    url: '/my/menus'
  })
}
// 更新用户名
export const updateUserInfo = ({ nickname, email, id, user_pic }) => {
  return request({
    url: '/my/userinfo',
    method: 'PUT',
    data: { nickname, email, id, user_pic }
  })
}
// 更新用户头像
export const updateAvatarApi = (avatar) => {
  return request({
    url: '/my/update/avatar',
    method: 'PATCH',
    data: { avatar }
  })
}
// 修改密码
export const updatePwdApi = ({ old_pwd, new_pwd, re_pwd }) => {
  return request({
    url: '/my/updatepwd',
    method: 'PATCH',
    data: { old_pwd, new_pwd, re_pwd }
  })
}
