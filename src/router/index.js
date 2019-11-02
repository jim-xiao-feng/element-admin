import Vue from 'vue'
import Router from 'vue-router'
import Login from 'features/login'
import Layout from 'features/common/layout'
import UserQuery from 'features/views/userQuery'
import WorkQuery from 'features/views/workQuery'

Vue.use(Router)

export const constantRouters = [{
  path: '/login',
  name: 'login',
  component: Login,
  hidden: true
}, {
  path: '/',
  component: Layout,
  hidden: true
}]

export const otherRouters = [{
  path: '/user',
  component: Layout,
  meta: { title: '用户管理', key: 'userMange' },
  children: [{
    path: 'query',
    component: UserQuery,
    meta: { title: '用户查询', key: 'userQuery' }
  }]
}, {
  path: '/work',
  component: Layout,
  meta: { title: '工作管理', key: 'workMange' },
  children: [{
    path: 'query',
    component: WorkQuery,
    meta: { title: '工作查询', key: 'workQuery' }
  }]
}]

export default new Router({
  routes: constantRouters
})

