const db = require('../db/index')

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