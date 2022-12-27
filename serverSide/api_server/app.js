// 导入express
const express = require('express')
const app = express()

// 配置cors跨域
const cors = require('cors')
app.use(cors())

// 导入用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)

// 配置解析表单数据的中间件
app.use(express.urlencoded({extended: false}))

// 启动服务器
app.listen(8081, ()=>{
    console.log('Server is running at http://127.0.0.1:8081');
})