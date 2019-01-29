import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'login'
    },
    {
      path: '/login',
      name: '登录',
      component: resolve => require(['../page/login.vue'], resolve)
    },
    {
      path: '/hello',
      name: '欢迎',
      component: resolve => require(['../page/hello.vue'], resolve)
    }
  ]
})