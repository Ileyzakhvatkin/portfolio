<!-- eslint-disable -->
<template>
  <main class="content container" v-if="orderLoading">
  <p class="text-center">Идет загрузка информации о заказе...</p>
  <vue-simple-spinner size="big" line-fg-color="#9eff00"/>
  </main>
  <main class="content container" v-else-if="orderLoadingFailed">
    <h3>Не удалось получить информацию по заказу</h3>
  </main>
  <main class="content container" v-else>
    <div class="content__top">
      <!-- <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'cart'}">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <span class="breadcrumbs__link">
            Оформление заказа
          </span>
        </li>
      </ul> -->
      <h1 class="content__title" v-if="pageOrderInfo">
        Заказ оформлен <span>№ {{ pageOrderInfo.id }} </span>
      </h1>
    </div>

    <section class="cart" v-if="pageOrderInfo">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо с&nbsp;деталями заказа.
            Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key">
                Получатель
              </span>
              <span class="dictionary__value" >
                {{ pageOrderInfo.name }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Адрес доставки
              </span>
              <span class="dictionary__value">
                {{ pageOrderInfo.address }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Телефон
              </span>
              <span class="dictionary__value">
                {{ pageOrderInfo.phone }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Email
              </span>
              <span class="dictionary__value">
                {{ pageOrderInfo.email }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Оплата
              </span>
              <span class="dictionary__value">
                {{ pageOrderInfo.paymentType }}
              </span>
            </li>
          </ul>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order"  v-for="item in pageOrderInfo.basket.items" :key="item.id">
              <h3>{{ item.productOffer.title }}</h3>
              <b>{{ item.price | numberFormat }} ₽</b>
              <span>Артикул: {{ item.productOffer.id }}</span>
            </li>
          </ul>

          <div class="cart__total">
            <p>Доставка: {{ pageOrderInfo.deliveryType.title }}<b>
              {{ pageOrderInfo.deliveryType.price > 0 ? `${pageOrderInfo.deliveryType.title} ₽` : `Бесплатно` }}</b></p>
            <p>Итого: <b>{{ orderTotalProdQuantity }}</b> товара на сумму
             <b>{{ pageOrderInfo.totalPrice | numberFormat }} ₽</b></p>
            <p>Статус заказа: <b>{{ pageOrderInfo.status.title }}</b></p>
          </div>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { mapState } from 'vuex';
import numberFormat from '@/helpers/numberFormat';
import VueSimpleSpinner from 'vue-simple-spinner';

export default {
  data() {
    return {
      orderLoading: false,
      orderLoadingFailed: false,
    };
  },

  components: {
    VueSimpleSpinner,
  },

  filters: { numberFormat },

  computed: {
    ...mapState({
      orderModule: (state) => state.orderModule,
    }),

    pageOrderInfo() {
      return this.orderModule.orderInfo;
    },

    orderTotalProdQuantity() {
      return this.pageOrderInfo.basket.items.reduce((acc, item) => (item.quantity) + acc, 0);
    },
  },

  watch: {
    '$route.params.orderId': {
      async handler() {
        if (this.orderModule.orderInfo
          && this.orderModule.orderInfo.id === this.$route.params.orderId) {
          return;
        }
        this.orderLoading = true;
        this.orderLoadingFailed = false;
        try {
          await this.$store.dispatch('loadOrderInfo', this.$route.params.orderId, { root: true });
          this.orderLoading = false;
          this.orderLoadingFailed = false;
        } catch (error) {
          this.orderLoading = false;
          this.orderLoadingFailed = true;
        }
      },
      immediate: true,
    },
  },
};

</script>
