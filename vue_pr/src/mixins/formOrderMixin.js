import BaseChanger from '@/components/Base/BaseChanger.vue';
import { mapActions } from 'vuex';
import numberFormat from '@/helpers/numberFormat';
import offerParams from '@/helpers/offerParams';

export default {
  props: ['product'],

  data() {
    return {
      productAdded: false,
      productAddSending: false,
      productAmount: 1,
      activeColor: null,
      activeOffer: null,
    };
  },

  components: {
    BaseChanger,
  },

  filters: {
    numberFormat,
  },

  computed: {
    changeColor() {
      if (this.product.mainProp.code === 'color') {
        this.product.colors = [];
        this.product.offers.forEach((element) => {
          // console.log(element.propValues[0].value);
          const findColor = this.colors.find((color) => element.propValues[0].value
            === color.title.replace('ё', 'е'));
          // console.log(findColor);
          if (findColor !== undefined) {
            this.product.colors.push({ color: findColor });
          }
        });
      }
      return this.product.colors;
    },
  },

  watch: {
    activeColor() {
      if (this.product.mainProp.code === 'color') {
        this.activeOffer = this.product.offers.find((el) => el.propValues[0].value
        === this.activeColor.title.replace('ё', 'е')).id;
      }
    },
  },

  methods: {
    ...mapActions('cartModule', ['addProductToCart']),

    offerParams,

    async addToCart() {
      this.productAdded = false;
      this.productAddSending = true;

      setTimeout(() => {
        this.addProductToCart({
          colorId: this.activeColor.id,
          productOfferId: this.activeOffer,
          amount: this.productAmount,
        });
        this.productAdded = true;
        this.productAddSending = false;
      }, 1000);
    },
  },

};
