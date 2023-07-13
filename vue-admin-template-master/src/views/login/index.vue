<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-img">
        <img src="@/assets/login_images/logins.jpg" alt="">
      </div>
      <div class="login-from">
        <div class="from-top">
          <h2>登录</h2>
          <p>欢迎来到全栈大家庭,我是你们的引路人,微笑精灵, 请立即登录</p>
        </div>
        <el-form ref="loginForm" :model="loginForm" :rules="rules" label-position="top">
          <el-form-item label="用户名" prop="mobile">
            <el-input v-model="loginForm.mobile" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" />
          </el-form-item>
          <el-form-item prop=" isAgree">
            <el-checkbox v-model="loginForm.isAgree">请勾选用户协议</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')">立即登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

  </div>
</template>

<script>
// import { validUsername } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validatorName = (rules, val, callback) => {
      val ? callback() : callback(new Error('请勾选'))
    }
    return {
      loginForm: {
        mobile: '13800000002',
        password: 'hm#qd@23!',
        isAgree: false
      },
      rules: {
        mobile: [
          { required: true, trigger: 'blur' },
          { pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/, message: '手机号格式错误', trigger: 'blur' }
        ],
        password: [
          { required: true, trigger: 'blur' },
          { min: 6, max: 16, trigger: 'blur', message: '密码为6-16位字符' }
        ],
        isAgree: [{ validator: validatorName }]
      }
    }
  },
  watch: {
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          await this.$store.dispatch('user/login', this.loginForm)
          this.$router.push('/')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #000;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
</style>

<style lang="scss" scoped>
$bg: #d0d2d6;
$dark_gray: #889aa4;
$light_gray: #000;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-box {
    width: 1090px;
    height: 609px;
    background-color: #fff;
    margin: 60px auto;
    display: flex;

    .login-img {
      width: 672px;
      height: 100%;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .login-from {
      flex: 1;
      padding-right: 20px;

      .from-top {
        margin: 100px 0 20px 50px;
      }

      .el-form {
        margin: 0 0 20px 50px;

        .el-input {
          color: #000;
        }
      }

      .el-button {
        width: 100%;
      }
    }
  }
}
</style>
