<template>
  <div class="login_container">
    <el-form class="login_form" :model="loginForm" :rules="loginRules" label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password" show-password />
      </el-form-item>
      <el-form-item>
        <el-button @click="onSubmit"  type="primary">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data() {
      let validateUsername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('用户名不能为空！'));
        } else {
          callback();
        }
      }

      let validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码不能小于6位'))
        } else {
          callback()
        }
      }

      return {
        loginForm: {
          username: '',
          password: ''
        },
        loginRules: {
          username: [{ required: true, trigger: 'blur', validator: validateUsername }],
          password: [{ required: true, trigger: 'blur', validator: validatePassword }]
        }
      }
    },

    methods: {
      onSubmit() {
      }
    }
  }
</script>

<style lang='less'>
.login_form {
  width: 500px;
  position: absolute;
  left: 0;
  right: 0;
  top: 255px;
  margin: 0 auto;
}
</style>