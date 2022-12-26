<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>重置密码</span>
    </div>
    <!-- 表单 -->
    <el-form :model="pwdForm" :rules="pwdFormRules" ref="pwdFormRef" label-width="100px">
      <el-form-item label="原密码" prop="old_pwd">
        <el-input v-model="pwdForm.old_pwd" type="password" show-password></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="new_pwd">
        <el-input v-model="pwdForm.new_pwd" type="password" show-password></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="re_pwd">
        <el-input v-model="pwdForm.re_pwd" type="password" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updatePwd">修改密码</el-button>
        <el-button @click="resetFn">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { updatePwdApi } from '@/api'
export default {
  name: 'UserPwd',
  data () {
    const samePwdFn = (rule, value, callback) => {
      if (value !== this.pwdForm.new_pwd) {
        callback(new Error('密码输入不一致'))
      } else {
        callback()
      }
    }
    const difPwdFn = (rule, value, callback) => {
      if (value === this.pwdForm.old_pwd) {
        callback(new Error('新旧密码不能一致'))
      } else {
        callback()
      }
    }
    return {
      // 表单的数据对象
      pwdForm: {
        old_pwd: '',
        new_pwd: '',
        re_pwd: ''
      },
      // 表单的验证规则对象
      pwdFormRules: {
        old_pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码长度必须是6-15位的非空字符串', trigger: 'blur' }
        ],
        new_pwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码长度必须是6-15位的非空字符串', trigger: 'blur' },
          { validator: difPwdFn, trigger: 'blur' }
        ],
        re_pwd: [
          { required: true, message: '请再次确认新密码', trigger: 'blur' },
          { validator: samePwdFn, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    updatePwd () {
      this.$refs.pwdFormRef.validate(valid => {
        if (valid) {
          updatePwdApi(this.pwdForm).then(res => {
            if (res.data.code === 0) {
              this.$message.success(res.data.message)
              this.$refs.pwdFormRef.resetFields()
            } else {
              this.$message.warning(res.data.message)
            }
          })
        }
      })
    },
    resetFn () {
      this.$refs.pwdFormRef.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.el-form {
  width: 500px;
}
</style>
