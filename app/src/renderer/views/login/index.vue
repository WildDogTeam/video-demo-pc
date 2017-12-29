<template>
  <div class="login text-center">
    <div class="title"><img :src="title" alt="" width="150"></div>
    <div class="logo">
      <img :src="logo" alt="" width="50">
    </div>
    <button class="btn org-btn" @click="login()">游客登录</button>
    <div class="github"><a href="http://"><img :src="github" alt="">获取源码</a></div>
  </div>
</template>
<script>
import logo from '@/assets/images/logo.svg';
import title from '@/assets/images/title.svg';
import github from "@/assets/images/github.png";

export default {
  name: 'login',
  data() {
    return {
      logo,
      title,
      github,
      err: ''
    }
  },
  methods: {
    login() {
      this.$store.dispatch('LoginWithAnonymously').then((data) => {
        this.$router.push({
          path: '/'
        });
      })
    }
  }
};

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.login {
  margin: 0 auto;
  text-align: center;
  height: 100%;
  padding-top: 10%;
  width: 100%;
  background: url('../../assets/images/bg.png') no-repeat;
  background-size: cover;
  .title {
    font-size: 22px;
    font-weight: 400;
    letter-spacing: 1px;
  }
  .logo {
    width: 80px;
    height: 80px;
    margin: 30px auto 0;
    padding-top: 15px;
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, .1);
    border-radius: 10px;
  }
  .btn {
    margin-top: 80px;
    // letter-spacing: 4px;
    font-size: 14px;
    line-height: 34px;
    width: 220px;
    height: 36px;
    border-radius: 18px;
    box-shadow: 0px 3px 10px 0px #eb734b;
  }
  .github {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 30px;
    img {
      width: 25px;
      height: 25px;
      vertical-align: sub;
      margin-right: 5px;
    }
    a{
      color: rgb(114, 146, 221);
    }
  }
}

</style>
