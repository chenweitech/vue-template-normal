<template>
  <div>
    <el-button @click="routerJump">登录</el-button>
  </div>
</template>

<script>
export default {
  name: 'login',
  methods: {
    routerJump(){
      this.$router.push('/hello')
    }
  }
}
</script>

<style lang="scss">

</style>
