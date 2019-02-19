<template>
  <el-container class="base-layout">
    <el-header>
      <BaseHeader />
    </el-header>
    <el-container>
      <el-aside width="200px">
        <BaseSidebar />
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import BaseHeader from './BaseHeader';
import BaseSidebar from './BaseSidebar';

export default {
  name: 'BasicLayout',
  components: {
    BaseHeader, BaseSidebar
  }
}
</script>

<style lang="scss">
.base-layout {
  height: 100%;
  .el-header {
    padding: 0;
  }
}
</style>
