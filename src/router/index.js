import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/home/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/content',
    children:[
      {
        path: '/content',
        name: 'content',
        component: () => import('../components/home/Content')
      },
      {
        path: '/productDetail',
        component: () => import('../components/home/ProductDetail'),
        name: 'productDetail'
      },
      {
        path: '/cart',
        name: 'cart',
        component: () => import('../components/home/Cart')
      },
      // {
      //   path: '/productList',
      //   name: 'productList',
      //   component: () => import('../components/home/ProductList')
      // },

    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  // {
  //   path: '/productList',
  //   name: 'productList',
  //   component: () => import('../components/home/ProductList')
  // },
  // {
  //   path: '/productDetail',
  //   name: 'productDetail',
  //   component: () => import('../components/home/ProductDetail')
  // },
  // {
  //   path: '/cart',
  //   name: 'cart',
  //   component: () => import('../components/home/Cart')
  // },
  {
    path: '/createOrder',
    name: 'createOrder',
    component: () => import('../components/home/CreateOrder')
  },
  {
    path: '/payOff',
    name: 'payOff',
    component: () => import('../components/home/PayOff')
  },
  {
    path: '/success',
    name: 'success',
    component: () => import('../components/home/Success')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login')
  },
  {
    path: '/productList',
    name: 'productList',
    component: () => import('../components/home/ProductList')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
