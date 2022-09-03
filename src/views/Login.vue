<!--
 * 严肃声明：
 * 开源版本请务必保留此注释头信息，若删除我方将保留所有法律责任追究！
 * 本系统已申请软件著作权，受国家版权局知识产权以及国家计算机软件著作权保护！
 * 可正常分享和学习源码，不得用于违法犯罪活动，违者必究！
 * Copyright (c) 2020 陈尼克 all rights reserved.
 * 版权所有，侵权必究！
 *
-->

<template>
  <div class="login_container">
   <login-header :type ="type == 'login' ? '登录' : '注册'"/>
    
    <div class="login-body login">
      <el-form @submit="onSubmit" :rules="rules" :model="user">
        <el-form-item prop="username">
          <el-input
            v-model="user.username"
            name="username"
            label="用户名"
            placeholder="用户名"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="user.password"
            type="password"
            name="password"
            label="密码"
            placeholder="密码"
          />
        </el-form-item>
       
        <div class="verify">
          <Verify ref="loginVerifyRef" @error="error" :showButton="false" @success="success" :width="'100%'" :height="'40px'" :fontSize="'16px'" :type="2"></Verify>
        </div>
        <div style="margin: 32px;">
          <div v-if="type == 'login'">
            <div class="link-register" @click="toggle('register')">立即注册</div>
            <div class="login-btn" @click="onSubmit">登录</div>
          </div>
          <div v-else>
            <div class="link-login" @click="toggle('login')">已有登录账号</div>
            <div class="login-btn" @click="onSubmit">注册</div>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
// import sHeader from '@/components/SimpleHeader'
import LoginHeader from '../components/header/LoginHeader'
// import { login, register, getUserInfo } from '../service/user'
// import { setLocal, getLocal } from '@/common/js/utils'
// import { Toast } from 'vant'
import Validator from '../utils/validate'
import Verify from 'vue2-verify'
import { createUser , login} from '../service/user'
import md5 from 'js-md5'
import { clearUserInfo }  from '../utils/user'

export default {
  data() {
    return {
      type: 'login',
      verify: false,
      rules: {
        username: [
          // { required: true, message: '请输入用户名', trigger: ['blur']},
          { validator: Validator.userNameValidate, trigger: ['blur','change']}],
        password: [
          // { required: true, message: '请输入用户名', trigger: ['blur'] },
          { validator: Validator.passwordValidate, trigger: ['blur','change']}
        ]
      },
      user: {
        username: '',
        password: ''
      },
      callback: null
    }
  },
  components: {
    LoginHeader,
    Verify
  },
  mounted() {
    clearUserInfo()
    const callback = this.$route.query && this.$route.query.location
    if (callback) {
      this.callback = callback
    }
  },
  methods: {
    dealTriVer() {
      // 执行验证码的验证，通过 this.verify 知道验证码是否填写正确
      this.$refs.loginVerifyRef.$refs.instance.checkCode()
    },
    toggle(v) {
      this.verify = false
      this.type = v
      this.user = {
        username: '',
        password: ''
      }
    },
    async onSubmit() {
      this.dealTriVer()
      if (!this.verify) {
        // Toast.fail('验证码未填或填写错误!')
        return
      }
      if (this.type == 'login') {
        const resp = await login({
          userName: this.user.username,
          userPassword: md5(this.user.password)
        })
        const { status , data } = resp
        if (status == 200) {
          const tokenUser = {
            token: data.token,
            ...data.user
          }
          console.log('tokenUser: ',tokenUser)
          localStorage.setItem('tokenUser', JSON.stringify(tokenUser))
        
          if (this.callback) {
            window.location.href = this.callback
          } else {
            this.$router.push({
              path: '/'
            })
          }
        }
      } else {
        // const { data } = await register({
        //   "loginName": values.username1,
        //   "password": values.password1
        // })
        // Toast.success('注册成功')
         console.log('md5: ', md5(this.user.password))
        const resp = await createUser({
          userName: this.user.username,
          userPassword: md5(this.user.password)
        })
        console.log('resp: ',resp)
        // const { data, resultCode } = await login({
        //   "loginName": values.username,
        //   "passwordMd5": this.$md5(values.password)
        // })
        // setLocal('token', data)
        // window.location.href = '/'
        if (resp && resp.status == 200) {
            this.$message({
              message: '注册成功',
              type: 'success'
            });
            this.type = 'login'
        }
       
      }
    },
    success(obj) {
      this.verify = true
      // 回调之后，刷新验证码
      obj.refresh()
    },
    error(obj) {
      this.verify = false
      // 回调之后，刷新验证码
      obj.refresh()
    }
  },
}
</script>

<style lang="less">
  .login_container {
    width: 100%;
    height: 100%;
    .logo {
      width: 120px;
      height: 120px;
      display: block;
      margin: 80px auto 0px;
    }
    .login-body {
      width: 375px;
      height: 375px;
      padding: 20px 20px;
      margin: 20px auto;
      background: #fff8f0;
      .login_title {
        height: 54px;
        font-size: 18px;
        font-family: "microsoft yahei";
        text-align: center;
        border-bottom: 1px solid #f4f4f4;
        position: absolute;
        background: #fff;
        display: block;
      }
      .el-input {
        margin-top: 20px;
      }
    }
    .login {
      .link-register {
        font-size: 14px;
        margin-bottom: 20px;
        color: #1989fa;
        display: inline-block;
      }
      .link-login {
        font-size: 14px;
        margin-bottom: 20px;
        color: #1989fa;
        display: inline-block;
      }
    }
 
    .verify-bar-area {
      margin-top: 24px;
      .verify-left-bar {
        border-color: #1baeae;
      }
      .verify-move-block {
        background-color: #1baeae;
        color: #fff;
      }
    }
    .verify {
      margin-top: 20px;
      >div {
        width: 100%;
      }
      display: flex;
      justify-content: center;
      .cerify-code-panel {
        margin-top: 16px;
      }
      .verify-code {
        width: 40%!important;
        float: left!important;
      }
      .verify-code-area {
        float: left!important;
        width: 54%!important;
        margin-left: 14px!important;
        .varify-input-code {
          width: 90px;
          height: 38px!important;
          border: 1px solid #e9e9e9;
          padding-left: 10px;
          font-size: 16px;
        }
        .verify-change-area {
          line-height: 44px;
        }
      }
    }
    .login-btn {
      border: 1px solid #e85356;
      display: block;
      width: 302px;
      background: #e4393c;
      height: 31px;
      line-height: 31px;
      color: #fff;
      font-size: 20px;
      font-family: 'Microsoft YaHei';
    }
  }
</style>
