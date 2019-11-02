import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user.js'
import permission from './modules/permission.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    permission
  }
})

export default store