<template>
  <!-- 注册页面整体盒子 -->
  <div class="reg-container">
    <!-- 注册框 -->
    <div class="reg-box">
      <!-- 标题盒子 -->
      <div class="title-box"></div>
      <!-- 表单区域 -->
      <el-form ref="form" :model="form" :rules="rule">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input v-model="form.repassword" placeholder="请再次输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btn-reg" type="primary" @click="registerFn">注册</el-button>
          <el-link type="info" @click="gotoLogin">去登陆</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { registerApi } from '@/api'

export default {
  name: 'RegisterPage',
  data () {
    const samePwdFn = (rule, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error('密码输入不一致'))
      } else {
        callback()
      }
    }
    return {
      form: {
        username: '',
        password: '',
        repassword: ''
      },
      rule: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{1,10}$/, message: '用户名必须是1-10位大小写字母或数字', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码必须是6-15位非空字符', trigger: 'blur' }
        ],
        repassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: samePwdFn, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 注册的点击事件
    registerFn () {
      this.$refs.form.validate(async valid => {
        if (valid) {
          const { data: res } = await registerApi(this.form)
          if (res.code !== 0) return this.$message.error(res.message)
          this.$message.success(res.message)
          this.$router.push('/login')
        } else {
          return false
        }
      })
    },
    gotoLogin () {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped lang='less'>
.reg-container {
  background: url("../../assets/images/login_bg.jpg");
  background-size: cover;
  height: 100%;
  .reg-box {
    width: 400px;
    height: 335px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 0 30px;
    box-sizing: border-box;
    .title-box {
      background: url("../../assets/images/login_title.png") center no-repeat;
      height: 60px;
    }
    .btn-reg {
      width: 100%;
    }
  }
}
</style>
