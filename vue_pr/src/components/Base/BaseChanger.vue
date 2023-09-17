<!-- eslint-disable -->
<template>
  <div class="form__counter">
    <button type="button" aria-label="Убрать один товар" @click="amount > 1 ? amount-- : amount">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>
    <!-- Связываем поле со свойством состояния -->
    <input type="text" v-model.number="amount">

    <button type="button" aria-label="Добавить один товар" @click="amount++">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: ['amountInitial'],
  computed: {
    amount: {
      get() {
        return this.amountInitial;
      },
      set(value) {
        this.$emit('update:amountInitial', value);
      },
    },
  },
  watch: {
    amount() {
      if (this.amount < 1 || !Number.isInteger(this.amount)) {
        this.amount = 1;
      }
    },
  },
};
</script>
