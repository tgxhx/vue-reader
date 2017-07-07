import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: resolve => require(['../components/Home.vue'],resolve)
    },
    {
      path: '/reader/:id',
      name: 'reader',
      component: resolve => require(['@/components/Reader'],resolve)
    },
    {
      path: '/bookdetail/:id',
      name: 'bookdetail',
      component: resolve => require(['@/components/BookDetail'],resolve)
    },
    {
      path: '/category',
      name: 'category',
      component: resolve => require(['@/components/Category'],resolve)
    },
  ]
})
