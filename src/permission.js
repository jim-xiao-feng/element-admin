import router from 'src/router'
import store from 'src/store'
import { getCookie } from 'src/util/cookie'
import { TOKEN_KEY } from 'src/constants/app'

/* 刷新或者跳转时触发 */
router.beforeEach(async(to, from, next) => {
  const token = getCookie(TOKEN_KEY)
  if (token) {
    const role = store.state.user.userBaseInfo.role
    if (role) {
      next()
    } else {
      // 获取用户信息
      await store.dispatch('getUserInfo')
      next()
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})