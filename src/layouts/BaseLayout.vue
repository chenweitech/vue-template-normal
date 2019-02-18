<template>
  <div>
    <el-row>
      <el-col :span="3">
        <BaseSidebar />
      </el-col>
      <el-col :span="21">
        <router-view />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import BaseSidebar from './BaseSidebar/BaseSidebar';

export default {
  name: 'BasicLayout',
  components: {
    BaseSidebar
  }
}
</script>

<style lang="scss">

</style>
