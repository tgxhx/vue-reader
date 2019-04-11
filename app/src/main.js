// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import store from './store/index';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import Common from 'assets/js/utils.js';

Vue.use(Common);

Vue.use(MintUI);

import './assets/css/reset.css';

require('animate.css');

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
