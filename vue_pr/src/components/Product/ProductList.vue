<template>
  <ul class="catalog__list">
    <ProductItem :colors="colors" :product="product"
      v-for="product in products.items" :key="product.id" />
  </ul>
</template>

<script>
import ProductItem from '@/components/Product/ProductItem.vue';

export default {
  props: ['products', 'colors'],
  components: {
    ProductItem,
  },
};
</script>
