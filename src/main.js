import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import elementui from "element-ui";
import {serverBaseUrl} from './common/constant'
import lazyLoad from '@/utils/directives'
import 'element-ui/lib/theme-chalk/index.css'
Vue.filter('prefix', function(url) {
  if (url && url.startsWith('http')) {
    return url
  } else {
    url = `${serverBaseUrl}${url}`
    return url
  }
})

// Vue.directive('lazy',{
//   // 添加图片监听
//   bind: intersectionObserver.bind(this),
//   inserted: (el) => {
//     window.observer.observe(el) 
//   },
//   unbind: (el) => {
//     window.observer.unobserve(el)
//   }
// })

// function intersectionObserver () {
//     window.observer = new IntersectionObserver(function(entries) {
//       if (entries[0].intersectionRatio <= 0) return;
//       entries.forEach((entry) => {
//           let lazyImage = entry.target;
//           // 相交率，默认是相对于浏览器视窗
//           if (entry.intersectionRatio > 0) {
//               lazyImage.src = lazyImage.getAttribute('data-src');
//               // 当前图片加载完之后需要去掉监听
//               window.observer.unobserve(lazyImage);
//           }
//       })
//       // loadItems(10);
//       console.log('Loaded new items');
//     }) 
// }
Vue.use(lazyLoad)
Vue.use(elementui)

Vue.config.productionTip = false

const root = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

window.$root = root
window.$vue = Vue
