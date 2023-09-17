import Vue from 'vue';
import Vuex from 'vuex';
import accessModule from './module/accessModule';
import cartModule from './module/cartModule';
import orderModule from './module/orderModule';

Vue.use(Vuex);
// Создаем новое хранилище
export default new Vuex.Store({
  modules: {
    accessModule,
    cartModule,
    orderModule,
  },
});
