<template>
  <ul class="catalog-page-size">
    <li class="catalog-page-size__item"
        v-for="(productsPerPageSise, index) in productsPerPageSises" :key="index">
      <button class="catalog-page-size__button"
        :class="{'catalog-page-size__button-curtent': productsPerPageSise === perPage}"
        @click.prevent="resize(productsPerPageSise)">{{ productsPerPageSise }}</button>
    </li>
  </ul>
</template>

<script>
import { PAGE_SIZER_VALUE } from '@/config';

export default {
  model: {
    prop: 'perPage',
    event: 'resize',
  },
  props: ['perPage'],
  data() {
    return {
      productsPerPageSises: PAGE_SIZER_VALUE,
    };
  },
  methods: {
    resize(size) {
      this.$emit('resize', size);
    },
  },

};
</script>
