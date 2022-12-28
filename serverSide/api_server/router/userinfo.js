const express = require('express')
const router = express.Router()

const userinfo_handler = require('../routerHandler/userinfo')

// 验证表单
const expressJoi = require('@escook/express-joi')
const { update_userinfo_schema, update_password_schema, update_avatar_schema } = require('../schema/user')

// 获取用户信息
router.get('/userinfo', userinfo_handler.getUserInfo)

// 更改用户信息（昵称，邮箱）
router.post('/userinfo', expressJoi(update_userinfo_schema), userinfo_handler.updateUserInfo)

// 更改密码
router.post('/updatepwd', expressJoi(update_password_schema), userinfo_handler.updatePassword)

// 更新头像
router.post('/update/avatar', express(update_avatar_schema), userinfo_handler.updateAvatar)

module.exports = router