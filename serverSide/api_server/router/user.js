const express = require('express')
const router = express.Router()
const userHanlder = require('../routerHandler/user')

//注册新用户
router.post('/reguser', userHanlder.regUser)

//登陆
router.post('/login', userHanlder.login)

module.exports = router