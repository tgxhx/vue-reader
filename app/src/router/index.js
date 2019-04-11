import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'home',
      // importName: https://www.npmjs.com/package/babel-plugin-webpack-async-module-name
      component: () => importName('components/Home', 'home'),
    },
    {
      path: '/reader/:id',
      name: 'reader',
      component: () => importName('components/Reader', 'reader'),
    },
    {
      path: '/bookdetail/:id',
      name: 'bookdetail',
      component: () => importName('components/BookDetail', 'detail'),
    },
    {
      path: '/category',
      name: 'category',
      component: () => importName('components/Category', 'category'),
    },
  ],
});
