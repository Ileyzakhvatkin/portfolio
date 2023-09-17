import axios from 'axios';
import { API_BASE_URL } from '@/config';

export default {
  namespaced: true,

  state: {
    cartProducts: [],
    cartProductData: [],
  },

  mutations: {

    updateCartProductData(state, item) {
      state.cartProductData = item;
    },

    updateCartProductAmount(state, { productId, amount }) {
      const item = state.cartProducts.find((el) => el.productOffer === productId);
      if (item) {
        item.amount = amount;
      }
    },

    deleteCartProduct(state, productId) {
      state.cartProducts = state.cartProducts.filter((item) => item.productId !== productId);
    },

    resetCart(state) {
      state.cartProducts = [];
      state.cartProductData = [];
    },

    syncCartProducts(state) {
      state.cartProducts = state.cartProductData.map((item) => ({
        productOffer: item.productOffer.id,
        color: item.color,
        amount: item.quantity,
        productOfferId: item.id,
      }));
    },

  },

  actions: {
    async loadCart(conrext) {
      // Чтобы действие вернуло промис исползуем return
      const response = await axios.get(`${API_BASE_URL}/api/baskets`, {
        // Предаем уникальный ключь при послед запросах
        params: {
          userAccessKey: conrext.rootState.accessModule.userAccessKey,
        },
      });
      if (!conrext.rootState.accessModule.userAccessKey) {
        // Записываем ключ в localStorage чтобы он не терялся при обновлении сессии
        await localStorage.setItem('userAccessKey', response.data.user.accessKey);
        // Записываем уникальный ключь в vuex
        conrext.commit('updateUserAccessKey', response.data.user.accessKey, { root: true });
      }
      // console.log(response.data.items);
      conrext.commit('updateCartProductData', response.data.items);
      conrext.commit('syncCartProducts');
    },

    async addProductToCart(conrext, { productOfferId, colorId, amount }) {
      // Чтобы действие вернуло промис исползуем return
      const response = await axios.post(`${API_BASE_URL}/api/baskets/products`, {
        productOfferId,
        colorId,
        quantity: amount,
      }, {
        params: {
          userAccessKey: conrext.rootState.accessModule.userAccessKey,
        },
      });
      conrext.commit('updateCartProductData', response.data.items);
      conrext.commit('syncCartProducts');
    },

    async updateCartProductAmount(conrext, { basketItemId, amount }) {
      conrext.commit('updateCartProductAmount', { basketItemId, amount });
      if (amount < 1) {
        return null;
      }
      try {
        const response = await axios.put(`${API_BASE_URL}/api/baskets/products`, {
          basketItemId,
          quantity: amount,
        }, {
          params: {
            userAccessKey: conrext.rootState.accessModule.userAccessKey,
          },
        });
        return conrext.commit('updateCartProductData', response.data.items);
      } catch (error) {
        return null;
      } finally {
        conrext.commit('syncCartProducts');
      }
    },

    async deleteCartProduct(conrext, basketItemId) {
      conrext.commit('deleteCartProduct', basketItemId);
      try {
        const response = await axios.delete(`${API_BASE_URL}/api/baskets/products`, {
          params: { userAccessKey: conrext.rootState.accessModule.userAccessKey },
          data: { basketItemId },
        });
        conrext.commit('updateCartProductData', response.data.items);
        conrext.commit('syncCartProducts');
      } catch (error) {
        conrext.commit('syncCartProducts');
      }
    },

  },

  getters: {
    cartDetailProduct(state) {
      return state.cartProducts.map((item) => {
        const { productOffer } = state.cartProductData
          .find((p) => p.productOffer.id === item.productOffer);
        // return productOffer;
        return {
          ...item,
          productOffer: {
            ...productOffer,
            image: productOffer.product.preview.file.url,
          },
        };
      });
    },

    cartTotalPrice(state, getters) {
      return getters.cartDetailProduct
        .reduce((acc, item) => acc + (item.productOffer.price * item.amount), 0);
    },

    cartTotal(state, getters) {
      return getters.cartDetailProduct
        .reduce((acc, item) => (item.amount) + acc, 0);
    },

  },

};
