<!-- eslint-disable -->
<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        Товаров - {{ countProducts }}
      </span>
    </div>

    <div class="content__catalog">
      <ProductsFilter
        :colors="colors"
        :price-from.sync="filterPriceFrom"
        :price-to.sync="filterPriceTo"
        :category-id.sync="filterCategoryId"
        :colors-check.sync="filterColorId"
        :value-check.sync="filterCategoryParam"
      />
      <section class="catalog" v-if="productsLoading">
        <p class="text-center">Идет загрузка каталога товаров...</p>

        <vue-simple-spinner size="big" line-fg-color="#9eff00"/>
      </section>
      <section class="catalog" v-else-if="productsLoadingFailed">
        <p>Произошла ошибка при загрузке товаров</p>
        <button @click.prevent="loadProducts">Попробовать еще раз</button>
      </section>
      <section class="catalog" v-else>

        <BasePageSizer v-model="perPage"/>

        <ProductList :colors="colors" :products="products" />

        <h3 v-show="countProducts === 0">Товары в категории отсутствуют</h3>

        <BasePagination
          v-model="page"
          :count="countProducts"
          :per-page="perPage"
          />
      </section>
    </div>
  </main>
</template>

<script>
import { API_BASE_URL } from '@/config';
import axios from 'axios';
import VueSimpleSpinner from 'vue-simple-spinner';
import loadColors from '@/helpers/loadColors';
import ProductsFilter from '@/components/Product/ProductsFilter.vue';
import ProductList from '@/components/Product/ProductList.vue';
import BasePagination from '@/components/Base/Pagination/BasePagination.vue';
import BasePageSizer from '@/components/Base/Pagination/BasePageSizer.vue';

export default {
  components: {
    ProductsFilter,
    ProductList,
    BasePagination,
    BasePageSizer,
    VueSimpleSpinner,
  },
  data() {
    return {
      colorsData: null,
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColorId: [],
      filterCategoryParam: [],
      categoryParamsString: '',
      maxPriceFrom: null,
      minPriceTo: null,
      page: 1,
      productsData: null,
      productsLoading: false,
      productsLoadingFailed: false,
      perPage: null,
    };
  },
  computed: {
    colors() {
      return this.colorsData ? this.colorsData.items : [];
    },
    products() {
      return this.productsData;
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
  methods: {
    loadColors,

    async loadAllProducts() {
      const response = await axios.get(`${API_BASE_URL}/api/products`);
      this.minPriceTo = Math.min.apply(
        null,
        (await response.data.items.map((el) => el.price)),
      );
      this.maxPriceFrom = Math.max.apply(
        null,
        (await response.data.items.map((el) => el.price)),
      );
    },
    async loadProducts() {
      this.productsLoading = true;
      this.productsLoadingFailed = false;
      await this.loadAllProducts();

      if (this.$route.params.categoryid) {
        this.filterCategoryId = this.$route.params.categoryid;
      }

      try {
        const response = (await axios.get(`${API_BASE_URL}/api/products?${this.categoryParamsString}`, {
          params: {
            page: this.page,
            limit: this.perPage,
            minPrice: this.filterPriceFrom === 0 ? this.minPriceTo : this.filterPriceFrom,
            maxPrice: this.filterPriceTo === 0 ? this.maxPriceFrom : this.filterPriceTo,
            categoryId: this.filterCategoryId,
            'props[color]': this.filterColorId,
          },
        }));
        setTimeout(() => {
          this.productsData = response.data;
          this.productsLoading = false;
        }, 500);
      } catch (error) {
        this.productsLoadingFailed = true;
      }
    },
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
    filterColorId() {
      this.loadProducts();
    },
    filterCategoryParam() {
      const paramsObj = [];
      this.filterCategoryParam.forEach((el) => {
        const [key, value] = el;
        paramsObj.push(`props[${key}][]=${value}`);
      });
      this.categoryParamsString = paramsObj.join('&');
      this.loadProducts();
    },
    perPage() {
      this.loadProducts();
    },
  },
  created() {
    this.loadColors();
    this.perPage = 6;
    this.loadProducts();
  },
};
</script>
