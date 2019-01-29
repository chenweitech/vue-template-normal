import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import store from '../store';
import router from './router';
import App from './App.vue';
import API from './utils/api';
import * as ReturnCode from './utils/returnCode';

import './assets/css/index.css';

Vue.use(ElementUI);

Vue.prototype.$http = API.api;
Vue.prototype._returnCode = ReturnCode;

new Vue({
  router,
  store,
  components: { App },
  template: '<App/>'
}).$mount('#app');