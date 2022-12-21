import request from '@/utils/request'

export const registerApi = () => {
  return request({
    url: '/api/reg',
    method: 'POST',
    data: {
      username: 'wangshishun123',
      password: '111111',
      repassword: '111111'
    }
  })
}
