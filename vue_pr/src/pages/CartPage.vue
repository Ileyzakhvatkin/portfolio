<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <span class="breadcrumbs__link">Корзина</span>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        товаров {{ total }}
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <!-- Обращаемся к геттеру хранилища  $store.getters.cartDetailProduct
             в свойстве products -->
            <CartItem :item="item" v-for="(item, index) in products" :key="index" />

          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p>
            Итого товаров: <span>{{ total }} шт.</span>
          </p>
          <p class="cart__price">
            Итого: <span>{{ totalPrice | numberFormat }} ₽</span>
          </p>

          <router-link tag="button" :to="{name: 'order'}"
            class="cart__button button button--primery" type="submit"
            :disabled="total < 1">
            Оформить заказ
          </router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';
import numberFormat from '@/helpers/numberFormat';
import CartItem from '@/components/Cart/CartItem.vue';

export default {
  filters: { numberFormat },
  components: { CartItem },
  computed: {
    ...mapGetters('cartModule', {
      products: 'cartDetailProduct',
      totalPrice: 'cartTotalPrice',
      total: 'cartTotal',
    }),
  },
};

</script>
