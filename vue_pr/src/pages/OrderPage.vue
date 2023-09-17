<!-- eslint-disable -->
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
          <router-link class="breadcrumbs__link" :to="{name: 'cart'}">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <span class="breadcrumbs__link">
            Оформление заказа
          </span>
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
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order()">
        <div class="cart__field">
          <div class="cart__data">

            <BaseFormText title="ФИО" :error="formError.name" placeholder="Введите ваше полное имя" v-model="formData.name"/>
            <BaseFormText title="Адрес доставки" :error="formError.address" placeholder="Введите ваш адрес" v-model="formData.address"/>
            <BaseFormText title="Телефон" :error="formError.phone" type="tel" placeholder="Введите ваш телефон" v-model="formData.phone"/>
            <BaseFormText title="Email" :error="formError.email" type="email" placeholder="Введите ваше полное имя" v-model="formData.email"/>
            <BaseFormTextarea title="Комментарий к заказу" :error="formError.comment" placeholder="Ваши пожелания" v-model="formData.comment"/>

          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item" v-for="delivery in deliveries" :key="delivery.id">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio"
                  :id="delivery.title" :value="delivery" v-model="currentDelivery">
                  <span class="options__value">
                    {{ delivery.title }} <b>{{ delivery.price > 0 ? `${delivery.price} ₽` : 'бесплатно' }}</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title" v-if="currentDelivery">Оплата</h3>
            <ul class="cart__options options" v-if="currentDelivery">
              <li class="options__item" v-for="payment in payments" :key="payment.id">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio"
                  :id="payment.title" :value="payment" v-model="currentPayments">
                  <span class="options__value">
                    {{ payment.title }}
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order" v-for="(product, index) in products" :key="index">
              <h3>{{ product.productOffer.title }}</h3>
              <b>{{ product.productOffer.price | numberFormat }} ₽</b>
              <span>Артикул: {{ product.productOffer.id }}</span>
            </li>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b v-if="currentDelivery">{{ currentDelivery.price > 0 ? `${currentDelivery.price} ₽` : 'бесплатно' }}</b></p>
            <p>Оплата: <b v-if="currentPayments">{{ currentPayments.title }}</b></p>
            <p>
              Итого: товаров <b>{{ total }}</b>
              <span v-if="currentDelivery"> с доставкой </span>
              на сумму <b>{{ (totalPrice + (currentDelivery ? Number(currentDelivery.price) : 0)) | numberFormat }} ₽</b>
            </p>
          </div>
          <button class="cart__button button button--primery" type="submit"
            :disabled="currentDelivery === null || currentPayments === null">
            Оформить заказ
          </button>
          <p v-if="currentDelivery === null || currentPayments === null"> Выберете способ оплаты и способ доставки</p>
        </div>
        <div class="cart__error form__error-block" v-show="formErrorMessage !== ''">
          <h4>Заявка не отправлена!</h4>
          <p> {{ formErrorMessage }} </p>
        </div>
        <div class="cart__error form__error-block" v-show="orderAddSending">
          <h4>Заказ отправляется...</h4>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import { mapState, mapGetters, mapMutations } from 'vuex';
import numberFormat from '@/helpers/numberFormat';
import BaseFormText from '@/components/Base/Form/BaseFormText.vue';
import BaseFormTextarea from '@/components/Base/Form/BaseFormTextarea.vue';
import loadDeliveries from '@/helpers/loadDeliveries';
import loadPayments from '@/helpers/loadPayments';

export default {
  data() {
    return {
      formData: {},
      formError: {},
      formErrorMessage: '',
      orderAddSending: false,
      deliveriesData: null,
      currentDelivery: null,
      paymentsData: null,
      currentPayments: null,
    };
  },
  components: {
    BaseFormText,
    BaseFormTextarea,
  },
  filters: { numberFormat },
  computed: {
    ...mapState({
      accessModule: (state) => state.accessModule,
    }),

    ...mapGetters('cartModule', {
      products: 'cartDetailProduct',
      totalPrice: 'cartTotalPrice',
      total: 'cartTotal',
    }),

    deliveries() {
      return this.deliveriesData ? this.deliveriesData : [];
    },
    payments() {
      return this.paymentsData ? this.paymentsData : [];
    },

  },
  methods: {
    loadDeliveries,
    loadPayments,

    ...mapMutations('cartModule', { resetCart: 'resetCart' }),
    ...mapMutations({ updateOrderInfo: 'updateOrderInfo' }),

    async order() {
      // Чтобы убрать историю ошибок
      this.formError = {};
      this.formErrorMessage = '';
      this.orderAddSending = true;
      try {
        const response = await axios.post(`${API_BASE_URL}/api/orders`, {
          ...this.formData,
          deliveryTypeId: this.currentDelivery.id,
          paymentTypeId: this.currentPayments.id,
        }, {
          params: {
            userAccessKey: this.accessModule.userAccessKey,
          },
        });
        setTimeout(() => {
          this.updateOrderInfo(response.data);
          this.resetCart();
          this.orderAddSending = true;
          this.orderAddSending = false;
          this.$router.push({ name: 'orderInfo', params: { orderId: response.data.id } });
        }, 1000);
      } catch (error) {
        // Обращаемся к ответу сервера response в данныех этого ответа объект ошибки request
        setTimeout(() => {
          this.formError = error.response.data.error.request || {};
          this.formErrorMessage = error.response.data.error.message;
          this.orderAddSending = false;
        }, 1000);
      }
    },
  },

  watch: {
    currentDelivery(value) {
      this.loadPayments(value.id);
    },
  },

  created() {
    this.loadDeliveries();
  },

};

</script>
