<!-- eslint-disable -->
<template>
  <main class="content container" v-if="productLoading">
    <p class="text-center">Идет загрузка данных о товар...</p>
    <vue-simple-spinner size="big" line-fg-color="#9eff00"/>
  </main>
  <main class="content container" v-else-if="!productData">
    <h3>Не удалось загрузить данные о товаре</h3>
  </main>
  <!-- ГРУЗИМ ЭТУ ЧАСТЬ ШАБЛОНА ЕСЛИ ТОЕЛЬКО ЕСТЬ ИНФОРМАЦИЯ О ТОВАРЕ -->
  <main class="content container" v-else>
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link"
            :to="{ name: 'mainCategory', params: {categoryid: category.id}}"
          >
            {{ category.title }}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            {{ product.title }}
          </a>
        </li>
      </ul>
    </div>

    <BaseProductOrderForm :colors="colors" :product="product"/>

    <section class="item">
      <BaseTabs>
        <BaseTab name="Описание" selected="true">
          <h3>Описание товара отсутствует...</h3>

        </BaseTab>
        <BaseTab name="Характеристики">
          <div v-for="specification in product.specifications" :key="specification.id">
            <h3>{{ specification.title }}</h3>
            <p>{{ specification.value }}</p>
          </div>
        </BaseTab>
        <BaseTab name="Гарантия">
          <h4>Гарантия на товар</h4>
        </BaseTab>
        <BaseTab name="Оплата и доставка">
          <h4>Условия оплаты и доставки</h4>
        </BaseTab>
      </BaseTabs>
    </section>
  </main>
</template>

<script>
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import BaseProductOrderForm from '@/components/Base/BaseProductOrderForm.vue';
import BaseTabs from '@/components/Base/Tabs/BaseTabs.vue';
import BaseTab from '@/components/Base/Tabs/BaseTab.vue';
import loadColors from '@/helpers/loadColors';
import offerParams from '@/helpers/offerParams';
import VueSimpleSpinner from 'vue-simple-spinner';
import gotoPage from '@/helpers/gotoPage';

export default {
  data() {
    return {
      colorsData: null,
      productData: null,
      productLoading: false,
      productLoadingFailed: false,
      productAdded: false,
      productAddSending: false,
      productAmount: 1,
    };
  },

  components: {
    BaseProductOrderForm,
    BaseTabs,
    BaseTab,
    VueSimpleSpinner,
  },

  computed: {
    colors() {
      return this.colorsData ? this.colorsData.items : [];
    },
    category() {
      return this.productData.category;
    },
    product() {
      return this.productData;
    },
  },

  methods: {
    gotoPage,
    offerParams,
    loadColors,
  },

  watch: {
    '$route.params.id': {
      async handler() {
        this.productLoading = true;
        this.productLoadingFailed = false;
        this.productData = null;
        try {
          const response = await axios.get(`${API_BASE_URL}/api/products/${this.$route.params.id}`);
          setTimeout(() => {
            this.productData = response.data;
            this.productLoadingFailed = false;
            this.productLoading = false;
          }, 500);
        } catch (error) {
          setTimeout(() => {
            this.productLoadingFailed = true;
            this.productLoading = false;
          }, 500);
        }
      },
      immediate: true,
    },
  },
  created() {
    this.loadColors();
  },

};

</script>
