import {
  login,
  getUserInfo
} from 'services/api/user'
import router from 'src/router'
import { constantRouters, otherRouters } from 'src/router'
import { setCookie } from 'src/util/cookie'
import { TOKEN_KEY } from 'src/constants/app'

export default {
  state: {
    userBaseInfo: {},
    token: ''
  },
  actions: {
    userLogin({ commit, dispatch }, userInfo) {
      return new Promise((resolve) => {
        login(userInfo).then(res => {
          commit('setToken', res.token)
          setCookie(TOKEN_KEY, res.token)
          const routes = constantRouters.concat(otherRouters)
          dispatch('setRoutes', routes)
          router.addRoutes(otherRouters)
          resolve()
        })
      })
    },

    getUserInfo({ commit }) {
      return new Promise((resolve) => {
        getUserInfo().then(res => {
          console.log('res', res)
          commit('setUserInfo', res)
          resolve(res)
        })
      })
    }
  },
  mutations: {
    setToken: (state, token) => {
      state.token = token
    },
    setUserInfo: (state, userInfo) => {
      state.userBaseInfo = userInfo
    }
  }

}
