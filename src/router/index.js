import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: resolve => require(['../pages/login.vue'], resolve),
    },
    {
      path: '/page1',
      name: 'page1',
      component: resolve => require(['../layouts/BaseLayout.vue'], resolve),
      children: [
        {
          path: 'page1-1',
          component: resolve => require(['../pages/page1.vue'], resolve),
        }
      ]
    }
  ]
})