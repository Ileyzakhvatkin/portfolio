export default {
  // namespaced: true,
  // Убираем пространство имен так как используем глобально
  // Там где в других модулях используем мутацияю добавляем { root: true }
  state: {
    userAccessKey: null,
  },
  mutations: {
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
  },
};
