const db = require('../db/index')
const bcript = require('bcryptjs')

// 获取用户信息
exports.getUserInfo = (req, res) => {
    db.query('select id, username, nickname, email, user_pic from ev_users where id=?', req.user.id, (err, results) => {
        if(err) return res.cc(err)
        if(results.length !== 1) return res.cc('获取用户信息失败！')
        res.send({
            stauts: 0,
            message: '获取用户信息成功',
            data: results[0]
        })
    })
}

// 修改昵称，邮箱
exports.updateUserInfo = (req, res) => {
    db.query('update ev_users set ? where id=?', [req.body, req.body.id], (err, results) => {
        if(err) return res.cc(err)
        if(results.affectedRows !== 1) return res.cc('修改失败！')
        return res.send({
            status: 0,
            message: '修改成功！'
        })
    })
}

// 更改密码
exports.updatePassword = (req, res) => {
    // 查询用户
    db.query('select * from ev_users where id=?', req.user.id, (err, results) => {
        if(err) return res.cc(err)
        // 查询用户是否存在
        if(results.length !== 1) return res.cc('用户不存在！')
        // 判断旧密码是否正确
        const compareResult = bcript.compareSync(req.body.oldPwd, results[0].password)
        if(!compareResult) return res.cc('原密码错误！')
        // 加密新密码存入数据库
        const newPwd = bcript.hashSync(req.body.newPwd, 10)
        db.query('update ev_users set password=? where id=?', [newPwd, req.user.id], (err, results) => {
            if(err) return res.cc(err)
            if(results.affectedRows !== 1) return res.cc('更新密码失败！')
            res.send({
                status: 0,
                message: '修改成功！'
            })
        })
    })
}

// 更改头像
exports.updateAvatar = (req, res) => {
    db.query('update ev_users set user_pic=? where id=?', [req.body.avatar, req.user.id], (err, results) => {
        if(err) return res.cc(err)
        if(results.affectedRows !== 1) return res.cc('更新失败！')
        return res.send({
            status: 0,
            message: '更新成功！'
        })
    })
}