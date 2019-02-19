<template>
  <div class="nav-header">
    <div class="nav-title">
      <p>管理系统</p>
    </div>
    <div class="nav-welcome">
      <span class="name">{{name}}</span>
      <a href="javascript:void(0);" class="quit" @click="loginOut">
        <i></i>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseHeader',
  data() {
    return {
      name: '',
    }
  },
  created() {
    this.getName();
  },
  mounted() {

  },
  methods: {
    getName() {
      let name = sessionStorage.getItem('userName');
      this.name = name == null ? '未登录' : '欢迎回来：' + name;
    },
    loginOut() {
      this.$message({
        message: '退出成功',
        type: 'success'
      });
      location.href= '';
    },
  }
};
</script>
<style lang="scss" scoped>
.nav-header {
  position: relative;
  height: 60px;
  line-height: 60px;
  box-shadow: 0 1px #ddd;
  .nav-title {
    text-align: center;
    width: 200px;
    color: #fff;
    font-weight: 800;
    background: linear-gradient(90deg, #00cbcc, #51bbff);
  }
  .nav-welcome {
    position: absolute;
    top: 0;
    right: 0;
    padding-right: 50px;
    .name {
      color: #7a7a7a;
    }
    .quit {
      margin-left: 10px;
      padding: 0;
      height: 40px;
      line-height: 40px;
      color: #7a7a7a;
      text-align: center;
      border-radius: 4px;
      & > i {
        position: relative;
        top: 4px;
        display: inline-block;
        width: 24px;
        height: 24px;
        background-image: url("../assets/images/tc.png");
        background-size: cover;
        margin-right: 10px;
      }
    }
  }
  a:hover {
    text-decoration: none;
  }
  a:active {
    text-decoration: none;
  }
}
</style>