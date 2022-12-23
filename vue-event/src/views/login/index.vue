<template>
  <!-- 登陆页面整体盒子 -->
  <div class="login-container">
    <!-- 登陆框 -->
    <div class="login-box">
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
        <el-form-item>
          <el-button class="btn-log" type="primary" @click="loginFn">登陆</el-button>
          <el-link type="info" @click="gotoReg">去注册</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { loginApi } from '@/api'
import { mapMutations } from 'vuex'
export default {
  name: 'LoginPage',
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rule: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{1,10}$/, message: '用户名必须是1-10位大小写字母或数字', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码必须是6-15位非空字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapMutations(['updateToken']),
    loginFn () {
      this.$refs.form.validate(async valid => {
        if (valid) {
          const { data: res } = await loginApi(this.form)
          if (res.code !== 0) return this.$message.error(res.message)
          this.$message.success(res.message)
          // token存在localStorage中
          // localStorage.setItem('token', res.token)
          // token存在localStorage中
          this.updateToken(res.token)
          this.$router.push('/')
        } else {
          return false
        }
      })
    },
    gotoReg () {
      this.$router.push('/reg')
    }
  }
}
</script>

<style lang='less' scoped>
.login-container {
  background: url("../../assets/images/login_bg.jpg");
  background-size: cover;
  height: 100%;
  .login-box {
    width: 400px;
    height: 270px;
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
    .btn-log {
      width: 100%;
    }
  }
}
</style>
