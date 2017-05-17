import Vue from 'vue'
import Router from 'vue-router'


import index from '@/components/index/index';
import detail from '@/components/detail/detail';
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/detail/:uuid',
      name: 'detail',
      component: detail
    }
  ]
})
