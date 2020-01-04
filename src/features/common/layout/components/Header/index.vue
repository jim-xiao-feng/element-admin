<template>
  <div class="header">
    <span class="name">{{ getUserInfo.name }}</span>
    <img :src="getUserInfo.avatar" class="avator">
  </div>
</template>
<script>
export default {
  computed: {
    getUserInfo() {
      const userInfo = this.$store.state.user.userBaseInfo
      userInfo.avatar = `data:image/png;base64,${userInfo.avatar}`
      return userInfo
    }
  }
}
</script>
<style lang="less" scoped>
.header {
  width: calc(100vw - 200px);
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 10px 20px;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .name {
    margin-right: 10px;
  }

  .avator {
    width: 40px;
    height: 40px;
    border-radius: 10px;
  }
}

</style>