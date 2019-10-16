import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import router from './router'

Vue.use(ElementUI)

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})