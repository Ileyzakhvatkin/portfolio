<!-- eslint-disable -->
<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтры</h2>
    <form class="filter__form form" action="#" method="get" @submit.prevent="submit()">
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price" for="min-price">
          <input class="form__input" type="text" name="min-price" v-model.number="currentPriceFrom">
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price" for="max-price">
          <input class="form__input" type="text" name="max-price" v-model.number="currentPriceTo">
          <span class="form__value">До</span>
        </label>
      </fieldset>
      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select" for="category">
          <select class="form__select" type="text"
          name="category" v-model.number="currentCategoryId">
            <option value="0">Все категории</option>
            <option :value="category.id" v-for="category in categories" :key="category.id">
              {{ category.title }}
            </option>
          </select>
        </label>
      </fieldset>
      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>
        <ul class="colors">
          <li class="colors__item" v-for="color in colors" :key="color.id">
            <label class="colors__label">
              <input class="colors__radio sr-only" type="checkbox" :id="'color-'+color.id"
                :value="color.title" v-model="currentColorId">
              <span class="colors__value" :style="'background-color: ' + color.code + ';'"></span>
            </label>
          </li>
        </ul>
      </fieldset>
      <fieldset class="form__block" v-for="categoryParam in categoryParams" :key="categoryParam.id">
            <legend class="form__legend">{{ categoryParam.title }}</legend>
            <ul class="check-list">
              <li class="check-list__item" v-for="availableValue in categoryParam.availableValues" :key="availableValue.value">
                <label class="check-list__label">
                  <input class="check-list__check sr-only" type="checkbox" :id="categoryParam.code"
                    :value="[categoryParam.code, availableValue.value]" v-model.string="currentValueCheck">
                  <span class="check-list__desc">{{ availableValue.value }}</span>
                </label>
              </li>
            </ul>
          </fieldset>
      <button class="filter__submit button button--primery" type="submit">Применить</button>
      <button class="filter__reset button button--second" type="button"
        @click="reset()" :disabled="resetDisabled">Сбросить</button>
    </form>
  </aside>
</template>

<script>
import loadCategories from '@/helpers/loadCategories';
import loadCategoryParams from '@/helpers/loadCategoryParams';

export default {
  data() {
    return {
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryId: 0,
      currentColorId: [],
      currentValueCheck: [],
      categoriesData: null,
      categoriesParamsData: null,
    };
  },
  props: ['colors', 'priceFrom', 'priceTo', 'categoryId', 'colorsCheck', 'valueCheck'],
  computed: {
    categories() {
      return this.categoriesData ? this.categoriesData.items : [];
    },
    categoryParams() {
      return this.categoriesParamsData ? this.categoriesParamsData.productProps : [];
    },
    resetDisabled() {
      if (
        this.priceFrom !== 0
        || this.priceTo !== 0
        || this.categoryId !== 0
        || this.colorsCheck.length > 0
      ) {
        return false;
      } return true;
    },
  },

  watch: {
    priceFrom(value) {
      this.currentPriceFrom = value;
    },
    priceTo(value) {
      this.currentPriceTo = value;
    },
    categoryId(value) {
      this.currentCategoryId = value;
      if (this.currentCategoryId > 0) {
        this.loadCategoryParams();
      } else {
        this.categoriesParamsData = null;
      }
      this.$emit('update:valueCheck', []);
    },
    colorsCheck(value) {
      this.currentColorId = value;
    },
    valueCheck(value) {
      this.currentValueCheck = value;
    },
  },
  methods: {
    loadCategories,
    loadCategoryParams,

    submit() {
      this.$emit('update:priceFrom', this.currentPriceFrom);
      this.$emit('update:priceTo', this.currentPriceTo);
      this.$emit('update:categoryId', this.currentCategoryId);
      this.$emit('update:colorsCheck', this.currentColorId);
      this.$emit('update:valueCheck', this.currentValueCheck);
    },
    reset() {
      this.$emit('update:priceFrom', 0);
      this.$emit('update:priceTo', 0);
      this.$emit('update:categoryId', 0);
      this.$emit('update:colorsCheck', []);
      this.$emit('update:valueCheck', []);
      this.$route.params.categoryid = null;
      this.$router.push('/');
    },
  },
  created() {
    this.loadCategories();
  },
};
</script>
