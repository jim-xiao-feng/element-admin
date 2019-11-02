export default {
  state: {
    routes: []
  },
  actions: {
    setRoutes({ commit }, routes) {
      commit('setRoutes', routes)
    }
  },
  mutations: {
    setRoutes(state, routes) {
      state.routes = routes
    }
  }
}