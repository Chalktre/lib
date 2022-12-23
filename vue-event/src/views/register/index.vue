<template>
  <!-- 注册页面整体盒子 -->
  <div class="reg-container">
    <!-- 注册框 -->
    <div class="reg-box">
      <!-- 标题盒子 -->
      <div class="title-box"></div>
      <!-- 表单区域 -->
      <el-form ref="form" :model="form">
        <el-form-item>
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.repassword" placeholder="请再次输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btn-reg" type="primary" @click="registerFn">注册</el-button>
          <el-link type="info">去登陆</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterPage',
  data () {
    return {
      form: {
        username: '',
        password: '',
        repassword: ''
      }
    }
  },
  methods: {
    // 注册的点击事件

    registerFn () {}
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
