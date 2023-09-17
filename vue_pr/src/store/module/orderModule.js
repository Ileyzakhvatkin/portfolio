import axios from 'axios';
import { API_BASE_URL } from '@/config';

export default {
  // namespaced: true,

  state: {
    orderInfo: null,
  },

  mutations: {
    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo;
    },
  },

  actions: {
    async loadOrderInfo(conrext, orderId) {
      const response = await axios.get(`${API_BASE_URL}/api/orders/${orderId}`, {
        params: {
          userAccessKey: conrext.rootState.accessModule.userAccessKey,
        },
      });
      await conrext.commit('updateOrderInfo', response.data);
    },
  },
};
