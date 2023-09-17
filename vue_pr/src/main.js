import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// Vue.config — это объект, содержащий глобальные параметры Vue.
Vue.config.productionTip = false;

new Vue({
  // Подключение роутера и хранилища
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
