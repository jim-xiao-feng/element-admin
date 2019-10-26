import {
  login
} from 'services/api/user'

export default {
  state: {
    userBaseInfo: {},
    token: ''
  },
  actions: {
    userLogin({ commit }, userInfo) {
      login(userInfo)
    }
  },
  mutations: {
    setToken: (state, token) => {
      state.token = token
    }
  }

}
