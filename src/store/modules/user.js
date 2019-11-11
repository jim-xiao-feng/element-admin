import {
  login,
  getUserInfo
} from 'services/api/user'
import { setCookie } from 'src/util/cookie'
import { TOKEN_KEY } from 'src/constants/app'

export default {
  state: {
    userBaseInfo: {},
    token: ''
  },
  actions: {
    userLogin({ commit }, userInfo) {
      return new Promise((resolve) => {
        login(userInfo).then(res => {
          commit('setToken', res.token)
          setCookie(TOKEN_KEY, res.token)
          resolve()
        })
      })
    },

    getUserInfo({ commit }) {
      return new Promise((resolve) => {
        getUserInfo().then(res => {
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
