<template>
  <div class="home_container">
    <LeftMenu />
    <div>
      <Header />
      <router-view />
    </div>
  </div>
</template>
<script>
import LeftMenu from './components/LeftMenu'
import Header from './components/Header'
export default {
  components: {
    LeftMenu,
    Header
  }
}
</script>
<style scoped>
  .home_container {
    display: flex;
    flex-direction: row;
  }
</style>