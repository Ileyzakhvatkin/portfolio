<template>
<div>
  <section class="catalog" v-if="!cartModule.cartProductData">
    <vue-simple-spinner size="small" line-fg-color="#9eff00"/>
  </section>
  <router-link v-else class="header__cart" aria-label="Корзина с товарами" :to="{name: 'cart'}">
    <svg width="30" height="21" fill="currentColor">
      <use xlink:href="#icon-cart"></use>
    </svg>
    <!-- Получить доступ к хранилищу -->
    <span class="header__count" aria-label="Количество товаров">
      {{ cartModule.cartProductData.length }}</span>
  </router-link>
</div>
</template>

<script>
import VueSimpleSpinner from 'vue-simple-spinner';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      cartLoading: true,
    };
  },
  components: {
    VueSimpleSpinner,
  },
  computed: {
    ...mapState({
      cartModule: (state) => state.cartModule,
    }),
  },
};
</script>
