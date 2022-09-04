import {intersectionObserver} from './directives'
export default {
    install(Vue) {
        Vue.directive('lazy',{
            // 添加图片监听
            bind: intersectionObserver.bind(this)
        })
    }
}