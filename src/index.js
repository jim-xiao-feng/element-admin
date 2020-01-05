import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import './permission'
import './util/registerComponents'
import 'assets/less/reset.less'

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App />'
})