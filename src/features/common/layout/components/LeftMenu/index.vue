<template>
  <el-menu :router="isRouter" class="menu_container">
    <el-submenu v-for="(route, i) in permissionRoutes" :key="i" v-if="!route.hidden" :index="route.meta.key">
      <span slot="title">{{ route.meta.title }}</span>
      <el-menu-item v-for="(item,index) in route.children" :index="item.meta.key" :key="index" :route="item">
        <router-link :to="route.path + '/' + item.path">
          {{ item.meta.title }}
        </router-link>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>
<script>
export default {
  data() {
    return {
      isRouter: true
    }
  },
  computed: {
    permissionRoutes() {
      return this.$store.state.permission.routes
    }
  }
}
</script>

<style lang="less" scoped>
.menu_container {
  width: 200px;
  height: 100vh;
}
</style>