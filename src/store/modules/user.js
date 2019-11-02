import {
  login
} from 'services/api/user'
import router from 'src/router'
import { constantRouters, otherRouters } from 'src/router'

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
          const routes = constantRouters.concat(otherRouters)
          dispatch('setRoutes', routes)
          router.addRoutes(otherRouters)
          resolve()
        })
      })

    }
  },
  mutations: {
    setToken: (state, token) => {
      state.token = token
    }
  }

}
