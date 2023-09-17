<!-- eslint-disable -->
<template>
  <article class="item__desc">
    <ul class="tabs">
      <li class="tabs__item" v-for="(tab, index) in tabs" :key="index">
        <a class="tabs__link" :class="{ 'tabs__link--current': tab.isActive }"
        href="#" @click.prevent="selectTab(tab)">
          {{ tab.name }}
        </a>
      </li>
    </ul>
    <div class="item__content">
      <slot></slot>
    </div>
  </article>
</template>

<script>
export default {
  data: () => ({
    tabs: [],
  }),
  methods: {
    selectTab(selectedTab) {
      this.tabs.forEach((tab) => {
        /* eslint-disable no-param-reassign */
        tab.isActive = tab.name === selectedTab.name;
      });
    },
  },
  created() {
    this.tabs = this.$children;
  },
};
</script>
