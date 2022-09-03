import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import elementui from "element-ui";
import {serverBaseUrl} from './common/constant'

import 'element-ui/lib/theme-chalk/index.css'
Vue.filter('prefix', function(url) {
  if (url && url.startsWith('http')) {
    return url
  } else {
    url = `${serverBaseUrl}${url}`
    return url
  }
})

Vue.use(elementui)

Vue.config.productionTip = false

const root = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

window.$root = root
window.$vue = Vue
