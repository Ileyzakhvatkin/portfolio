<template>
  <div>
    <SiteHeader />
    <router-view />
    <SiteFooter />
  </div>
</template>

<script>
import SiteHeader from '@/components/Template/TmplHeader.vue';
import SiteFooter from '@/components/Template/TmplFooter.vue';
import { mapActions, mapMutations } from 'vuex';

export default {
  components: {
    SiteHeader,
    SiteFooter,
  },
  created() {
    const userAccessKey = localStorage.getItem('userAccessKey');
    if (userAccessKey) {
      this.updateUserAccessKey(userAccessKey);
    }
    this.loadCart();
  },
  methods: {
    ...mapMutations(['updateUserAccessKey']),
    // ...mapMutations('accessModule', ['updateUserAccessKey']),
    ...mapActions('cartModule', ['loadCart']),
  },
};
</script>
