/* 全局注册element-ui组件，按需加载 */
import Vue from 'vue'
import { Form, FormItem, Input, Button,
  Menu, Submenu, MenuItem } from 'element-ui'

Vue.component(Form.name, Form)
Vue.component(FormItem.name, FormItem)
Vue.component(Input.name, Input)
Vue.component(Button.name, Button)
Vue.component(Menu.name, Menu)
Vue.component(Submenu.name, Submenu)
Vue.component(MenuItem.name, MenuItem)