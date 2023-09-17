<!-- eslint-disable -->
<template>
  <li class="catalog__item">
    <router-link class="catalog__pic" :to="{name: 'product', params: {id: product.id}}">
      <div class="color__lable" v-if="activeColor">
        <span class="colors__value" :style="'background-color: ' + activeColor.code">
        </span>
      </div>
      <img :src="product.preview.file.url" :alt="product.title">
    </router-link>

    <div class="item__info category-list">
      <h3 class="catalog__title">
        <a href="#">
          {{ offerParams(activeOffer).title }}
        </a>
      </h3>
      <span class="catalog__price">
        {{ offerParams(activeOffer).price | numberFormat }} ₽
      </span>

      <form class="form" action="#" method="POST" @submit.prevent="addToCart()">
        <fieldset class="form__block">
          <legend class="form__legend">Цвет:</legend>
          <ul class="colors">
            <li class="colors__item" v-for="(color, index) in changeColor" :key="index">
              <label class="colors__label" >
                <input class="colors__radio sr-only" type="radio" name="color.color.title"
                  :value="color.color" v-model="activeColor">
                <span class="colors__value" :style="'background-color: ' + color.color.code">
                </span>
              </label>
            </li>
          </ul>

        </fieldset>

        <fieldset class="form__block" v-if="product.mainProp.code !== 'color'">
          <legend class="form__legend">{{ product.mainProp.title }}</legend>
          <!-- <ul class="sizes sizes--primery" > -->
          <ul class="sizes sizes--primery">
            <li class="sizes__item" v-for="offer in product.offers" :key="offer.id">
              <label class="sizes__label">
                <input class="sizes__radio sr-only" type="radio" :name="offer.id"
                  :value="offer.id" v-model="activeOffer">
                <span class="sizes__value" v-for="propValue in offer.propValues" :key="propValue.productProp.id">
                  {{ propValue.value }}
                </span>
              </label>
            </li>
          </ul>
        </fieldset>
        <div v-show="activeColor === null || activeOffer === null">Выберете парасетры товара</div>

        <BaseChanger :amount-initial.sync="productAmount"/>
        <div v-show="productAmount < 1">Укажите положительное число</div>

        <button class="button button--primery" type="submit"
          v-if="product.mainProp.code !== 'color'"
          :disabled="productAmount < 1 || productAddSending || activeColor === null || activeOffer === null">
          В корзину
        </button>

        <button class="button button--primery" type="submit" v-else
          :disabled="productAmount < 1 || productAddSending || activeColor === null">
          В корзину
        </button>
        <br>
        <div v-show="productAdded">Товар добавлен в корзину</div>
        <div v-show="productAddSending">Товар отправляется в корзину</div>

      </form>

    </div>

  </li>
</template>

<script>
import offerParams from '@/helpers/offerParams';
import formOrderMixin from '@/mixins/formOrderMixin';

export default {
  data() {
    return {
      productsColor: '',
      activeOffer: null,
    };
  },
  props: ['product', 'colors'],

  mixins: [formOrderMixin],

  methods: {
    offerParams,
  },
};
</script>
