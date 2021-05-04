<template>
  <div class="login-container">
      <div class="login-head"></div>
    <el-form class="login-form" ref="login-form" :model="user" :rules="formRules">
      <el-form-item prop="mobile">
        <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
      </el-form-item>
      <el-form-item prop="agree">
           <el-checkbox v-model="user.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onLogin" class="login-bth" :loading='loginLoading'>登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810',
        agree: true// 是否同意协议
      },
      // checked: false,  是否同意协议
      loginLoading: false, // 登录的状态
      formRules: { // 表单验证规则
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'change' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的号码格式', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'change' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码格式', trigger: 'blur' }
        ],
        agree: [
          {
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error('请同意用户协议'))
              }
            },
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    onLogin () {
      // const user = this.user
      // 表单验证
      this.$refs['login-form'].validate(valid => {
        if (!valid) {
          return
        }
        this.login()
      })
    },
    login () {
      this.loginLoading = true
      login(this.user).then(res => {
        this.$message({
          showClose: true,
          message: '登录成功',
          type: 'success'
        })
        this.loginLoading = false

        window.localStorage.setItem('user', JSON.stringify(res.data.data))

        this.$router.push({
          name: 'home'
        })
      }).catch(err => {
        console.log('登录失败', err)
        this.$message.error('登录失败，手机号或验证码错误')
        this.loginLoading = false
      })
    }
  }
}
</script>

<style scoped lang='less'>
.login-container{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: url('./login_bg.jpg') no-repeat;
    background-size: cover;
    .login-head{
        height: 57px;
        width:300px;
        background: url('./logo.png') no-repeat;
        margin-bottom: -80px;
        z-index: 9999;
    }
    .login-form {
        background-color: #fff;
        padding: 50px;
        padding-top: 100px;
        min-width: 300px;
        .login-bth {
          width: 100%;
        }
    }
}

</style>
