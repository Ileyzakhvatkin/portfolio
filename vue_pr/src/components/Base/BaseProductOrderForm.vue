<!-- eslint-disable -->
<template>
  <section class="item">
    <div class="item__pics pics">

      <div class="pics__wrapper">
        <div class="color__lable" v-if="activeColor">
          <span class="colors__value" :style="'background-color: ' + activeColor.code">
          </span>
        </div>
        <img width="570" height="570" :src="product.preview.file.url" :alt="product.title">
      </div>
      <ul class="pics__list">
        <li class="pics__item">
          <a href="" class="pics__link pics__link--current">
            <img width="98" height="98" :src="product.preview.file.url" :alt="product.title">
          </a>
        </li>
      </ul>
    </div>
    <div class="item__info">
      <span class="item__code">Артикул: {{ product.id }}</span>
      <h2 class="item__title">
        {{ offerParams(activeOffer).title }}
      </h2>
      <div class="item__form">
        <form class="form" action="#" method="POST" @submit.prevent="addToCart()">
          <b class="item__price">
            <!-- Применяем функцию из фильтра -->
            {{ offerParams(activeOffer).price | numberFormat }} ₽
          </b>

          <fieldset class="form__block">
            <legend class="form__legend">Цвет:</legend>
            <ul class="colors">
              <li class="colors__item" v-for="color in changeColor" :key="color.color.id">
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

          <div class="red-bold" v-show="activeColor === null || activeOffer === null">
            Выберете характеристики товара
          </div>
          <br>
          <div v-show="productAmount < 1">Укажите положительное число</div>
          <div class="item__row">
            <BaseChanger :amount-initial.sync="productAmount"/>
            <button class="button button--primery" type="submit"
              :disabled="productAmount < 1 || productAddSending || activeColor === null || activeOffer === null">
              В корзину
            </button>
          </div>
          <br>
          <div v-show="productAdded">Товар добавлен в корзину</div>
          <div v-show="productAddSending">Товар отправляется в корзину</div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import formOrderMixin from '@/mixins/formOrderMixin';

export default {
  props: ['colors'],
  mixins: [formOrderMixin],
};

</script>
