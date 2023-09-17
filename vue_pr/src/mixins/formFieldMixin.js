import BaseFormField from '@/components/Base/Form/BaseFormField.vue';

export default {
  props: ['title', 'error', 'placeholder', 'value'],
  components: {
    BaseFormField,
  },
  // Чтобы связаь v-model создаем двунаправленное вычисляемое свойство
  // а так же props - value
  computed: {
    dataValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
