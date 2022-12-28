const db = require('../db/index')
const bcript = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')

exports.regUser = (req, res) => {
    const userinfo = req.body
    // 判断用户名或密码是否为空
    if( !userinfo.username || !userinfo.password){
        return res.send({ status: 1, message: '用户名或密码不能为空！'})
    }
    // 判断用户名是否重复（调用数据库查询是否有相同数据）
    db.query('select * from ev_users where username=?', userinfo.username, function(err, results) {
        if(err) {
            return res.send({status: 1, message: err.message})
        }else if(results.length > 0) {
            return res.send({status: 1, message: '用户名已被占用！'})
        }
        // 使用bcript加密密码
        userinfo.password = bcript.hashSync(userinfo.password, 10)
        // 插入数据库
        db.query('insert into ev_users set ?', {username: userinfo.username, password: userinfo.password}, (err,results)=>{
            if(err) return res.send({status: 1, message: err.message})
            if(results.affectedRows !== 1) {
                return res.send({status: 1, message: '注册失败，请稍后再试!'})
            }
            res.send({status: 0, message: '注册成功！'})
        })
    })
    // res.send('reg OK')
}

exports.login = (req, res) => {
    const userinfo = req.body
    db.query('select * from ev_users where username=?', userinfo.username, (err, results)=>{
        if(err) return res.cc(err)
        if(results.length !== 1) return res.cc('登陆失败！')
        // 对比密码
        const compareResult = bcript.compareSync(userinfo.password, results[0].password)
        if(!compareResult) return res.cc('密码错误！')
        // 剔除信息内的头像和密码
        const user = {...results[0], user_pic: '', password: ''}
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {
            expiresIn: '24h'
        })
        res.send({status: 0, message: '登陆成功！', token: 'Bearer ' + tokenStr})
    })
}