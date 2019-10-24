import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import './plugins/element.js';
// import './less/variables.less';
import './less/mixin.less';
import './less/font-awesome.less';
import './utils/flexible';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
