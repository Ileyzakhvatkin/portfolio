<!-- eslint-disable -->
<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img :src="item.productOffer.image"
      width="120" height="120" :alt="item.productOffer.title">
    </div>
    <h3 class="product__title">
      {{ item.productOffer.title }}
    </h3>
    <div class="product__info">
      <div v-if="item.productOffer.product.mainProp.code !== 'color'">
        <p v-for="(el, index) in item.productOffer.propValues" :key="index">
          {{ item.productOffer.product.mainProp.title }}
          <span>{{ el.value }}</span>
        </p>
      </div>
      <div>
        <p class="product__info--color" v-if="item.color">
          Цвет:
          <span>
            <i :style="'background-color: ' + item.color.color.code + ';'"></i>{{ item.color.color.title }}
          </span>
        </p>
      </div>
    </div>



    <span class="product__code">
      Артикул: {{ item.productOffer.id }}
    </span>
    <!-- Связываем поле с вычисляемым СВОЙСТВОМ!!!! -->
    <!-- <input type="text" v-model.number="amount" name="amount"> -->
    <!-- <BaseChanger :amount-initial="amount" @up:amount="amount = params[0]" @down:amount="amount = params[0]"/> -->
    <BaseChanger :amount-initial.sync="amount"/>

    <b class="product__price">
      {{ item.amount * item.productOffer.price | numberFormat }} ₽
    </b>

    <button class="product__del button-del" @click.prevent="deleteProduct(item.productOfferId)"
    type="button" aria-label="Удалить товар из корзины">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import { mapActions } from 'vuex';
import numberFormat from '@/helpers/numberFormat';
import BaseChanger from '@/components/Base/BaseChanger.vue';

export default {
  props: ['item'],
  components: { BaseChanger },
  filters: { numberFormat },
  computed: {
    amount: {
      // Геторы и сеторы вычисляемого свойства
      get() {
        return this.item.amount;
      },
      set(value) {
        this.updateProductAmount({ basketItemId: this.item.productOfferId, amount: value });
      },
    },
  },
  methods: {
    ...mapActions('cartModule', {
      updateProductAmount: 'updateCartProductAmount',
      deleteProduct: 'deleteCartProduct',
    }),
  },
};
</script>
