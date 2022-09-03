import Vue from 'vue'
import Vuex from 'vuex'
// import {addCart} from '../service/cart'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartCount: 0,
    cartDetail: []
  },
  mutations: {
    addCart (state) {
      state.cartCount++
    },
    changeState (state, { key, value }) {
      state[key] = value
    }
  },
  actions: {
    // async updateCart(ctx) {
    //   // 
    //   // const { data } = await addCart()
    //   // if (data && data.productNum) {
    //   //   count = data.productNum
    //   // }
    //   // ctx.commit('addCart', {
    //   //   count: data.length || 0
    //   // })
    // }
  },
  modules: {
  }
})
