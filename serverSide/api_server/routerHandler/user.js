const db = require('../db/index')
const bcript = require('bcryptjs')
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
    res.send('login OK')
}