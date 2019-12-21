import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import store from './store'
import router from './router'
import './permission'
import 'assets/less/reset.less'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App />'
})