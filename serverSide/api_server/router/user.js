const express = require('express')
const router = express.Router()
const userHanlder = require('../routerHandler/user')

const expressJoi = require('@escook/express-joi')
const {reg_login_schema} = require('../schema/user')

//注册新用户
router.post('/reguser', expressJoi(reg_login_schema), userHanlder.regUser)

//登陆
router.post('/login', expressJoi(reg_login_schema), userHanlder.login)

module.exports = router