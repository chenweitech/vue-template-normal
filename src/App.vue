<template>
  <div id="app">
    Hello {{message}}
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      message: 'stranger'
    }
  },
  mounted() {
    if(process.env.NODE_ENV!=='production') {console.log("开发环境执行")}
    this.message = '陌生人'
  }
}
</script>

<style lang="scss">
#app {
  height: 100%;
  color: $font-color;
}
</style>