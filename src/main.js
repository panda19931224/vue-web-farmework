import Vue from 'vue'
import 'normalize.css/normalize.css'// A modern alternative to CSS resets
import App from './App'
import router from './router'
import store from './vuex/store'
import { sync } from 'vuex-router-sync'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.scss' // global css
import UtilsPlugin from './assets/utils'
import HttpPlugin from './http/Index'
import MenusData from '../static/json/Menus'

Vue.config.productionTip = false
Vue.use(ElementUI)
// plugins
Vue.use(UtilsPlugin)
Vue.use(HttpPlugin)
const dispatch = store.dispatch
router.beforeEach((to, from, next) => {
  if (store.getters.list.length < 1) {
    dispatch('set_menus_list', MenusData)
  }
  setTimeout(next, 20)
})
router.afterEach((to) => {
})
sync(store, router)
/* eslint-disable no-new */
// global
window.$globalHub = new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
