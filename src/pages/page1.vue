<template>
  <div>
    Hello<el-tag v-if="$_has('navigation:list1:delete')">{{message}}</el-tag>
  </div>
</template>

<script>
export default {
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

<style lang="scss" scoped>

</style>