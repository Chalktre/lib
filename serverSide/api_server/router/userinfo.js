const express = require('express')
const router = express.Router()

const userinfo_handler = require('../routerHandler/userinfo')
// 获取用户信息路由
router.get('/userinfo', userinfo_handler.getUserInfo)

module.exports = router