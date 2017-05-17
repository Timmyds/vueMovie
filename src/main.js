// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vueResource from 'vue-resource';

require('./assets/css/common.css');
require('./assets/css/grid.css');
require('./assets/css/transition.css');

Vue.config.productionTip = false

Vue.use(vueResource);


/* eslint-disable no-new */
var app=new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});