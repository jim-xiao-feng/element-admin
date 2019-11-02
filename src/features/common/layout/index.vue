<template>
  <div class="home_container">
    <LeftMenu />
    <div>
      <router-view />
    </div>
  </div>
</template>
<script>
import LeftMenu from './components/LeftMenu'
export default {
  components: {
    LeftMenu
  }
}
</script>
<style scoped>
  .home_container {
    display: flex;
    flex-direction: row;
  }
</style>