import Vue from 'vue'
import Router from 'vue-router'
import Login from 'features/login'
import Layout from 'features/common/layout'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/login',
    name: 'login',
    component: Login
  }, {
    path: '/',
    component: Layout
  }]
})

