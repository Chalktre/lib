// 导入express
const express = require('express')
const app = express()

// 配置cors跨域
const cors = require('cors')
app.use(cors())

// 配置解析表单数据的中间件
app.use(express.urlencoded({extended: false}))

// 优化res.send()
app.use((req, res, next)=>{
    res.cc = function(err, status = 1) {
        res.send({status, message: err instanceof Error ? err.message : err})
    }
    next()
})

// 捕获验证错误
const joi = require('@hapi/joi')
app.use(function(err, req, res, next) {
    if(err instanceof joi.ValidationError) return res.cc(err)
    res.cc(err)
})

// 导入用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)

// 启动服务器
app.listen(8081, ()=>{
    console.log('Server is running at http://127.0.0.1:8081');
})