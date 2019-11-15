import Vue from 'vue'
import Router from 'vue-router'
import Login from 'features/login'
import Layout from 'features/common/layout'
import UserQuery from 'features/views/userQuery'
import WorkQuery from 'features/views/workQuery'
import error404 from 'features/views/errorPage/404.vue'

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
}, {
  path: '/404',
  component: error404,
  hidden: true
}, ]

export const otherRouters = [{
  path: '/user',
  component: Layout,
  meta: { title: '用户管理', key: 'userManage' },
  children: [{
    path: 'query',
    component: UserQuery,
    meta: { title: '用户查询', key: 'userQuery' }
  }]
}, {
  path: '/work',
  component: Layout,
  meta: { title: '工作管理', key: 'workManage' },
  children: [{
    path: 'query',
    component: WorkQuery,
    meta: { title: '工作查询', key: 'workQuery' }
  }]
}, {
  path: '*', redirect: '/404', hidden: true
}]

export default new Router({
  routes: constantRouters,
  mode: 'history'
})

