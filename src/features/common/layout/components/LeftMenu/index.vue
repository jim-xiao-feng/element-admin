<template>
  <el-menu class="menu_container">
    <el-submenu index="1-1">
      <span slot="title">用户管理</span>
      <el-menu-item index="1-1-1">
        查看用户
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<style lang="less" scoped>
.menu_container {
  width: 200px;
}
</style>