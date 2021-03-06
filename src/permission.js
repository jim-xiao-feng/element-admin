import router from 'src/router'
import store from 'src/store'
import { getCookie } from 'src/util/cookie'
import { TOKEN_KEY } from 'src/constants/app'
import {
  constantRouters,
  otherRouters
} from 'src/router'

/* 刷新或者跳转时触发 */
router.beforeEach(async (to, from, next) => {
  const token = getCookie(TOKEN_KEY)
  if (token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      const roles = store.state.user.userBaseInfo.roles
      if (roles) {
        next()
      } else {
        // 获取用户信息
        await store.dispatch('getUserInfo')
        // 添加路由
        const routes = constantRouters.concat(otherRouters)
        store.dispatch('setRoutes', routes)
        router.addRoutes(otherRouters)
        next({ ...to, replace: true })
      }
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})
