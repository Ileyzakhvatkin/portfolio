<!-- eslint-disable -->
<template>
  <BaseFormField :title="title" :error="error">
    <input class="form__input" v-model="dataValue" :type="type" :placeholder="placeholder">
  </BaseFormField>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin';

export default {
  // Опции из пропов будут смешиваться с опциями их миксина
  props: {
    // Если опции указать в виде объекта, то можно задать дефолтные значения
    type: {
      default: 'text',
    },
  },
  mixins: [formFieldMixin],
};

</script>
